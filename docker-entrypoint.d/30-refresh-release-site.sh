#!/bin/sh
set -eu

refresh_seconds="${RELEASE_SITE_REFRESH_SECONDS:-300}"

if [ "$refresh_seconds" = "0" ]; then
  exit 0
fi

nohup sh -c '
  while :; do
    python3 /usr/share/nginx/source/release_site.py \
      --source /usr/share/nginx/source \
      --published-root /usr/share/nginx/published
    sleep "${RELEASE_SITE_REFRESH_SECONDS:-300}"
  done
' >/tmp/release-site-refresh.log 2>&1 &