package websocket

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

// Client represents a connected WebSocket client.
type Client struct {
	conn                 *websocket.Conn
	restaurantLocationID uint
}

// ClientManager manages the connected WebSocket clients.
type ClientManager struct {
	clients map[uint]*Client
	mutex   sync.Mutex
}

// NewClientManager creates a new instance of ClientManager.
func NewClientManager() *ClientManager {
	return &ClientManager{
		clients: make(map[uint]*Client),
	}
}

// AddClient adds a new client to the manager.
func (cm *ClientManager) AddClient(client *Client) {
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	cm.clients[client.restaurantLocationID] = client
}

// RemoveClient removes a client from the manager.
func (cm *ClientManager) RemoveClient(client *Client) {
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	delete(cm.clients, client.restaurantLocationID)
}

// SendToClientByLocationID sends a message to a client with a specific restaurant location ID.
func (cm *ClientManager) SendToClientByLocationID(restaurantLocationID uint, message []byte) {
	cm.mutex.Lock()
	defer cm.mutex.Unlock()

	client, found := cm.clients[restaurantLocationID]
	if !found {
		log.Println("Client not found for restaurant location ID:", restaurantLocationID)
		return
	}

	err := client.conn.WriteMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("Failed to send message to client:", err)
	}
}
