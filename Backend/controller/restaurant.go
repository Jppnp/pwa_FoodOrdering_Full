package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RestaurantController struct{}

func (rc *RestaurantController) GetRestaurants(c *gin.Context) {
	var restaurants []models.Restaurant
	if err := config.DB.Preload("RestaurantLocations").Find(&restaurants).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get restaurants"})
		return
	}
	c.JSON(http.StatusOK, restaurants)
}

func (rc *RestaurantController) GetRestaurantByID(c *gin.Context) {
	restaurantID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid restaurant ID"})
		return
	}

	var restaurant models.Restaurant
	if err := config.DB.Preload("RestaurantLocations").First(&restaurant, restaurantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "restaurant not found"})
		return
	}
	c.JSON(http.StatusOK, restaurant)
}

func (rc *RestaurantController) CreateRestaurant(c *gin.Context) {
	var restaurant models.Restaurant
	if err := c.ShouldBindJSON(&restaurant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid restaurant data"})
		return
	}
	if err := config.DB.Create(&restaurant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create restaurant"})
		return
	}
	c.JSON(http.StatusCreated, restaurant)
}

func (rc *RestaurantController) UpdateRestaurant(c *gin.Context) {
	restaurantID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid restaurant ID"})
		return
	}

	var restaurant models.Restaurant
	if err := config.DB.First(&restaurant, restaurantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "restaurant not found"})
		return
	}

	if err := c.ShouldBindJSON(&restaurant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid restaurant data"})
		return
	}

	if err := config.DB.Save(&restaurant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update restaurant"})
		return
	}

	c.JSON(http.StatusOK, restaurant)
}

func (rc *RestaurantController) DeleteRestaurant(c *gin.Context) {
	restaurantID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid restaurant ID"})
		return
	}

	var restaurant models.Restaurant
	if err := config.DB.First(&restaurant, restaurantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "restaurant not found"})
		return
	}

	if err := config.DB.Delete(&restaurant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete restaurant"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "restaurant deleted"})
}
