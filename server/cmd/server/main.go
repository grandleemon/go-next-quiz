package main

import (
	"github.com/gin-gonic/gin"

	cors "github.com/rs/cors/wrapper/gin"
)

type Answer struct {
	Title     string `json:"title"`
	IsCorrect bool   `json:"isCorrect"`
}

type Question struct {
	Title   string   `json:"title"`
	Answers []Answer `json:"answers"`
}

var quiz = []Question{
	{Title: "Question1", Answers: []Answer{
		{Title: "Correct Answer", IsCorrect: true},
		{Title: "Incorrect Answer", IsCorrect: false},
		{Title: "Incorrect Answer", IsCorrect: false},
		{Title: "Incorrect Answer", IsCorrect: false},
	}},
	{Title: "Question2", Answers: []Answer{
		{Title: "Correct Answer", IsCorrect: true},
		{Title: "Incorrect Answer", IsCorrect: false},
		{Title: "Incorrect Answer", IsCorrect: false},
		{Title: "Incorrect Answer", IsCorrect: false},
	}},
	{Title: "Question3", Answers: []Answer{
		{Title: "Correct Answer", IsCorrect: true},
		{Title: "Incorrect Answer", IsCorrect: false},
		{Title: "Incorrect Answer", IsCorrect: false},
		{Title: "Incorrect Answer", IsCorrect: false},
	}},
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, quiz)
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
