package config

import (
	"pwaV3/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=postgres user=pwapost password=pwapost dbname=pwa_app port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	// db, err := gorm.Open(postgres.Open("postgresql://postgres:1629@localhost:5432/pwa_app"), &gorm.Config{}) //This for localhost
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&models.Merchant{}, &models.Restaurant{}, &models.RestaurantLocation{}, &models.Customer{}, &models.Menu{}, &models.OrderItem{}, &models.Order{}, &models.Payment{})

	DB = db
}
