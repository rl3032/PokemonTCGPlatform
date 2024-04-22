import express from "express";
import { requireAuth } from "../middleware/validateToken.js";
import {
  verifyUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { getCardsInRange } from "../controllers/cardController.js";
import {
  getUserCards,
  updateUserCard,
  addUserCard,
  removeUserCard,
} from "../controllers/collectionController.js";

const router = express.Router();

router.get("/user/username", getUser);
router.post("/user/verify", requireAuth, verifyUser);
router.put("/user/:id", requireAuth, updateUser);
router.get("/cards", getCardsInRange);
router.get("/user-cards/:userId", getUserCards);
router.post("/user-cards/:userId/add", requireAuth, addUserCard);
router.put("/user-cards/:userId/update", requireAuth, updateUserCard);
router.delete("/user-cards/:userId/remove", requireAuth, removeUserCard);

export default router;
