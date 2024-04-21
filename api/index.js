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
app.get("/cards/:id", requireAuth, async (req, res) => {
  const cardId = req.params.id;

  try {
    const { data } = await axios.get(
      `https://api.pokemontcg.io/v2/cards/${cardId}`,
      {
        headers: {
          "X-Api-Key": process.env.POKEMON_TCG_API_KEY,
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from Pokémon TCG API");
  }
});

app.get("/original-pokemon", async (req, res) => {
  const query = encodeURIComponent("nationalPokedexNumbers:[1 TO 151]");
  const orderBy = "nationalPokedexNumbers";

  try {
    const { data } = await axios.get(
      `https://api.pokemontcg.io/v2/cards?q=${query}&orderBy=${orderBy}`,
      {
        headers: {
          "X-Api-Key": process.env.POKEMON_TCG_API_KEY,
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from Pokémon TCG API");
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
