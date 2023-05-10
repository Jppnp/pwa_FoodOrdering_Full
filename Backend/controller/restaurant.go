package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"

	"github.com/gin-gonic/gin"
)

type RestaurantController struct{}

func (ad *RestaurantController) AddRestaurant(c *gin.Context) {
	var restaurant models.Restaurant
	c.BindJSON(&restaurant)
	config.DB.Create(&restaurant)
	c.JSON(200, &restaurant)
}

func (ad *RestaurantController) GetAllRestaurant(c *gin.Context) {
	restaurants := []models.Restaurant{}
	config.DB.Find(&restaurants)
	c.IndentedJSON(http.StatusOK, &restaurants)
}

func (ad *RestaurantController) GetRestaurantById(c *gin.Context) {
	var restaurant models.Restaurant
	id := c.Param("id")
	config.DB.Where("id = ?", id).Find(&restaurant)
	c.IndentedJSON(http.StatusOK, &restaurant)
}

func (ad *RestaurantController) UpdateRestaurant(c *gin.Context) {
	var restaurant models.Restaurant
	id := c.Param("id")
	config.DB.Where("id = ?", id).First(&restaurant)
	c.BindJSON(&restaurant)
	config.DB.Save(&restaurant)
	c.IndentedJSON(http.StatusOK, &restaurant)
}

func (ad *RestaurantController) DeleteRestaurant(c *gin.Context) {
	var restaurant models.Restaurant
	id := c.Param("id")
	config.DB.Where("id = ?", id).Delete(&restaurant)
	c.JSON(200, &restaurant)
}
