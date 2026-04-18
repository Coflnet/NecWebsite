from __future__ import annotations

import argparse
import datetime as dt
import os
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse


ARTICLE_META_RE = re.compile(
    r'class="article-meta"[^>]*>(?:Released |Scheduled )?(\d{4}-\d{2}-\d{2})'
)
ARTICLE_CARD_RE = re.compile(r'<article class="article-card">.*?</article>', re.DOTALL)
ARTICLE_LINK_RE = re.compile(r'<h3><a href="(/guides/[^"#?]+)">')
GUIDE_LINK_RE = re.compile(
    r'<a(?P<before>[^>]*?)href="(?P<path>/guides/[^"#?]+)"(?P<after>[^>]*)>(?P<label>.*?)</a>',
    re.DOTALL,
)
URL_BLOCK_RE = re.compile(r'\s*<url>.*?</url>', re.DOTALL)

MONTH_PAGE_LABELS = {
    "january-2026": "January 2026",
    "february-2026": "February 2026",
    "march-2026": "March 2026",
    "april-2026": "April 2026",
    "may-2026": "May 2026",
    "june-2026": "June 2026",
}

IGNORED_SOURCE_NAMES = {
    ".git",
    ".venv",
    ".playwright-mcp",
    "__pycache__",
    "Dockerfile",
    "nginx.conf",
    "release_site.py",
    "docker-entrypoint.d",
    "REBUILD_NOTES.md",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build a released-only static site snapshot for Nginx."
    )
    parser.add_argument("--source", required=True)
    parser.add_argument("--published-root", required=True)
    parser.add_argument(
        "--date-override",
        default=os.environ.get("RELEASE_SITE_DATE_OVERRIDE"),
        help="ISO date to use instead of the current UTC date, useful for testing.",
    )
    return parser.parse_args()


def get_today(date_override: str | None) -> dt.date:
    if date_override:
        return dt.date.fromisoformat(date_override)
    return dt.datetime.now(dt.timezone.utc).date()


def copy_source_tree(source_root: Path, build_root: Path) -> None:
    def ignore(_directory: str, names: list[str]) -> set[str]:
        return {name for name in names if name in IGNORED_SOURCE_NAMES}

    shutil.copytree(source_root, build_root, ignore=ignore)


def extract_article_dates(source_root: Path) -> dict[str, dt.date]:
    article_dates: dict[str, dt.date] = {}
    guides_root = source_root / "guides"

    for guide_path in sorted(guides_root.glob("*.html")):
        if guide_path.stem == "index" or guide_path.stem in MONTH_PAGE_LABELS:
            continue

        content = guide_path.read_text(encoding="utf-8")
        match = ARTICLE_META_RE.search(content)
        if not match:
            continue

        article_dates[guide_path.stem] = dt.date.fromisoformat(match.group(1))

    return article_dates


def filter_article_cards(html: str, released_article_paths: set[str]) -> tuple[str, int]:
    rebuilt_parts: list[str] = []
    last_index = 0
    kept_cards = 0

    for match in ARTICLE_CARD_RE.finditer(html):
        rebuilt_parts.append(html[last_index:match.start()])
        card = match.group(0)
        link_match = ARTICLE_LINK_RE.search(card)
        if link_match and link_match.group(1) in released_article_paths:
            rebuilt_parts.append(card)
            kept_cards += 1
        last_index = match.end()

    rebuilt_parts.append(html[last_index:])
    return "".join(rebuilt_parts), kept_cards


def release_month_links(index_html: str, live_month_slugs: set[str]) -> str:
    for month_slug, label in MONTH_PAGE_LABELS.items():
        if month_slug in live_month_slugs:
            continue

        index_html = index_html.replace(
            f'<a class="pill" href="/guides/{month_slug}">{label}</a>',
            f'<span class="pill">{label}</span>',
        )
        index_html = index_html.replace(
            f'<strong><a href="/guides/{month_slug}">{label}</a></strong>',
            f"<strong>{label}</strong>",
        )

    return index_html


def strip_unreleased_month_nav(page_html: str, live_month_slugs: set[str]) -> str:
    for month_slug in MONTH_PAGE_LABELS:
        if month_slug in live_month_slugs:
            continue

        page_html = re.sub(
            rf'\s*<a class="button secondary" href="/guides/{month_slug}">[^<]*</a>',
            "",
            page_html,
        )
        page_html = re.sub(
            rf'\s*<a href="/guides/{month_slug}">[^<]*</a>',
            "",
            page_html,
        )

    return page_html


def update_guides_index_copy(
    index_html: str, released_count: int, live_month_slugs: set[str]
) -> str:
    live_month_labels = [
        label for slug, label in MONTH_PAGE_LABELS.items() if slug in live_month_slugs
    ]

    if live_month_labels:
        first_label = live_month_labels[0]
        last_label = live_month_labels[-1]
        if len(live_month_labels) == 1:
            headline = (
                f"{released_count} Hypixel SkyBlock money-making and update guides "
                f"released in {first_label}"
            )
        else:
            headline = (
                f"{released_count} Hypixel SkyBlock money-making and update guides "
                f"released from {first_label} through {last_label}"
            )
    else:
        headline = "Hypixel SkyBlock money-making and update guides scheduled for 2026"

    index_html = re.sub(r"<h1>.*?</h1>", f"<h1>{headline}</h1>", index_html, count=1)
    index_html = re.sub(
        r'<p class="lede">.*?</p>',
        (
            '<p class="lede">This guide library expands the core topics into a full '
            'money-making reference. Released pages are linked below, and future months '
            'stay visible only as schedule markers until their release date.</p>'
        ),
        index_html,
        count=1,
        flags=re.DOTALL,
    )
    index_html = index_html.replace(
        "The dates below give the release order from early January through late June 2026. Each month label opens a month archive page, and later entries link back to earlier guides so readers can step through the series as a progression path.",
        "The dates below show the release order. Live month labels open their archive pages, while future months stay visible here without linking until release day.",
    )

    return index_html


