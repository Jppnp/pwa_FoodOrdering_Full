package config

import (
	"pwaV3/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// db, err := gorm.Open(postgres.Open("postgresql://postgres:1629@postgres:5432/pwa_app"), &gorm.Config{})
	db, err := gorm.Open(postgres.Open("postgresql://postgres:1629@localhost:5432/pwa_app"), &gorm.Config{}) //This for localhost
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&models.User{})

	DB = db
}
