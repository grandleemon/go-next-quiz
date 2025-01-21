"use client";

import type {QuizQuestion} from "./types"
import {Answer} from "@/components/quiz/answer";

export const Question = ({title, answers, id: questionId}: QuizQuestion) => {
  return <div className="flex flex-col gap-y-4 mb-4">
    <h3>{title}</h3>

    {answers && <ul className="flex gap-x-4">
      {answers.map((answer, answerIndex) => (
          <Answer
            key={answerIndex}
            title={answer.title}
            id={answer.id}
            questionId={questionId}
          />
        )
      )}
    </ul>
    }
  </div>
}