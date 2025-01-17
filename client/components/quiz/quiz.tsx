"use client";

import {useEffect, useState} from "react";

interface Answer {
  title: string;
  isSelected: boolean;
}

interface Question {
  title: string;
  answers: Answer[]
}

export const Quiz = () => {
  const [quiz, setQuiz] = useState<null | Question[]>(null);

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch("http://localhost:8080/ping");
      const data = await response.json();

      setQuiz(data.map(item => ({
        ...item,
        answers: item.answers.map(answer => ({
          ...answer, isSelected: false
        }))
      })));
    }

    try {
      getQuiz()
    } catch (e) {
      console.error(e);
    }
  }, []);

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    setQuiz(prevState => {
      if (prevState) {
        return prevState.map((question, index) => {
          if (index === questionIndex) {
            return {
              ...question, answers: question.answers.map((answer, index) => {
                if (index === answerIndex) {
                  return {...answer, isSelected: !answer.isSelected}
                }

                return answer
              })
            };
          }

          return question
        })
      }
    })
  }

  return Array.isArray(quiz) && quiz.length > 0 && quiz.map((item, questionIndex) => {
    return (
      <div className="flex flex-col gap-y-4 mb-4" key={questionIndex}>
        {item.title}
        <ul className="flex gap-x-4">
          {Array.isArray(item.answers) && item.answers.length > 0 && item.answers.map((answer, answerIndex) => {
            return (
              <li key={answerIndex}
                  className={`p-4 cursor-pointer bg-amber-200 hover:bg-amber-50 transition-colors ${answer.isSelected ? "outline outline-1 outline-amber-950" : ""}`}
                  onClick={() => selectAnswer(questionIndex, answerIndex)}
              >
                {answer.title}
              </li>
            )
          })}
        </ul>
      </div>
    )
  })
}


