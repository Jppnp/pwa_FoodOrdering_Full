package controller

import (
	"net/http"
	"pwaV3/config"
	"pwaV3/models"
	"strconv"
	"time"

	websocket "pwaV3/controller/socket"

	"github.com/gin-gonic/gin"
)

type OrderController struct {
	Manager *websocket.ClientManager
}

func (oc *OrderController) CreateOrder(c *gin.Context) {
	var request struct {
		RestaurantLocationID uint               `json:"restaurant_location_id"`
		CustomerID           uint               `json:"customer_id"`
		Items                []models.OrderItem `json:"items"`
		Payment              uint               `json:"payment_id"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// Set the time zone to Bangkok, Thailand
	loc, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Create the order
	order := models.Order{
		Status:               "queue",
		RestaurantLocationID: request.RestaurantLocationID,
		OrderItems:           request.Items,
		CustomerID:           request.CustomerID,
		Date:                 time.Now().In(loc),
		PaymentsID:           request.Payment,
	}

	// Save the order
	if err := config.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	// Save the order items
	for i := range order.OrderItems {
		order.OrderItems[i].OrderID = order.ID
		if err := config.DB.Save(&order.OrderItems[i]).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}
	// Send notification to clients with the specific restaurant location ID
	message := []byte("New order created: " + strconv.FormatUint(uint64(order.ID), 10))
	oc.Manager.SendToClientByLocationID(order.RestaurantLocationID, message)

	c.JSON(http.StatusCreated, gin.H{"order": order})
}

func (oc *OrderController) GetAllOrder(c *gin.Context) {
	var orders []models.Order
	if err := config.DB.Preload("OrderItems").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, orders)
}

func (oc *OrderController) GetOrdersByLocationID(c *gin.Context) {
	locationID := c.Param("locationID")
	var orders []models.Order
	if err := config.DB.Preload("OrderItems").Where("restaurant_location_id = ?", locationID).Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

func (oc *OrderController) UpdateOrderStatusToCooking(c *gin.Context) {
	orderID := c.Param("orderID")

	var order models.Order
	if err := config.DB.First(&order, orderID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Order not found"})
		return
	}

	if order.Status != "queue" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid order status"})
		return
	}

	order.Status = "cooking"
	if err := config.DB.Save(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order status updated to cooking"})
}

func (oc *OrderController) UpdateOrderStatusToSuccess(c *gin.Context) {
	orderID := c.Param("orderID")

	var order models.Order
	if err := config.DB.First(&order, orderID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Order not found"})
		return
	}

	if order.Status != "cooking" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid order status"})
		return
	}

	order.Status = "success"
	if err := config.DB.Save(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order status updated to success"})
}

func (oc *OrderController) GetOrderByCustomerID(c *gin.Context) {
	customerID := c.Param("customerID")

	var orders []models.Order
	if err := config.DB.Preload("OrderItems").Find(&orders, &customerID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, orders)
}

func (oc *OrderController) GetOrdersWithQueueStatus(c *gin.Context) {
	var orders []models.Order
	if err := config.DB.Preload("OrderItems").Where("status = ?", "queue").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}
