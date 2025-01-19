package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	cors "github.com/rs/cors/wrapper/gin"
)

type Answer struct {
	Id    uint   `json:"id"`
	Title string `json:"title"`
}

type Question struct {
	Id              uint     `json:"id"`
	Title           string   `json:"title"`
	Answers         []Answer `json:"answers"`
	CorrectAnswerId uint     `json:"correctAnswerId"`
}

type ResponseAnswer struct {
	Id    uint   `json:"id"`
	Title string `json:"title"`
}

type ResponseQuestion struct {
	Id      uint             `json:"id"`
	Title   string           `json:"title"`
	Answers []ResponseAnswer `json:"answers"`
}

var quiz = []Question{
	{Id: 1, Title: "Question1", CorrectAnswerId: 1, Answers: []Answer{
		{Id: 1, Title: "Correct Answer"},
		{Id: 2, Title: "Incorrect Answer"},
		{Id: 3, Title: "Incorrect Answer"},
		{Id: 4, Title: "Incorrect Answer"},
	}},
	{Id: 2, Title: "Question2", CorrectAnswerId: 5, Answers: []Answer{
		{Id: 5, Title: "Correct Answer"},
		{Id: 6, Title: "Incorrect Answer"},
		{Id: 7, Title: "Incorrect Answer"},
		{Id: 8, Title: "Incorrect Answer"},
	}},
	{Id: 3, Title: "Question3", CorrectAnswerId: 9, Answers: []Answer{
		{Id: 9, Title: "Correct Answer"},
		{Id: 10, Title: "Incorrect Answer"},
		{Id: 11, Title: "Incorrect Answer"},
		{Id: 12, Title: "Incorrect Answer"},
	}},
}

func findIndex(slice []Question, predicate func(Question) bool) int {
	for i, v := range slice {
		if predicate(v) {
			return i
		}
	}
	return -1
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())
	r.GET("/quiz/generate", func(c *gin.Context) {
		response := make([]ResponseQuestion, len(quiz))

		for i, q := range quiz {
			answers := make([]ResponseAnswer, len(q.Answers))
			for j, a := range q.Answers {
				answers[j] = ResponseAnswer{Id: a.Id, Title: a.Title}
			}
			response[i] = ResponseQuestion{
				Id:      q.Id,
				Title:   q.Title,
				Answers: answers,
			}
		}

		c.JSON(200, response)
	})
	r.POST("/quiz/verify", func(c *gin.Context) {
		var userAnswers map[int]int
		if err := c.ShouldBindJSON(&userAnswers); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid JSON format",
			})

			return
		}

		totalCorrectAnswers := 0

		for questionId, answerId := range userAnswers {
			questionIndex := findIndex(quiz, func(question Question) bool {
				return question.Id == uint(questionId)
			})

			if questionIndex != -1 && quiz[questionIndex].CorrectAnswerId == uint(answerId) {
				totalCorrectAnswers++
			}
		}

		c.JSON(200, totalCorrectAnswers)
	})
	r.GET("/quiz/active", func(c *gin.Context) {
		c.JSON(200, quiz)
	})
	r.Run()
}
