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