import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  res.send("pong");
});

// add your endpoints below this line
// Enhanced endpoint to handle card data more efficiently
app.get("/cards-range", async (req, res) => {
  const ids = Array.from({ length: 50 }, (_, i) => `base1-${i + 1}`);
  try {
    const cards = await prisma.card.findMany({
      where: { id: { in: ids } },
      include: {
        collections: true, // Include collections to fetch ownership details
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
});

// Endpoint to verify or create a new user
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });

    res.json(newUser);
  }
});

// Endpoint to fetch user data by auth0Id
app.get("/verify-user/:auth0Id", async (req, res) => {
  const { auth0Id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Failed to retrieve user:", error);
    res.status(500).send("Error fetching user");
  }
});

// Endpoint to update user data
app.put("/verify-user/:auth0Id", requireAuth, async (req, res) => {
  const { auth0Id } = req.params;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  try {
    const updatedUser = await prisma.user.update({
      where: { auth0Id },
      data: {
        name,
        email,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    if (error.code === "P2025") {
      res.status(404).send("User not found");
    } else {
      res.status(500).send("Error updating user");
    }
  }
});

// Endpoint to delete a user by auth0Id
app.delete("/verify-user/:auth0Id", requireAuth, async (req, res) => {
  const { auth0Id } = req.params;
  try {
    await prisma.user.delete({
      where: { auth0Id },
    });
    res.send("User deleted successfully");
  } catch (error) {
    console.error("Failed to delete user:", error);
    if (error.code === "P2025") {
      res.status(404).send("User not found");
    } else {
      res.status(500).send("Error deleting user");
    }
  }
});

// Endpoint to fetch all cards, potentially with filters for advanced queries
app.get("/cards", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).send("Failed to fetch cards");
  }
});

// Endpoint to fetch cards for a specific user including quantities
app.get("/user-cards/:userId", async (req, res) => {
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
});

// Endpoint to add a card to a user's collection
app.post("/user-cards/:userId/add", requireAuth, async (req, res) => {
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
});

// Endpoint to update card quantity in a collection
app.put("/user-cards/:userId/update", requireAuth, async (req, res) => {
  const { userId } = req.params;
  const { cardId, quantity } = req.body;
  try {
    const result = await prisma.collection.updateMany({
      where: { userId: parseInt(userId), cardId },
      data: { quantity },
    });
    res.json(result);
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).send("Could not update collection");
  }
});

// Endpoint to remove a card from a collection
app.delete("/user-cards/:userId/remove", requireAuth, async (req, res) => {
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
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
