package controller

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"pwaV3/config"
	"pwaV3/models"
)

type PaymentController struct{}

func generateReference(length int) string {
	source := rand.NewSource(time.Now().UnixNano())
	random := rand.New(source)

	charset := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	result := make([]byte, length)

	for i := 0; i < length; i++ {
		randomIndex := random.Intn(len(charset))
		result[i] = charset[randomIndex]
	}

	return string(result)
}

func (pc *PaymentController) CreatePayment(c *gin.Context) {
	var request struct {
		Type  string  `json:"type"`
		Price float64 `json:"price"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var payment models.Payment
	// Set the time zone to Bangkok, Thailand
	loc, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Assign the current time in Bangkok to the payment's Date field
	payment.Date = time.Now().In(loc)
	payment.Type = request.Type
	if payment.Type == "online" {
		payment.Status = "paid"
		payment.Reference = generateReference(14)
	} else {
		payment.Status = "notpaid"
		payment.Reference = "cash"
	}
	payment.Price = request.Price

	if err := config.DB.Create(&payment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, payment)
}

func (pc *PaymentController) GetPayment(c *gin.Context) {
	id := c.Param("id")
	var payment models.Payment

	if err := config.DB.First(&payment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, payment)
}

func (pc *PaymentController) UpdatePayment(c *gin.Context) {
	id := c.Param("id")
	var payment models.Payment

	if err := config.DB.First(&payment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&payment)

	c.JSON(http.StatusOK, payment.ID)
}

func (pc *PaymentController) DeletePayment(c *gin.Context) {
	id := c.Param("id")
	var payment models.Payment

	if err := config.DB.First(&payment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	config.DB.Delete(&payment)

	c.JSON(http.StatusOK, gin.H{"message": "Payment deleted successfully"})
}
