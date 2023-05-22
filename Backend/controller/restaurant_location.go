package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type LocationController struct{}

func (lc *LocationController) GetRestaurantLocations(c *gin.Context) {
	var locations []models.RestaurantLocation
	if err := config.DB.Find(&locations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get restaurant locations"})
		return
	}
	c.JSON(http.StatusOK, locations)
}
func (lc *LocationController) GetLocationByLocationID(c *gin.Context) {
	id := c.Param("id")
	var location models.RestaurantLocation
	if err := config.DB.Where("id = ?", id).First(&location).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find restaurant location"})
		return
	}
	c.JSON(http.StatusOK, location)
}

func (lc *LocationController) GetRestaurantLocationsByRestaurantID(c *gin.Context) {
	// Get the restaurant ID from the request parameter
	restaurantID := c.Param("restaurantID")

	var locations []models.RestaurantLocation

	// Retrieve the restaurant locations by restaurant ID from the database
	if err := config.DB.Where("restaurant_id = ?", restaurantID).Find(&locations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch restaurant locations"})
		return
	}

	c.JSON(http.StatusOK, locations)
}

func (lc *LocationController) CreateRestaurantLocation(c *gin.Context) {
	// Bind the request body to the RestaurantLocation struct
	var location models.RestaurantLocation
	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the restaurant location in the database
	if err := config.DB.Create(&location).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create restaurant location"})
		return
	}

	c.JSON(http.StatusCreated, location)
}

func (lc *LocationController) UpdateRestaurantLocation(c *gin.Context) {
	// Get the location ID from the request parameter
	locationID := c.Param("id")

	// Retrieve the existing restaurant location from the database
	var location models.RestaurantLocation
	if err := config.DB.First(&location, locationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Restaurant location not found"})
		return
	}

	// Bind the request body to the updated RestaurantLocation struct
	var updatedLocation models.RestaurantLocation
	if err := c.ShouldBindJSON(&updatedLocation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the restaurant location in the database
	location.Address = updatedLocation.Address
	location.Lat = updatedLocation.Lat
	location.Lng = updatedLocation.Lng
	if err := config.DB.Save(&location).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update restaurant location"})
		return
	}

	c.JSON(http.StatusOK, location)
}

func (lc *LocationController) DeleteRestaurantLocation(c *gin.Context) {
	locationID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid restaurant location ID"})
		return
	}

	var location models.RestaurantLocation
	if err := config.DB.First(&location, locationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "restaurant location not found"})
		return
	}

	if err := config.DB.Delete(&location).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete restaurant location"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "restaurant location deleted"})
}
