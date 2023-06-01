FROM golang:1.20-alpine

ENV GO111MODULE=on \
    CGO_ENABLED=0

WORKDIR /app

# Install reflex for hot reloading
RUN go install github.com/cosmtrek/air@latest


COPY ["go.mod", "go.sum", "./"]
RUN go mod download

COPY . /app


