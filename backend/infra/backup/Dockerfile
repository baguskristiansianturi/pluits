FROM alpine:3.22

RUN apk add --no-cache age bash postgresql17-client tzdata \
    && addgroup -S backup \
    && adduser -S -D -H -u 10001 -G backup backup \
    && mkdir -p /backups \
    && chown backup:backup /backups

COPY backup-loop.sh /usr/local/bin/backup-loop.sh
RUN chmod 0555 /usr/local/bin/backup-loop.sh

USER 10001:10001
VOLUME ["/backups"]
ENTRYPOINT ["/usr/local/bin/backup-loop.sh"]
