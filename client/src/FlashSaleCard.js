// FlashSaleCard.js
import React, { useState, useEffect } from "react";

function FlashSaleCard({ saleCard }) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(saleCard.endDateTime)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(saleCard.endDateTime));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flash-sale-card">
      <img src={saleCard.imageUrl} alt={saleCard.name} />
      <div className="countdown">
        {timeLeft
          ? `Sale ends in: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
          : "Sale has ended"}
      </div>
    </div>
  );
}

function calculateTimeLeft(endDateTime) {
  const difference = +new Date(endDateTime) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export default FlashSaleCard;
