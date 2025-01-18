"use client";

import clsx from "clsx";
import {QuizAnswer} from "@/components/quiz/types";
import {useAtom} from "jotai";
import {quizAtom} from "@/store/quiz/quizAtom";

interface Props extends QuizAnswer {
  questionId: number;
}

export const Answer = ({title, id, questionId}: Props) => {
  const [quiz, setQuiz] = useAtom(quizAtom)

  const handleSelect = () => {
    setQuiz(prevState => ({...prevState, [questionId]: prevState[questionId] === id ? null : id}))
  }

  return (
    <li className={clsx("p-4 cursor-pointer bg-amber-200 hover:bg-amber-50 transition-colors", {
      "outline outline-1 outline-amber-950": quiz[questionId] === id
    })}
        onClick={handleSelect}
    >
      {title}
    </li>
  )
}