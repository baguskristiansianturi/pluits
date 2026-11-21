-- First migration for the independent PLUITS database.
-- Deliberately creates only a namespace. Domain tables must follow approved
-- account, privacy, security and module contracts; never infer them here.
CREATE SCHEMA IF NOT EXISTS pluits;
