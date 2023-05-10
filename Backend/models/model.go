package models

type User struct {
	Id       int    `json:"id" gorm:"primary_key"`
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
}

type Merchant struct {
	Id       int    `json:"id" gorm:"primary_key"`
	Fname    string `json:"fname"`
	Lname    string `json:"lname"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Restaurant struct {
	Id   int    `json:"id" gorm:"primary_key"`
	Name string `json:"name"`
}

type Admin struct {
	MID        int        `json:"mid" gorm:"primary_key;foreignkey:Id"`
	RID        int        `json:"rid" gorm:"primary_key;foreignkey:Id"`
	Merchant   Merchant   `json:"merchant" gorm:"foreignkey:MID"`
	Restaurant Restaurant `json:"restaurant" gorm:"foreignkey:RID"`
}

type Restaurant_Location struct {
	LID        int        `json:"lid" gorm:"primary_key"`
	RID        int        `json:"rid" gorm:"primary_key;foreignkey:Id"`
	Restaurant Restaurant `json:"restaurant" gorm:"foreignkey:RID"`
}
