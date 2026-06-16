# Database Schema

## Overview
Database schemas for Flow Insight platform.

## Migrations

### 001_create_users_table.sql
- **Status:** Active
- **Created:** 2026-06-16
- **Description:** Core users table for authentication and login
- **Tables:** users
- **Features:** No RLS (Phase 1)

## How to Run Migrations

1. Go to Supabase Dashboard
2. SQL Editor → New Query
3. Copy content from migration file
4. Run

## Future Migrations
- 002: Add personal_profiles table
- 003: Add audit_logs table
- 004: Add RLS policies (Phase 2)