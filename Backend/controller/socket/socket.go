package websocket

import (
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// ServeWebSocket handles the WebSocket connection upgrade and client management.
func ServeWebSocket(manager *ClientManager) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			log.Println("Failed to upgrade to WebSocket:", err)
			return
		}

		restaurantLocationIDStr := c.Query("restaurant_location_id") // Extract the restaurant location ID from the request query params
		restaurantLocationID, err := strconv.ParseUint(restaurantLocationIDStr, 10, 32)
		if err != nil {
			log.Println("Invalid restaurant location ID:", err)
			return
		}

		client := &Client{
			conn:                 conn,
			restaurantLocationID: uint(restaurantLocationID),
		}
		manager.AddClient(client)

		// Handle WebSocket messages
		for {
			_, _, err := conn.ReadMessage()
			if err != nil {
				log.Println("Failed to read message:", err)
				break
			}
		}

		manager.RemoveClient(client)

		conn.Close()
	}
}
