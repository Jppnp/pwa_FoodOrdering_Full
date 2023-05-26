package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"pwaV3/config"
	"pwaV3/models"
)

type PaymentController struct{}

func (pc *PaymentController) CreatePayment(c *gin.Context) {
	var payment models.Payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the time zone to Bangkok, Thailand
	loc, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Assign the current time in Bangkok to the payment's Date field
	payment.Date = time.Now().In(loc)

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

	c.JSON(http.StatusOK, payment)
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
