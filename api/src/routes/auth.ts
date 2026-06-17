import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";
import Joi from "joi";

const router = express.Router();

// Validation schemas
const signupSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required(),
  username: Joi.string().min(3).max(50).required(),
  email_id: Joi.string().email().required(),
  mobile_number: Joi.string().pattern(/^[0-9]{10,13}$/).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  flowinsight_id: Joi.string().required(),
  password: Joi.string().required(),
});

const checkUsernameSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
});

// POST /api/v1/auth/signup
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const { full_name, username, email_id, mobile_number, password } = value;
    const flowinsight_id = `${username}@flowinsight.app`;

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user into database
    const { data, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          flowinsight_id,
          full_name,
          email_id,
          mobile_number,
          password_hash,
        },
      ])
      .select();

    if (insertError) {
      // Check if it's a unique constraint violation
      if (insertError.message.includes("unique")) {
        return res.status(400).json({
          success: false,
          error: "Username already exists",
        });
      }
      console.error("Insert error:", insertError);
      throw insertError;
    }

    if (!data || data.length === 0) {
      return res.status(500).json({
        success: false,
        error: "Failed to create user",
      });
    }

    const user = data[0];

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        flowinsight_id: user.flowinsight_id,
        email: user.email_id,
      },
      process.env.JWT_SECRET || "your_jwt_secret_key_min_32_characters",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user.id,
        flowinsight_id: user.flowinsight_id,
        full_name: user.full_name,
        email: user.email_id,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// POST /api/v1/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const { flowinsight_id, password } = value;

    // Find user by flowinsight_id
    const { data: users, error: queryError } = await supabase
      .from("users")
      .select("*")
      .eq("flowinsight_id", flowinsight_id)
      .single();

    if (queryError || !users) {
      return res.status(401).json({
        success: false,
        error: "Invalid username or password",
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, users.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid username or password",
      });
    }

    // Check if account is active
    if (users.user_status !== "active") {
      return res.status(403).json({
        success: false,
        error: "Account is not active",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: users.id,
        flowinsight_id: users.flowinsight_id,
        email: users.email_id,
      },
      process.env.JWT_SECRET || "your_jwt_secret_key_min_32_characters",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: users.id,
        flowinsight_id: users.flowinsight_id,
        full_name: users.full_name,
        email: users.email_id,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// GET /api/v1/auth/check-username?username=xxx
router.get("/check-username", async (req: Request, res: Response) => {
  try {
    const { error, value } = checkUsernameSchema.validate(req.query);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const { username } = value;
    const flowinsight_id = `${username}@flowinsight.app`;

    // Check if username exists
    const { data, error: queryError } = await supabase
      .from("users")
      .select("id")
      .eq("flowinsight_id", flowinsight_id)
      .single();

    if (queryError && queryError.code !== "PGRST116") {
      throw queryError;
    }

    const exists = !!data;

    res.json({
      success: true,
      available: !exists,
      flowinsight_id: flowinsight_id,
    });
  } catch (err) {
    console.error("Check username error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;