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
// Fetch multiple cards by a range of IDs
// Fetch multiple cards by a range of IDs and store them in the database
app.get("/cards-range", async (req, res) => {
  const ids = Array.from({ length: 50 }, (_, i) => `base1-${i + 1}`);
  try {
    // First, try to fetch all the requested cards from the database
    let cards = await prisma.card.findMany({
      where: { id: { in: ids } },
    });

    // Determine which card IDs are missing in the database
    const fetchedIds = cards.map((card) => card.id);
    const missingIds = ids.filter((id) => !fetchedIds.includes(id));

    // Only fetch missing cards from the external API
    for (let id of missingIds) {
      const url = `https://api.pokemontcg.io/v2/cards/${id}`;
      const response = await axios.get(url, {
        headers: { "X-Api-Key": process.env.POKEMON_TCG_API_KEY },
      });
      const cardData = response.data.data;

      if (cardData) {
        const priceDefaults = {
          low: 0,
          mid: 0,
          high: 0,
          market: 0,
        };
        const prices = cardData.tcgplayer?.prices?.holofoil || priceDefaults;

        const newCard = await prisma.card.create({
          data: {
            id: cardData.id,
            name: cardData.name,
            hp: cardData.hp || "N/A",
            types: cardData.types.join(", "),
            imageUrl: cardData.images.small,
            lowPrice: prices.low,
            midPrice: prices.mid,
            highPrice: prices.high,
            marketPrice: prices.market,
          },
        });
        cards.push(newCard); // Add the newly fetched card to the list of cards
      }
    }

    res.json(cards); // Return all cards, both cached and newly fetched
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).send("Error fetching cards");
  }
});

// this endpoint is used by the client to verify the user status and to make sure the user is registered in our database once they signup with Auth0
// if not registered in our database we will create it.
// if the user is already registered we will return the user information
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

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
