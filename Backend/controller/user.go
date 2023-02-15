package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	users := []models.User{}
	config.DB.Find(&users)
	c.IndentedJSON(http.StatusOK, &users)
}

func CreateUser(c *gin.Context) {
	var user models.User
	c.BindJSON(&user)
	config.DB.Create(&user)
	c.JSON(200, &user)

}

func DeleteUser(c *gin.Context) {
	var user models.User

	config.DB.Where("id = ?", c.Param("id")).Delete(&user)
	c.JSON(200, &user)
}

func UpadateUser(c *gin.Context) {
	var user models.User

	config.DB.Where("id = ?", c.Param("id")).First(&user)
	c.BindJSON(&user)
	config.DB.Save(&user)
	c.JSON(200, &user)
}

func GetUserById(c *gin.Context) {
	var user models.User
	id := c.Param("id")
	config.DB.Where("id = ?", id).Find(&user)
	c.IndentedJSON(http.StatusOK, &user)
}
