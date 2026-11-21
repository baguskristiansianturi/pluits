# syntax=docker/dockerfile:1.7
FROM golang:1.27-alpine AS builder
RUN apk add --no-cache ca-certificates git
WORKDIR /src
COPY go.mod ./
RUN go mod download
COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/migrate ./cmd/migrate
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/email-worker ./cmd/email-worker

FROM gcr.io/distroless/static-debian12:nonroot AS api
COPY --from=builder --chown=nonroot:nonroot /out/api /api
EXPOSE 8080
ENTRYPOINT ["/api"]

FROM gcr.io/distroless/static-debian12:nonroot AS migrate
COPY --from=builder --chown=nonroot:nonroot /out/migrate /migrate
ENTRYPOINT ["/migrate"]

FROM gcr.io/distroless/static-debian12:nonroot AS email-worker
COPY --from=builder --chown=nonroot:nonroot /out/email-worker /email-worker
ENTRYPOINT ["/email-worker"]
