package routes

import (
	"github.com/gin-gonic/gin"

	"pwaV3/controller"
	websocket "pwaV3/controller/socket"
)

func SetupRoutes(router *gin.Engine) {
	manager := websocket.NewClientManager()

	merchantController := &controller.MerchantController{}
	restaurantController := &controller.RestaurantController{}
	locationController := &controller.LocationController{}
	menuController := &controller.MenuController{}
	OrderController := &controller.OrderController{
		Manager: manager,
	}
	CustomerController := &controller.CustomerController{}
	PaymentController := &controller.PaymentController{}

	merchantRoutes := router.Group("/merchants")
	{
		merchantRoutes.GET("", merchantController.GetMerchants)
		merchantRoutes.GET(":id", merchantController.GetMerchantByID)
		merchantRoutes.GET("email/:email", merchantController.GetMerChantByEmail)
		merchantRoutes.POST("", merchantController.CreateMerchant)
		merchantRoutes.PATCH(":id", merchantController.UpdateMerchant)
		merchantRoutes.DELETE(":id", merchantController.DeleteMerchant)
	}

	restaurantRoutes := router.Group("/restaurants")
	{
		restaurantRoutes.GET("", restaurantController.GetRestaurants)
		restaurantRoutes.GET(":id", restaurantController.GetRestaurantByID)
		restaurantRoutes.POST("", restaurantController.CreateRestaurant)
		restaurantRoutes.PATCH(":id", restaurantController.UpdateRestaurant)
		restaurantRoutes.DELETE(":id", restaurantController.DeleteRestaurant)
	}
	resLocationRoutes := router.Group("/restaurant/locations")
	{
		resLocationRoutes.POST("", locationController.CreateRestaurantLocation)
		resLocationRoutes.GET(":restaurantID", locationController.GetRestaurantLocationsByRestaurantID)
		resLocationRoutes.GET("", locationController.GetRestaurantLocations)
		resLocationRoutes.PATCH(":id", locationController.UpdateRestaurantLocation)
		resLocationRoutes.DELETE(":id", locationController.DeleteRestaurantLocation)
		resLocationRoutes.GET("location/:id", locationController.GetLocationByLocationID)
	}

	menuRoutes := router.Group("/menus")
	{
		menuRoutes.POST(":rid", menuController.CreateMenu)
		menuRoutes.GET("", menuController.GetAllMenus)
		menuRoutes.GET("location/:rid", menuController.GetMenusByLocation)
		menuRoutes.GET("location/sell/:rid", menuController.GetSellMenuByLocation)
		menuRoutes.GET(":id", menuController.GetMenu)
		menuRoutes.PATCH("update/:rid/:menuID", menuController.UpdateMenu)
		menuRoutes.DELETE("delete/:rid/:menuID", menuController.DeleteMenu)
		menuRoutes.PUT("status/sold/:id", menuController.ChangeMenuStatusToSold)
		menuRoutes.PUT("status/sell/:id", menuController.ChangeMenuStatusToSell)
	}

	orderRoutes := router.Group("/order")
	{
		orderRoutes.POST("", OrderController.CreateOrder)
		orderRoutes.GET("", OrderController.GetAllOrder)
		orderRoutes.PUT("cooking/:orderID", OrderController.UpdateOrderStatusToCooking)
		orderRoutes.PUT("success/:orderID", OrderController.UpdateOrderStatusToSuccess)
		orderRoutes.GET(":locationID", OrderController.GetOrdersByLocationID)
		orderRoutes.GET("queqe", OrderController.GetOrdersWithQueueStatus)
		orderRoutes.GET("customer/:customerID")
	}

	customerRoutes := router.Group("/customer")
	{
		customerRoutes.POST("", CustomerController.CreateCustomer)
		customerRoutes.GET(":id", CustomerController.GetCustomerByID)
		customerRoutes.POST("login", CustomerController.CustomerLogin)
	}

	paymentRoutes := router.Group("/payment")
	{
		paymentRoutes.POST("", PaymentController.CreatePayment)
		paymentRoutes.DELETE(":id", PaymentController.DeletePayment)
		paymentRoutes.PATCH(":id", PaymentController.UpdatePayment)
		paymentRoutes.GET(":id", PaymentController.GetPayment)
		paymentRoutes.GET("", PaymentController.GetAllPayment)
	}

	router.GET("/ws", websocket.ServeWebSocket(manager))
}
