package config

import (
	"context"
	"fmt"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/storage"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

func CreateStorageClient() (*storage.Client, error) {

	err := godotenv.Load(".env")
	if err != nil {
		return nil, fmt.Errorf("error loading .env file : %v", err)
	}

	config := &firebase.Config{
		StorageBucket: "foodordering-93661.appspot.com",
	}
	opt := option.WithCredentialsFile(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"))
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, config, opt)
	if err != nil {
		return nil, fmt.Errorf("error create client: %v", err)
	}
	storage, err := app.Storage(ctx)
	if err != nil {
		return nil, fmt.Errorf("error connect to storage: %v", err)
	}

	return storage, nil
}
