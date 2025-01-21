import React, {useEffect, useRef, useState} from "react";

export const Timer = ({ targetTimestamp }: {targetTimestamp: number}) => {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const [isFinished, setIsFinished] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetTimestamp - now;

    if (difference > 0) {
      const minutes = Math.floor(difference / 1000 / 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { minutes, seconds };
    } else {
      return { minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0 && !isFinished) {
        setIsFinished(true);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [targetTimestamp]);

  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0 && isFinished) {
      alert("Время вышло!");
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [timeLeft, isFinished]);

  return (
    <div>
      <h1>
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </h1>
    </div>
  );
};