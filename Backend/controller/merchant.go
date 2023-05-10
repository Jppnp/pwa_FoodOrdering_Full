package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"

	"github.com/gin-gonic/gin"
)

type MerchantController struct{}

func (mc *MerchantController) AddMerchant(c *gin.Context) {
	var merchant models.Merchant
	c.BindJSON(&merchant)
	config.DB.Create(&merchant)
	c.JSON(200, &merchant)
}

func (mc *MerchantController) GetAllMerchant(c *gin.Context) {
	merchants := []models.Merchant{}
	config.DB.Find(&merchants)
	c.IndentedJSON(http.StatusOK, &merchants)
}

func (mc *MerchantController) GetMerchantById(c *gin.Context) {
	var merchant models.Merchant
	id := c.Param("id")
	config.DB.Where("id = ?", id).Find(&merchant)
	c.IndentedJSON(http.StatusOK, &merchant)
}

func (mc *MerchantController) UpdateMerchant(c *gin.Context) {
	var merchant models.Merchant
	id := c.Param("id")
	config.DB.Where("id = ?", id).First(&merchant)
	c.BindJSON(&merchant)
	config.DB.Save(&merchant)
	c.IndentedJSON(http.StatusOK, &merchant)
}

func (mc *MerchantController) DeleteMerchant(c *gin.Context) {
	var merchant models.Merchant
	id := c.Param("id")
	config.DB.Where("id = ?", id).Delete(&merchant)
	c.JSON(200, &merchant)
}

type AdminController struct{}

func (am *AdminController) AddAdmin(c *gin.Context) {
	var admin models.Admin
	c.BindJSON(&admin)
	config.DB.Create(&admin)
	c.IndentedJSON(http.StatusOK, &admin)
}

func (am *AdminController) UpdateAdmin(c *gin.Context) {
	var admin models.Admin
	rid := c.Param("rid")
	mid := c.Param("mid")
	config.DB.Where("rid = ? && mid = ?", rid, mid).First(&admin)
	c.BindJSON(&admin)
	config.DB.Save(&admin)
	c.IndentedJSON(http.StatusOK, &admin)
}

func (am *AdminController) DeleteAdmin(c *gin.Context) {
	var admin models.Admin
	rid := c.Param("rid")
	mid := c.Param("mid")
	config.DB.Where("rid = ? && mid = ?", rid, mid).Delete(&admin)
	c.IndentedJSON(http.StatusOK, &admin)
}
