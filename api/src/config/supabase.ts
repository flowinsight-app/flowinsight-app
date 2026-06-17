import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load .env FIRST
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  console.error("SUPABASE_URL:", supabaseUrl ? "✅ Found" : "❌ Missing");
  console.error("SUPABASE_ANON_KEY:", supabaseAnonKey ? "✅ Found" : "❌ Missing");
  throw new Error("Missing Supabase credentials in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);