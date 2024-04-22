import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const verifyUser = async (req, res) => {
  try {
    // Extract Auth0 ID, email, and name from the request's auth payload
    const auth0Id = req.params.auth0Id;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

    // Attempt to find the user in the database
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    // If user exists, return the user data; otherwise, create a new user
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const auth0Id = req.params.auth0Id;
    const { email, name, newUsername } = req.body;

    // Update the user details in the database
    const user = await prisma.user.update({
      where: { auth0Id },
      data: {
        email,
        name,
        username: newUsername,
      },
    });

    // Return the updated user information
    res.json(user);
  } catch (error) {
    // Handle any errors that occur during the update process
    if (error.code === "P2025") {
      // Prisma's error code for record not found
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
