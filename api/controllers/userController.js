import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const verifyUser = async (req, res) => {
  try {
    console.log("Auth Payload:", req.auth.payload);

    // Extract Auth0 ID, email, and name from the request's auth payload
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

    console.log(req.auth.payload); // Add this line to debug payload content
    if (!email || !name) {
      return res
        .status(400)
        .json({ error: "Missing email or name in payload" });
    }

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
    console.error("Error in verifyUser function:", error);
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
    const auth0Id = req.params.id;
    const { email, name } = req.body;

    // Update the user details in the database
    const user = await prisma.user.update({
      where: { auth0Id },
      data: {
        email,
        name,
      },
    });

    // Return the updated user information
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
