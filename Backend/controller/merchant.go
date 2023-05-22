package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MerchantController struct{}

func (mc *MerchantController) GetMerchants(c *gin.Context) {
	var merchants []models.Merchant
	if err := config.DB.Find(&merchants).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get merchants"})
		return
	}
	c.JSON(http.StatusOK, merchants)
}

func (me *MerchantController) GetMerChantByEmail(c *gin.Context) {
	email := c.Param("email")
	var merchant models.Merchant
	if err := config.DB.Where("email = ?", email).First(&merchant).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found user invalid email"})
		return
	}
	c.JSON(http.StatusOK, merchant)
}

func (mc *MerchantController) GetMerchantByID(c *gin.Context) {
	merchantID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid merchant ID"})
		return
	}

	var merchant models.Merchant
	if err := config.DB.First(&merchant, merchantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "merchant not found"})
		return
	}
	c.JSON(http.StatusOK, merchant)
}

func (mc *MerchantController) CreateMerchant(c *gin.Context) {
	var merchant models.Merchant
	if err := c.ShouldBindJSON(&merchant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid merchant data"})
		return
	}

	// Create the merchant in the database
	if err := config.DB.Create(&merchant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create merchant"})
		return
	}

	c.JSON(http.StatusCreated, merchant)
}
func (mc *MerchantController) UpdateMerchant(c *gin.Context) {
	merchantID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid merchant ID"})
		return
	}

	var merchant models.Merchant
	if err := config.DB.First(&merchant, merchantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "merchant not found"})
		return
	}

	if err := c.ShouldBindJSON(&merchant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid merchant data"})
		return
	}

	if err := config.DB.Save(&merchant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update merchant"})
		return
	}

	c.JSON(http.StatusOK, merchant)
}

func (mc *MerchantController) DeleteMerchant(c *gin.Context) {
	merchantID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid merchant ID"})
		return
	}

	var merchant models.Merchant
	if err := config.DB.First(&merchant, merchantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "merchant not found"})
		return
	}

	if err := config.DB.Delete(&merchant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete merchant"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "merchant deleted"})
}
