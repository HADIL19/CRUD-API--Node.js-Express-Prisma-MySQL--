import express from "express";
import cors from "cors"; // Import CORS middleware
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    // Check if new email already exists on another user
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== parseInt(id)) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
