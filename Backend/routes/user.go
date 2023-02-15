package routes

import (
	"pwaV3/controller"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	router.GET("/users", controller.GetAllUsers)
	router.GET("/users/:id", controller.GetUserById)
	router.POST("/add", controller.CreateUser)
	router.DELETE("/:id", controller.DeleteUser)
	router.PUT("/:id", controller.UpadateUser)
}
