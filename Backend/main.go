package main

import (
	"log"
	"net/http"
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

	// Start the WebSocket server
	go func() {
		err := http.ListenAndServe(":8080", router)
		if err != nil {
			log.Fatal("WebSocket server error: ", err)
		}
	}()

	router.Run(":8000")
}
