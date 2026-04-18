#!/bin/sh
set -eu

python3 /usr/share/nginx/source/release_site.py \
  --source /usr/share/nginx/source \
  --published-root /usr/share/nginx/published