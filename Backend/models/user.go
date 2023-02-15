package models

type User struct {
	Id       int    `json:"id" gorm:"primary_key"`
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
}
