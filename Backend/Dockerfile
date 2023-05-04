FROM golang:1.19-alpine

ENV GO111MODULE=on \
    CGO_ENABLED=0

WORKDIR /app


COPY ["go.mod", "go.sum", "./"]
RUN go mod download

COPY . /app
RUN go get github.com/githubnemo/CompileDaemon
RUN go install github.com/githubnemo/CompileDaemon


ENTRYPOINT CompileDaemon -build="go build -o /build/app" -command="/build/app"