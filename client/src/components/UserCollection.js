import React from "react";
import Card from "./Card";

const UserCollection = ({ cards, onSelectCard }) => {
  return (
    <div className="user-collection">
      <h2>My Collection</h2>
      {cards.length > 0 ? (
        cards.map((card) => (
          <div key={card.id} onClick={() => onSelectCard(card)}>
            <Card key={card.id} card={card} />
          </div>
        ))
      ) : (
        <p>Your collection is empty</p>
      )}
    </div>
  );
};

export default UserCollection;
