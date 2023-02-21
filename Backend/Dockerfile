FROM golang:1.19-alpine

WORKDIR /app

# Copy go.mod and go.sum files
COPY ["go.mod", "go.sum", "./"]

# Download and install Go dependencies
RUN go mod download

# Copy the rest of the application files
COPY . /app


# Set the entry point to wait-for-db.sh script
RUN CGO_ENABLED=0 go build -o app


