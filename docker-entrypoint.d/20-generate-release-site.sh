#!/bin/sh
set -eu

if python3 /usr/share/nginx/source/release_site.py \
  --source /usr/share/nginx/source \
  --published-root /usr/share/nginx/published
then
  exit 0
fi

if [ -e /usr/share/nginx/published/current ]; then
  echo "release_site.py failed at startup; continuing with the prebuilt published snapshot" >&2
  exit 0
fi

echo "release_site.py failed at startup and no published snapshot is available" >&2
exit 1