package main

import (
	"github.com/gin-gonic/gin"

	cors "github.com/rs/cors/wrapper/gin"
)

type Answer struct {
	Id        uint   `json:"id"`
	Title     string `json:"title"`
	IsCorrect bool   `json:"isCorrect"`
}

type Question struct {
	Id      uint     `json:"id"`
	Title   string   `json:"title"`
	Answers []Answer `json:"answers"`
}

var quiz = []Question{
	{Id: 1, Title: "Question1", Answers: []Answer{
		{Id: 1, Title: "Correct Answer", IsCorrect: true},
		{Id: 2, Title: "Incorrect Answer", IsCorrect: false},
		{Id: 3, Title: "Incorrect Answer", IsCorrect: false},
		{Id: 4, Title: "Incorrect Answer", IsCorrect: false},
	}},
	{Id: 2, Title: "Question2", Answers: []Answer{
		{Id: 5, Title: "Correct Answer", IsCorrect: true},
		{Id: 6, Title: "Incorrect Answer", IsCorrect: false},
		{Id: 7, Title: "Incorrect Answer", IsCorrect: false},
		{Id: 8, Title: "Incorrect Answer", IsCorrect: false},
	}},
	{Id: 3, Title: "Question3", Answers: []Answer{
		{Id: 9, Title: "Correct Answer", IsCorrect: true},
		{Id: 10, Title: "Incorrect Answer", IsCorrect: false},
		{Id: 11, Title: "Incorrect Answer", IsCorrect: false},
		{Id: 12, Title: "Incorrect Answer", IsCorrect: false},
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
