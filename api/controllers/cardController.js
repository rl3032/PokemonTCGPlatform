import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export async function getCardsInRange(req, res) {
  const ids = Array.from({ length: 50 }, (_, i) => `base1-${i + 1}`);

  try {
    const cards = await prisma.card.findMany({
      where: { id: { in: ids } },
      include: {
        collections: true,
      },
    });

    const missingIds = ids.filter(
      (id) => !cards.some((card) => card.id === id)
    );

    const fetchedCards = await Promise.all(
      missingIds.map(async (id) => {
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards/${id}`,
          {
            headers: { "X-Api-Key": process.env.POKEMON_TCG_API_KEY },
          }
        );
        return response.data.data;
      })
    );

    const newCards = await prisma.$transaction(
      fetchedCards.map((cardData) =>
        prisma.card.create({
          data: {
            id: cardData.id,
            name: cardData.name,
            hp: cardData.hp || "N/A",
            types: cardData.types.join(", "),
            imageUrl: cardData.images.small,
            lowPrice: cardData.tcgplayer?.prices?.holofoil?.low || 0,
            midPrice: cardData.tcgplayer?.prices?.holofoil?.mid || 0,
            highPrice: cardData.tcgplayer?.prices?.holofoil?.high || 0,
            marketPrice: cardData.tcgplayer?.prices?.holofoil?.market || 0,
          },
        })
      )
    );

    res.json([...cards, ...newCards]);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).send("Error fetching cards");
  }
}