def disable_unreleased_guide_links(html: str, live_guide_paths: set[str]) -> str:
    def replace_link(match: re.Match[str]) -> str:
        path = match.group("path")
        if path in live_guide_paths:
            return match.group(0)

        attrs = f'{match.group("before")}{match.group("after")}'.strip()
        label = match.group("label")

        if attrs:
            return f"<span {attrs}>{label}</span>"
        return f"<span>{label}</span>"

    return GUIDE_LINK_RE.sub(replace_link, html)


def filter_sitemap(
    sitemap_xml: str,
    released_article_paths: set[str],
    live_month_paths: set[str],
) -> str:
    kept_blocks: list[str] = []

    for block in URL_BLOCK_RE.findall(sitemap_xml):
        loc_match = re.search(r"<loc>([^<]+)</loc>", block)
        if not loc_match:
            continue

        path = urlparse(loc_match.group(1)).path.rstrip("/") or "/"

        if path.startswith("/guides/"):
            month_path = path.removeprefix("/")
            if month_path in live_month_paths:
                kept_blocks.append(block)
                continue

            if path in released_article_paths:
                kept_blocks.append(block)
                continue

            continue

        kept_blocks.append(block)

    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(
        block.strip() for block in kept_blocks
    ) + "\n</urlset>\n"


def prune_old_builds(published_root: Path, keep: int = 3) -> None:
    build_dirs = sorted(
        (path for path in published_root.glob("build-*") if path.is_dir()),
        key=lambda path: path.stat().st_mtime,
        reverse=True,
    )

    for stale_build in build_dirs[keep:]:
        shutil.rmtree(stale_build, ignore_errors=True)


def build_snapshot(source_root: Path, published_root: Path, today: dt.date) -> Path:
    build_name = f"build-{dt.datetime.now(dt.timezone.utc).strftime('%Y%m%d%H%M%S')}"
    build_root = published_root / build_name
    copy_source_tree(source_root, build_root)

    article_dates = extract_article_dates(source_root)
    released_article_slugs = {
        slug for slug, release_date in article_dates.items() if release_date <= today
    }
    released_article_paths = {f"/guides/{slug}" for slug in released_article_slugs}

    for slug, release_date in article_dates.items():
        if release_date > today:
            future_article = build_root / "guides" / f"{slug}.html"
            if future_article.exists():
                future_article.unlink()

    live_month_slugs: set[str] = set()
    for month_slug in MONTH_PAGE_LABELS:
        month_page = build_root / "guides" / f"{month_slug}.html"
        if not month_page.exists():
            continue

        month_html, card_count = filter_article_cards(
            month_page.read_text(encoding="utf-8"), released_article_paths
        )

        if card_count == 0:
            month_page.unlink()
            continue

        month_page.write_text(month_html, encoding="utf-8")
        live_month_slugs.add(month_slug)

    for month_slug in list(live_month_slugs):
        month_page = build_root / "guides" / f"{month_slug}.html"
        month_html = strip_unreleased_month_nav(
            month_page.read_text(encoding="utf-8"), live_month_slugs
        )
        month_page.write_text(month_html, encoding="utf-8")

    guides_index = build_root / "guides" / "index.html"
    index_html, _ = filter_article_cards(
        guides_index.read_text(encoding="utf-8"), released_article_paths
    )
    index_html = release_month_links(index_html, live_month_slugs)
    index_html = update_guides_index_copy(
        index_html, len(released_article_slugs), live_month_slugs
    )
    guides_index.write_text(index_html, encoding="utf-8")

    live_guide_paths = released_article_paths | {
        f"/guides/{slug}" for slug in live_month_slugs
    }
    live_guide_paths.add("/guides")

    for html_path in build_root.rglob("*.html"):
        html = html_path.read_text(encoding="utf-8")
        html = disable_unreleased_guide_links(html, live_guide_paths)
        html_path.write_text(html, encoding="utf-8")

    live_month_paths = {f"guides/{slug}" for slug in live_month_slugs}
    sitemap_path = build_root / "sitemap.xml"
    sitemap_xml = filter_sitemap(
        sitemap_path.read_text(encoding="utf-8"),
        released_article_paths,
        live_month_paths,
    )
    sitemap_path.write_text(sitemap_xml, encoding="utf-8")

    return build_root


def promote_snapshot(build_root: Path, published_root: Path) -> None:
    current_link = published_root / "current"
    next_link = published_root / "current.next"

    if next_link.exists() or next_link.is_symlink():
        next_link.unlink()

    next_link.symlink_to(build_root.name)
    os.replace(next_link, current_link)
    prune_old_builds(published_root)


def main() -> None:
    args = parse_args()
    source_root = Path(args.source).resolve()
    published_root = Path(args.published_root).resolve()
    published_root.mkdir(parents=True, exist_ok=True)

    today = get_today(args.date_override)
    build_root = build_snapshot(source_root, published_root, today)
    promote_snapshot(build_root, published_root)


if __name__ == "__main__":
    main()