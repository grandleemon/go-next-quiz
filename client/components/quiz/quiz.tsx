"use client";

import {useEffect, useState} from "react";
import type {QuizType} from "@/components/quiz/types";
import {Question} from "./question";
import {Timer} from "@/components/timer/timer";

export const Quiz = () => {
  const [quiz, setQuiz] = useState<null | QuizType>(null);

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch("http://localhost:8080/quiz/generate");
      const data = await response.json();

      setQuiz(data);
    }

    try {
      getQuiz()
    } catch (e) {
      console.error(e);
    }
  }, []);

  return Array.isArray(quiz?.questions) && quiz?.questions.length > 0 && <div>
    <Timer targetTimestamp={new Date(quiz?.expiresAt).getTime()} />
    {quiz?.questions.map((item, questionIndex) => {
      return <Question {...item} key={questionIndex}/>
    })}
  </div>
}


