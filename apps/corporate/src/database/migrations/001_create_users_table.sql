/*
================================================================================
FLOW INSIGHT - USERS TABLE SCHEMA
================================================================================
Purpose: Core authentication and user identity table for Flow Insight platform
Scope: Single source of truth for all user accounts across modules
Created: June 17, 2026
Version: 1.0
================================================================================
*/

-- Drop existing table (if any) to ensure clean state
DROP TABLE IF EXISTS users CASCADE;

-- Main Users Table
-- Stores core authentication credentials and user identity information
-- Single record per unique flowinsight_id (username@flowinsight.app)
CREATE TABLE users (
  -- Primary Key: Universally Unique Identifier
  -- Auto-generated UUID for internal record identification
  -- Immutable throughout user's lifetime
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- flowinsight_id: Unique User Identifier (Business Key)
  -- Format: username@flowinsight.app
  -- Constraint: UNIQUE - No two users can have same flowinsight_id
  -- Used for: Login, public references, user mentions
  -- Note: This is the ONLY unique identifier (email/phone can be duplicated)
  flowinsight_id TEXT UNIQUE NOT NULL,

  -- full_name: User's Complete Legal Name
  -- Constraint: NOT NULL - Required for identification
  -- Usage: Display in UI, audit logs, communications
  -- Format: "First Name Last Name" or "Single Name"
  full_name TEXT NOT NULL,

  -- email_id: User's Email Address
  -- Constraint: NOT NULL - Required for notifications and password reset
  -- Note: NOT UNIQUE - Same email can be used by multiple accounts
  -- Rationale: Users may have multiple accounts (e.g., personal + work)
  -- Usage: Email notifications, password reset links, communication
  email_id TEXT NOT NULL,

  -- mobile_number: User's Phone Number
  -- Constraint: NOT NULL - Required for SMS notifications
  -- Note: NOT UNIQUE - Same phone can be used by multiple accounts
  -- Format: 10-13 digits (supports Indian and international formats)
  -- Usage: SMS notifications, 2FA (future), WhatsApp integration (future)
  mobile_number TEXT NOT NULL,

  -- password_hash: Encrypted Password Using bcrypt
  -- Constraint: NOT NULL - Required for authentication
  -- Algorithm: bcrypt with 10 rounds (secure, slow)
  -- Never store plaintext password
  -- Format: $2b$10$... (bcrypt hash format)
  -- IMPORTANT: Never log or expose this field
  password_hash TEXT NOT NULL,

  -- email_verification_status: Email Confirmation Flag
  -- Default: false (unverified)
  -- Values: true (verified) | false (unverified)
  -- Usage: Determine if user can receive critical emails
  -- Future: Implement email verification workflow
  email_verification_status BOOLEAN DEFAULT false,

  -- mobile_verification_status: Mobile Number Confirmation Flag
  -- Default: false (unverified)
  -- Values: true (verified) | false (unverified)
  -- Usage: Determine if user can receive SMS notifications
  -- Future: Implement OTP verification workflow
  mobile_verification_status BOOLEAN DEFAULT false,

  -- user_status: Current Account Status
  -- Default: 'active'
  -- Values: 
  --   'active'     - Normal, fully functional account
  --   'inactive'   - User deactivated, can reactivate
  --   'suspended'  - Admin suspended, user cannot login
  -- Constraint: CHECK - Only allowed values accepted
  -- Usage: Authentication, access control, account management
  user_status TEXT DEFAULT 'active' CHECK (user_status IN ('active', 'inactive', 'suspended')),

  -- created_at: Account Creation Timestamp
  -- Default: CURRENT_TIMESTAMP (server time when record inserted)
  -- Format: ISO 8601 (YYYY-MM-DD HH:MM:SS.ms+TZ)
  -- Immutable: Set once, never updated
  -- Usage: Audit trails, user lifetime analysis, compliance
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- updated_at: Last Modification Timestamp
  -- Default: CURRENT_TIMESTAMP (updated on every change)
  -- Format: ISO 8601 (YYYY-MM-DD HH:MM:SS.ms+TZ)
  -- Updated: Automatically on INSERT/UPDATE via trigger (future)
  -- Usage: Track when user profile last changed, audit logging
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES: Optimize Query Performance
-- ============================================================================

-- Index: flowinsight_id (Login Primary Key)
-- Purpose: Fastest user lookup by username during authentication
-- Cardinality: UNIQUE (one user per flowinsight_id)
-- Query: WHERE flowinsight_id = 'username@flowinsight.app'
CREATE UNIQUE INDEX idx_users_flowinsight_id ON users(flowinsight_id);

-- Index: email_id (Email-Based Lookups)
-- Purpose: Find users by email for password reset, notifications
-- Cardinality: Non-unique (multiple accounts can share email)
-- Query: WHERE email_id = 'user@example.com'
CREATE INDEX idx_users_email_id ON users(email_id);

-- Index: mobile_number (Phone-Based Lookups)
-- Purpose: Find users by phone for SMS delivery, 2FA (future)
-- Cardinality: Non-unique (multiple accounts can share phone)
-- Query: WHERE mobile_number = '+919876543210'
CREATE INDEX idx_users_mobile_number ON users(mobile_number);

-- Index: user_status (Status Filtering)
-- Purpose: Query all active users, find suspended accounts
-- Common: WHERE user_status = 'active'
-- Usage: Admin dashboards, access control checks
CREATE INDEX idx_users_user_status ON users(user_status);

-- Index: created_at (Temporal Queries)
-- Purpose: Find users by registration date, newest users first
-- Cardinality: Non-unique (multiple users per day)
-- Query: ORDER BY created_at DESC LIMIT 10
-- Usage: User analytics, activity reports, compliance
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ============================================================================
-- TABLE METADATA
-- ============================================================================

-- Documentation: Describes table purpose for future developers
COMMENT ON TABLE users IS 
'Core authentication and user identity table for Flow Insight platform.
Single source of truth for all user accounts across all modules (Spirit Flow, Staff Flow, etc.).
Stores credentials, contact info, and account status.
No foreign key dependencies to support independent user creation.';

-- Column Documentation
COMMENT ON COLUMN users.id IS 
'Universally Unique Identifier (UUID). Auto-generated primary key. Immutable.';

COMMENT ON COLUMN users.flowinsight_id IS 
'Unique username identifier. Format: username@flowinsight.app. Used for login and public references.';

COMMENT ON COLUMN users.full_name IS 
'User complete legal name. Required for identification and display in UI.';

COMMENT ON COLUMN users.email_id IS 
'Email address. NOT UNIQUE (multiple accounts allowed). Used for notifications and password reset.';

COMMENT ON COLUMN users.mobile_number IS 
'Phone number (10-13 digits). NOT UNIQUE (multiple accounts allowed). Used for SMS and future 2FA.';

COMMENT ON COLUMN users.password_hash IS 
'Bcrypt hashed password. Never store plaintext. Never expose in logs or API responses.';

COMMENT ON COLUMN users.email_verification_status IS 
'Has user verified their email? false=unverified, true=verified. Future: Implement email confirmation.';

COMMENT ON COLUMN users.mobile_verification_status IS 
'Has user verified their phone? false=unverified, true=verified. Future: Implement OTP verification.';

COMMENT ON COLUMN users.user_status IS 
'Account status. active=normal, inactive=user deactivated, suspended=admin action.';

COMMENT ON COLUMN users.created_at IS 
'Account creation timestamp. Set once, never updated. UTC timezone.';

COMMENT ON COLUMN users.updated_at IS 
'Last profile modification timestamp. Updated on every change. UTC timezone.';

-- ============================================================================
-- FUTURE ENHANCEMENTS (Phase 2+)
-- ============================================================================
/*
1. Row-Level Security (RLS)
   - Implement after multi-tenancy requirements finalized
   - Prevent unauthorized cross-user data access
   - SQL: ALTER TABLE users ENABLE ROW LEVEL SECURITY;

2. Audit Logging Trigger
   - Auto-update 'updated_at' on every change
   - Track who modified what, when
   - Separate audit_logs table with full history

3. Additional Tables (Phase 2)
   - personal_profiles: Extended user info (gender, DOB, address, etc.)
   - password_reset_tokens: Temporary tokens for password reset
   - email_verification_tokens: Temporary tokens for email verification
   - user_sessions: Track active sessions, device info, IP addresses
   - audit_logs: Complete audit trail of all user actions

4. Authentication Enhancements
   - Multi-factor authentication (2FA via SMS/Email/TOTP)
   - OAuth integration (Google, GitHub, Apple login)
   - Social login providers
   - Device fingerprinting and suspicious login detection

5. Performance Optimization
   - Materialized views for user analytics
   - Denormalization for frequently accessed data
   - Read replicas for reporting
   - Caching layer (Redis) for session data
*/

-- ============================================================================
-- SCHEMA VERSION HISTORY
-- ============================================================================
/*
Version 1.0 (June 17, 2026) - Initial Release
- Created core users table
- Unique constraint on flowinsight_id
- Indexes for common queries
- Email and phone support for multiple accounts
- Status tracking: active/inactive/suspended
- Created_at and updated_at timestamps
*/

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================