import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

// Function to fetch cards for a specific user including quantities
export async function getUserCards(req, res) {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        userId: parseInt(req.params.userId),
      },
      include: {
        card: true,
      },
    });
    const cardsWithQuantities = collections.map((c) => ({
      ...c.card,
      quantity: c.quantity,
    }));
    res.json(cardsWithQuantities);
  } catch (error) {
    console.error("Error fetching user's collection:", error);
    res.status(500).send("Failed to fetch user's collection");
  }
}

// Function to add a card to a user's collection
export async function addUserCard(req, res) {
  const { userId } = req.params;
  const { cardId, quantity = 1 } = req.body; // Default quantity to 1 if not provided
  try {
    const entry = await prisma.collection.create({
      data: { userId: parseInt(userId), cardId, quantity },
    });
    res.json(entry);
  } catch (error) {
    console.error("Error adding card to collection:", error);
    res.status(500).send("Could not add card to collection");
  }
}

// Function to remove a card from a user's collection
export async function removeUserCard(req, res) {
  const { userId } = req.params;
  const { cardId } = req.body;
  try {
    await prisma.collection.deleteMany({
      where: { userId: parseInt(userId), cardId },
    });
    res.send("Card removed from collection");
  } catch (error) {
    console.error("Error removing card:", error);
    res.status(500).send("Could not remove card");
  }
}
