-- Migration: 001_create_users_table.sql
-- Description: Create core users table for authentication and login
-- Date: 2026-06-16
-- Status: Initial setup - WITHOUT RLS

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flowinsight_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email_id TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  email_verification_status BOOLEAN DEFAULT false,
  mobile_verification_status BOOLEAN DEFAULT false,
  user_status TEXT DEFAULT 'active' CHECK (user_status IN ('active', 'inactive', 'suspended')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by UUID NOT NULL,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (last_updated_by) REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX idx_users_flowinsight_id ON users(flowinsight_id);
CREATE INDEX idx_users_email_id ON users(email_id);
CREATE INDEX idx_users_mobile_number ON users(mobile_number);
CREATE INDEX idx_users_user_status ON users(user_status);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Add comment for documentation
COMMENT ON TABLE users IS 'Core users table for authentication. Universal across all modules.';
COMMENT ON COLUMN users.flowinsight_id IS 'Unique identifier - format: username@flowinsight.app';
COMMENT ON COLUMN users.created_by IS 'User ID who created this account (self for signup, admin for corporate)';