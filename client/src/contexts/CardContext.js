import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CardsContext = createContext();

export const useCards = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cards-range")
      .then((response) => {
        setCards(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch cards:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <CardsContext.Provider value={{ cards, isLoading }}>
      {children}
    </CardsContext.Provider>
  );
};
