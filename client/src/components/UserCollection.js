import React from "react";
import Card from "./Card";

const UserCollection = ({ cards }) => {
  return (
    <div>
      <h2>My Collection</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default UserCollection;
