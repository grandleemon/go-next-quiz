package main

import (
	"github.com/gin-gonic/gin"

	cors "github.com/rs/cors/wrapper/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.Default())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
