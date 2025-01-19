"use client";

import {FormEvent, useState} from "react";
import {useAtomValue} from "jotai";
import {quizAtom} from "@/store/quiz/quizAtom";

export const Submit = () => {
  const finalAnswers = useAtomValue(quizAtom)
  const [totalCorrect, setTotalCorrect] = useState<null | number>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/quiz/verify", {
      body: JSON.stringify(finalAnswers),
      method: "POST"
    });
    const data = await response.json();

    setTotalCorrect(data)
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <button className="p-4 border border-black hover:text-white hover:bg-black transition-colors">Submit</button>
        {totalCorrect !== null && totalCorrect >= 0 && <div className="mt-4">
          {`You answered correct on ${totalCorrect} question${totalCorrect === 1 ? "" : "s"}`}
        </div>}
      </form>
    </div>
  )
}