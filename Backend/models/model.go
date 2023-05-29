package models

import (
	"time"
)

type Merchant struct {
	ID                   uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	FName                string `json:"fname"`
	LName                string `json:"lname"`
	Email                string `json:"email"`
	Password             string `json:"password"`
	Role                 string `json:"role"`
	RestaurantLocationID uint   `json:"restaurant_location_id"`
}
type Restaurant struct {
	ID                  uint                 `json:"id" gorm:"primaryKey"`
	Name                string               `json:"name" gorm:"not null"`
	RestaurantLocations []RestaurantLocation `gorm:"foreignKey:RestaurantID"`
}

type RestaurantLocation struct {
	ID           uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string  `json:"name"`
	Address      string  `json:"address"`
	Lat          float64 `json:"lat"`
	Lng          float64 `json:"lng"`
	RestaurantID uint    `json:"restaurant_id" gorm:"not null"`
	Menus        []Menu  `gorm:"foreignKey:RestaurantLocationID"`
	Orders       []Order `gorm:"foreignKey:RestaurantLocationID"`
}

type Menu struct {
	ID                   uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name                 string  `json:"name"`
	Description          string  `json:"description"`
	Price                float64 `json:"price"`
	Category             string  `json:"category"`
	ImagePath            string  `json:"image_path"`
	RestaurantLocationID uint    `json:"restaurant_location_id"`
}
type Order struct {
	ID                   uint        `gorm:"primaryKey;autoIncrement" json:"id"`
	Status               string      `json:"status"`
	RestaurantLocationID uint        `json:"restaurant_location_id"`
	OrderItems           []OrderItem `gorm:"foreignKey:OrderID"`
	CustomerID           uint        `json:"customer_id"`
	Date                 time.Time   `json:"date"`
	PaymentID            uint        `json:"payment_id"`
}

type OrderItem struct {
	ID       uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	OrderID  uint   `json:"order_id"`
	MenuID   uint   `json:"menu_id" gorm:"not null"`
	Note     string `json:"note"`
	Quantity uint   `json:"quantity"`
}

type Payment struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Reference string    `json:"reference"`
	Type      string    `json:"type"`
	Status    string    `json:"status"`
	Price     float64   `json:"price"`
	Date      time.Time `json:"date"`
	Order     Order
}
type Customer struct {
	ID           uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	FName        string  `json:"fname"`
	LName        string  `json:"lname"`
	Email        string  `json:"email"`
	Phone        string  `json:"phone"`
	Username     string  `json:"username"`
	HashPassword string  `json:"password"`
	Orders       []Order `gorm:"foreignKey:CustomerID"`
}
