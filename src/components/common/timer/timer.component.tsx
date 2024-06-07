'use client'

import { useEffect, useState } from "react";

type TimerType = {
  containerClass?: string;
  boxClass?: string;
  textClass?: string;
  labelClass?: string;
  labelPosition?: 'top' | 'bottom' | 'none';
  drawDate?: string
}

export function Timer({ containerClass, boxClass, textClass, labelClass, labelPosition, drawDate }: TimerType) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const updateCountdown = () => {
    const now = new Date().getTime();
    const tempDrawDate = new Date('2024-06-01T00:00:00').getTime();
    const distance = (drawDate ? new Date(drawDate).getTime() : tempDrawDate) - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  const renderBox = (value: number, label: string) => (
    <div className={`flex flex-col ${boxClass}`}>
      {labelPosition === 'top' && <div className={labelClass}>{label}</div>}
      <div className={textClass}>{value < 0 ? '00' : value < 10 ? `0${value}` : value}</div>

      {labelPosition === 'bottom' && <div className={labelClass}>{label}</div>}
    </div>
  );

  return (
    <section className={`flex flex-row gap-2 ${containerClass}`}>
      {renderBox(countdown?.days, 'Day')}
      {renderBox(countdown?.hours, 'Hrs')}
      {renderBox(countdown?.minutes, 'Min')}
      {renderBox(countdown?.seconds, 'Sec')}
    </section>
  )
}
