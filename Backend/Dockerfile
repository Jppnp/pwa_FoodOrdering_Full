FROM golang:1.19-alpine

WORKDIR /app

# Copy go.mod and go.sum files
COPY ["go.mod", "go.sum", "./"]

# Download and install Go dependencies
RUN go mod download

# Copy the rest of the application files
COPY . /app


# Make the wait-for-db.sh script executable
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

RUN chmod 755 /app/wait-for-db.sh

# Set the entry point to wait-for-db.sh script
RUN CGO_ENABLED=0 go build -o app

# ENTRYPOINT ["sh", "/app/wait-for-db.sh"]


# CMD ["tail", "-f", "/dev/null"]


