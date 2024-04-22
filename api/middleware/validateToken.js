import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
dotenv.config();

export const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});
