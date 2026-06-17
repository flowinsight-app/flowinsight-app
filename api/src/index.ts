import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

// Debug: Check if .env loaded
console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "✅ Loaded" : "❌ NOT LOADED");
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "✅ Loaded" : "❌ NOT LOADED");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ NOT LOADED");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Auth Routes
app.use("/api/v1/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth routes: http://localhost:${PORT}/api/v1/auth/signup`);
});