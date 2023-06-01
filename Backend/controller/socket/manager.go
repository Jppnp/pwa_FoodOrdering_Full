package websocket

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// Client represents a connected WebSocket client.
type Client struct {
	conn                 *websocket.Conn
	restaurantLocationID uint
	customerID           uint
}

// ClientManager manages the connected WebSocket clients.
type ClientManager struct {
	restaurantClients map[uint]*Client
	customerClients   map[uint]*Client
	mutex             sync.Mutex
}

// NewClientManager creates a new instance of ClientManager.
func NewClientManager() *ClientManager {
	return &ClientManager{
		restaurantClients: make(map[uint]*Client),
		customerClients:   make(map[uint]*Client),
	}
}

// / AddClient adds a new client to the manager.
func (cm *ClientManager) AddClient(client *Client) {
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	if client.restaurantLocationID != 0 {
		cm.restaurantClients[client.restaurantLocationID] = client
	}

	if client.customerID != 0 {
		cm.customerClients[client.customerID] = client
	}
}

// RemoveClient removes a client from the manager.
func (cm *ClientManager) RemoveClient(client *Client) {
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	if client.restaurantLocationID != 0 {
		delete(cm.restaurantClients, client.restaurantLocationID)
	}

	if client.customerID != 0 {
		delete(cm.customerClients, client.customerID)
	}
}

// SendToClientByLocationID sends a message to a client with a specific restaurant location ID.
func (cm *ClientManager) SendToClientByLocationID(restaurantLocationID uint, message []byte) {
	fmt.Println("Send to Restaurant:")
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	client, found := cm.restaurantClients[restaurantLocationID]
	if !found {
		log.Println("Client not found for restaurant location ID:", restaurantLocationID)
		return
	}

	err := client.conn.WriteMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("Failed to send message to client:", err)
	}
	fmt.Println(client)
}

// SendToClientByLocationID sends a message to a client with a specific ID.
func (cm *ClientManager) SendToClientByID(customerID uint, message []byte) {
	fmt.Println("Send to Customer")
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	client, found := cm.customerClients[customerID]
	if !found {
		log.Println("Client not found for ID:", customerID)
		return
	}

	err := client.conn.WriteMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("Failed to send message to client:", err)
	}
	fmt.Println(client)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// Implement your origin check logic here
		// For example, you can allow all origins by returning true:
		return true
	},
}

// ServeWebSocket handles the WebSocket connection upgrade and client management.
func ServeWebSocket(manager *ClientManager) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			log.Println("Failed to upgrade to WebSocket:", err)
			return
		}

		restaurantLocationIDStr := c.Query("restaurant_location_id")
		customerIDStr := c.Query("customer_id")

		// Check if the connection is from a restaurant
		if restaurantLocationIDStr != "" {
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

			// Handle WebSocket messages from the restaurant
			for {
				_, _, err := conn.ReadMessage()
				if err != nil {
					log.Println("Failed to read message:", err)
					break
				}
			}

			manager.RemoveClient(client)
		} else if customerIDStr != "" { // Check if the connection is from a customer
			customerID, err := strconv.ParseUint(customerIDStr, 10, 32)
			if err != nil {
				log.Println("Invalid customer ID:", err)
				return
			}

			client := &Client{
				conn:       conn,
				customerID: uint(customerID),
			}
			manager.AddClient(client)

			// Handle WebSocket messages from the customer
			for {
				_, _, err := conn.ReadMessage()
				if err != nil {
					log.Println("Failed to read message:", err)
					break
				}
			}

			manager.RemoveClient(client)
		} else {
			log.Println("Invalid WebSocket connection")
			return
		}

		conn.Close()
	}
}
