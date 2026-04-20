FROM nginxinc/nginx-unprivileged:alpine

USER root

RUN apk add --no-cache python3

ARG RELEASE_SITE_BUILD_DATE

COPY --chown=101:0 nginx.conf /etc/nginx/nginx.conf
COPY --chown=101:0 . /usr/share/nginx/source
COPY --chown=101:0 docker-entrypoint.d/ /docker-entrypoint.d/

RUN mkdir -p /usr/share/nginx/published \
	&& build_date="${RELEASE_SITE_BUILD_DATE:-$(date -u +%F)}" \
	&& python3 /usr/share/nginx/source/release_site.py \
		--source /usr/share/nginx/source \
		--published-root /usr/share/nginx/published \
		--date-override "$build_date" \
	&& chown -R 101:0 /usr/share/nginx /docker-entrypoint.d \
	&& chmod -R g=u /usr/share/nginx /docker-entrypoint.d \
	&& chmod +x /docker-entrypoint.d/*.sh

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

USER 101
