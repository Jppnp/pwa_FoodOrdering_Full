package controller

import (
	"fmt"
	"net/http"
	"pwaV3/config"
	"pwaV3/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type CustomerController struct{}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 4)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (cc *CustomerController) CreateCustomer(c *gin.Context) {
	var request struct {
		Fname    string `json:"fname"`
		Lname    string `json:"lname"`
		Phone    string `json:"phone"`
		Email    string `json:"email"`
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	customer := models.Customer{
		FName:        request.Fname,
		LName:        request.Lname,
		Email:        request.Email,
		Phone:        request.Phone,
		Username:     request.Username,
		HashPassword: request.Password,
	}

	// Check if the username already exists
	var existingUsername models.Customer
	if err := config.DB.Where("username = ?", customer.Username).First(&existingUsername).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Username already exists"})
		return
	}

	// Check if the email already exists
	var existingEmail models.Customer
	if err := config.DB.Where("email = ?", customer.Email).First(&existingEmail).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Email already exists"})
		return
	}

	hash, _ := HashPassword(customer.HashPassword)
	customer.HashPassword = hash

	if err := config.DB.Create(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, customer)
}

func (cc *CustomerController) GetCustomerByID(c *gin.Context) {
	id := c.Param("id")

	var customer models.Customer

	if err := config.DB.Where("id = ?", id).First(&customer).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "not found customer"})
		return
	}
	c.JSON(http.StatusOK, customer)
}

func (cc *CustomerController) CustomerLogin(c *gin.Context) {
	fmt.Println("Has request")
	var request struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	fmt.Println("Binding")

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "invaild data"})
		return
	}

	var customer models.Customer

	fmt.Println("Finding")
	if err := config.DB.Where("username = ?", request.Username).First(&customer).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "invalid username. please try again"})
		return
	}
	fmt.Println("Checking password")

	match := CheckPasswordHash(request.Password, customer.HashPassword)
	if !match {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "invalid pssword. please try again"})
		return
	}

	fmt.Println("Done")
	c.JSON(http.StatusOK, customer)
}
