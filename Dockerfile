FROM nginxinc/nginx-unprivileged:alpine

USER root

RUN apk add --no-cache python3

COPY --chown=101:0 nginx.conf /etc/nginx/nginx.conf
COPY --chown=101:0 . /usr/share/nginx/source
COPY --chown=101:0 docker-entrypoint.d/ /docker-entrypoint.d/

RUN mkdir -p /usr/share/nginx/published \
	&& chown -R 101:0 /usr/share/nginx /docker-entrypoint.d \
	&& chmod -R g=u /usr/share/nginx /docker-entrypoint.d \
	&& chmod +x /docker-entrypoint.d/*.sh

USER 101
