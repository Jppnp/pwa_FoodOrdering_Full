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
	RestaurantLocationID uint        `gorm:"not null"`
	OrderItems           []OrderItem `gorm:"foreignKey:OrderID" json:"orderItems"`
	CustomerID           uint        `json:"-"`
	Customer             *Customer   `json:"customer"`
}

type OrderItem struct {
	ID       uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	OrderID  uint   `json:"order_id" gorm:"not null"`
	Order    Order  `gorm:"foreignKey:OrderID"`
	MenuID   uint   `json:"menu_id" gorm:"not null"`
	Menu     Menu   `gorm:"foreignKey:MenuID"`
	Note     string `json:"note"`
	Quantity uint   `json:"quantity"`
}

type Customer struct {
	ID       uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	FName    string  `json:"fname"`
	LName    string  `json:"lname"`
	Email    string  `json:"email"`
	Phone    string  `json:"phone"`
	Password string  `json:"-"`
	Orders   []Order `json:"orders"`
}

type Payment struct {
	ID      uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Type    string    `json:"type"`
	Status  string    `json:"status"`
	Amount  float64   `json:"amount"`
	Date    time.Time `json:"date"`
	OrderID uint      `json:"-"`
	Order   Order     `json:"order"`
}
