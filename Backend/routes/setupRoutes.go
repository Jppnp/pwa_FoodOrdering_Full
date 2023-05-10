package routes

import (
	"github.com/gin-gonic/gin"

	"pwaV3/controller"
)

func SetupRoutes(router *gin.Engine) {
	merchantController := &controller.MerchantController{}
	restaurantController := &controller.RestaurantController{}
	adminController := &controller.AdminController{}

	merchantRoutes := router.Group("/merchants")
	{
		merchantRoutes.GET("/", merchantController.GetAllMerchant)
		merchantRoutes.GET("/:id", merchantController.GetMerchantById)
		merchantRoutes.POST("/", merchantController.AddMerchant)
		merchantRoutes.PATCH("/:id", merchantController.UpdateMerchant)
		merchantRoutes.DELETE("/:id", merchantController.DeleteMerchant)
	}

	adminRoutes := router.Group("/admins")
	{
		adminRoutes.POST("/", adminController.AddAdmin)
		adminRoutes.PATCH("/:rid/:mid", adminController.UpdateAdmin)
		adminRoutes.DELETE(":rid/:mid", adminController.DeleteAdmin)
	}

	restaurantRoutes := router.Group("/restaurants")
	{
		restaurantRoutes.GET("/", restaurantController.GetAllRestaurant)
		restaurantRoutes.GET("/:id", restaurantController.GetRestaurantById)
		restaurantRoutes.POST("/", restaurantController.AddRestaurant)
		restaurantRoutes.PATCH("/:id", restaurantController.UpdateRestaurant)
		restaurantRoutes.DELETE("/:id", restaurantController.DeleteRestaurant)
	}
}
