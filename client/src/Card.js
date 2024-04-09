// Card.js
import React, { useState, useEffect } from "react";

function Card({ card, onClick, saleEndTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (saleEndTime) {
      const timer = setInterval(() => {
        const difference = +new Date(saleEndTime) - +new Date();
        const timeLeft = difference > 0 ? formatTimeLeft(difference) : null;
        setTimeLeft(timeLeft);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [saleEndTime]);

  function formatTimeLeft(difference) {
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft
      ? `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
      : "Sale has ended";
  }

  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.imageUrl} alt={card.name} />
      {saleEndTime && <div className="countdown">Sale ends in: {timeLeft}</div>}
    </div>
  );
}

export default Card;
