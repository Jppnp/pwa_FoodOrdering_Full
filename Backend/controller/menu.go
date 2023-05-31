package controller

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"path/filepath"
	"pwaV3/config"
	"pwaV3/models"
	"strconv"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
)

type MenuController struct{}

func (mc *MenuController) GetAllMenus(c *gin.Context) {
	var menu []models.Menu
	config.DB.Find(&menu)
	c.JSON(http.StatusOK, menu)
}

func (mc *MenuController) GetMenu(c *gin.Context) {
	id := c.Param("id")
	var menu models.Menu
	if err := config.DB.Where("id = ? ", id).First(&menu).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu not found"})
		return
	}

	c.JSON(http.StatusOK, &menu)
}

func (mc *MenuController) GetSellMenuByLocation(c *gin.Context) {
	rid := c.Param("rid")

	var location models.RestaurantLocation
	if err := config.DB.Preload("Menus").First(&location, rid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch restaurant location"})
		return
	}
	if location.Menus == nil {
		c.JSON(http.StatusOK, []models.Menu{})
		return
	}

	var sellMenus []models.Menu
	for _, menu := range location.Menus {
		if menu.Status == "sell" {
			sellMenus = append(sellMenus, menu)
		}
	}

	c.JSON(http.StatusOK, sellMenus)
}

func (mc *MenuController) GetMenusByLocation(c *gin.Context) {
	rid := c.Param("rid")

	var location models.RestaurantLocation
	if err := config.DB.Preload("Menus").First(&location, rid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch restaurant location"})
		return
	}

	if location.Menus == nil {
		c.JSON(http.StatusOK, []models.Menu{})
		return
	}

	c.JSON(http.StatusOK, location.Menus)
}

// CreateMenu creates a new menu item for a specific restaurant location
func (mc *MenuController) CreateMenu(c *gin.Context) {
	r_l_id, errorId := strconv.ParseUint(c.Param("rid"), 10, 64)
	if errorId != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found restaurant location"})
		fmt.Println("get Id")
		return
	}

	var menu models.Menu
	err := c.ShouldBind(&menu)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println("Binding data")
		return
	}
	fmt.Println("Getting storage...")

	storageClient, err := config.CreateStorageClient()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot create storage client"})
		fmt.Println(err.Error())
		return
	}

	// get image
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println("Get image")
		return
	}

	// select Restaurant Location where create menu
	menu.RestaurantLocationID = uint(r_l_id)

	// Save the menu record to the database
	menu.ImagePath = ""
	if err := config.DB.Create(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println("create")
		return
	}

	fmt.Println("Unique File name Generating...")
	// Generate a unique file name for the image
	filename := fmt.Sprintf("%d%s", menu.ID, filepath.Ext(file.Filename))

	fmt.Println("Getting bucket")
	ctx := context.Background()
	bucketName := "foodordering-93661.appspot.com"
	bucket, err := storageClient.DefaultBucket()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot get default bucket"})
		return
	}

	fmt.Println("Creating Object")

	objWriter := bucket.Object(filename).NewWriter(ctx)
	defer objWriter.Close()

	// set acl permission: all users only read
	acl := storage.ACLRule{
		Entity: storage.AllUsers,
		Role:   storage.RoleReader,
	}

	objWriter.ACL = []storage.ACLRule{acl}

	imageFile, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot open image file"})
		return
	}
	defer imageFile.Close()

	fmt.Println("Uploading image to storage...")
	if _, err = io.Copy(objWriter, imageFile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot upload image file"})
		return
	}

	fmt.Println("Upload Success!")

	// Update the menu's ImagePath field
	menu.ImagePath = fmt.Sprintf("https://storage.googleapis.com/%s/%s", bucketName, filename)

	// add status
	menu.Status = "sell"

	// Save the menu record to the database
	if err := config.DB.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot save menu record"})
		return
	}

	// TODO: Return the created menu as a response
	c.JSON(http.StatusCreated, menu)
}

// UpdateMenu updates an existing menu item for a specific restaurant location
func (mc *MenuController) UpdateMenu(c *gin.Context) {
	r_l_id := c.Param("rid")
	menuIDStr := c.Param("menuID")
	menuID, err := strconv.ParseUint(menuIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}

	var location models.RestaurantLocation
	if err := config.DB.Preload("Menus").First(&location, r_l_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Restaurant location not found"})
		return
	}

	var menu models.Menu
	for i := range location.Menus {
		if location.Menus[i].ID == uint(menuID) {
			menu = location.Menus[i]
			break
		}
	}

	if menu.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
		return
	}

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update menu item"})
		return
	}

	c.JSON(http.StatusOK, menu)
}

// DeleteMenu deletes a menu item for a specific restaurant location
func (mc *MenuController) DeleteMenu(c *gin.Context) {
	r_l_id := c.Param("rid")
	menuIDStr := c.Param("menuID")
	menuID, err := strconv.ParseUint(menuIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}

	var location models.RestaurantLocation
	if err := config.DB.Preload("Menus").First(&location, r_l_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Restaurant location not found"})
		return
	}

	var menu models.Menu
	for i := range location.Menus {
		if location.Menus[i].ID == uint(menuID) {
			menu = location.Menus[i]
			break
		}
	}

	if menu.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
		return
	}

	// Delete the image from storage
	storageClient, err := config.CreateStorageClient()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot create storage client"})
		return
	}

	// Extract the filename from the ImagePath
	url, err := url.Parse(menu.ImagePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid image URL"})
		return
	}

	filename := filepath.Base(url.Path)

	ctx := context.Background()
	bucket, err := storageClient.DefaultBucket()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot get default bucket"})
		return
	}

	obj := bucket.Object(filename)
	if err := obj.Delete(ctx); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete image from storage"})
		return
	}

	if err := config.DB.Delete(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete menu item"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Menu item deleted successfully"})
}

func (mc *MenuController) ChangeMenuStatusToSold(c *gin.Context) {
	menuID := c.Param("id")

	var menu models.Menu
	if err := config.DB.First(&menu, menuID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch menu"})
		return
	}

	if menu.Status != "sell" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Menu is not currently for sale"})
		return
	}

	menu.Status = "sold"
	if err := config.DB.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update menu status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Menu status updated to sold"})
}

func (mc *MenuController) ChangeMenuStatusToSell(c *gin.Context) {
	menuID := c.Param("id")

	var menu models.Menu
	if err := config.DB.First(&menu, menuID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch menu"})
		return
	}

	if menu.Status != "sold" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Menu is not currently sold"})
		return
	}

	menu.Status = "sell"
	if err := config.DB.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update menu status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Menu status updated to sell"})
}
