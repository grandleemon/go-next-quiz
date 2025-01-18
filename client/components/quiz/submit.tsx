"use client";

import {FormEvent} from "react";
import {useAtomValue} from "jotai";
import {quizAtom} from "@/store/quiz/quizAtom";


export const Submit = () => {
  const finalAnswers = useAtomValue(quizAtom)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(finalAnswers)
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <button className="p-4 border border-black hover:text-white hover:bg-black transition-colors">Submit</button>
      </form>
    </div>
  )
}