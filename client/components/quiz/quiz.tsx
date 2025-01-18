"use client";

import {useEffect, useState} from "react";
import {QuizQuestion} from "@/components/quiz/types";
import {Question} from "./question";

export const Quiz = () => {
  const [quiz, setQuiz] = useState<null | QuizQuestion[]>(null);

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch("http://localhost:8080/ping");
      const data = await response.json();

      setQuiz(data);
    }

    try {
      getQuiz()
    } catch (e) {
      console.error(e);
    }
  }, []);

  return Array.isArray(quiz) && quiz.length > 0 && quiz.map((item, questionIndex) => {
    return <Question {...item} key={questionIndex}/>
  })
}


