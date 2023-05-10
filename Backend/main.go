package main

import (
	"pwaV3/config"
	"pwaV3/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config.Connect()
	// Enable CORS
	router.Use(cors.Default())

	routes.SetupRoutes(router)

	router.Run(":8000")
}
