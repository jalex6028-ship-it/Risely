#!/usr/bin/env node

/**
 * Apply migration by connecting directly to PostgreSQL
 * This attempts to connect using the Supabase URL and service role key
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🚀 Risely Direct PostgreSQL Migration');
console.log('=====================================\n');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

// Extract project ID from Supabase URL
// Format: https://ecksfrhzvfzmfdhhnses.supabase.co
const projectId = SUPABASE_URL.split('//')[1].split('.')[0];
const dbHost = `${projectId}.db.supabase.co`;
const dbName = 'postgres';
const dbUser = 'postgres';

console.log(`📍 Database Host: ${dbHost}`);
console.log(`📍 Database Name: ${dbName}`);
console.log(`📍 Database User: ${dbUser}\n`);

// Read migration SQL
const migrationPath = path.join(__dirname, 'MIGRATION_SQL_ONLY.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

// Try connecting with pg library if available
try {
  const { Client } = require('pg');

  console.log('📦 Using pg library to connect...\n');

  // Try with the service role key as password
  const client = new Client({
    host: dbHost,
    database: dbName,
    user: dbUser,
    password: SERVICE_ROLE_KEY, // Try using JWT as password (will likely fail)
    port: 5432,
    ssl: { rejectUnauthorized: false }
  });

  client.connect()
    .then(async () => {
      console.log('✅ Connected to database!\n');
      console.log('📝 Executing migration SQL...\n');

      try {
        const result = await client.query(migrationSQL);
        console.log('✅ Migration executed successfully!');
        console.log(`Result: ${result.command}\n`);
        await client.end();
        process.exit(0);
      } catch (err) {
        console.error('❌ Error executing migration:', err.message);
        await client.end();
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('❌ Connection failed:', err.message);
      console.log('\n⚠️  Note: Direct PostgreSQL connection requires database password');
      console.log('📖 The service role key is a JWT token, not a password\n');
      console.log('✅ SOLUTION: Use Supabase dashboard at:');
      console.log(`📍 https://supabase.com/dashboard/project/${projectId}/sql\n`);
      console.log('Steps:');
      console.log('1. Click "New Query" button');
      console.log('2. Copy and paste the SQL from: MIGRATION_SQL_ONLY.sql');
      console.log('3. Click "Run" button');
      process.exit(1);
    });

} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.log('⚠️  pg library not available\n');
    console.log('✅ SOLUTION: Use Supabase dashboard at:');
    console.log(`📍 https://supabase.com/dashboard/project/${projectId}/sql\n`);
    console.log('Steps:');
    console.log('1. Click "New Query" button');
    console.log('2. Copy and paste the SQL from: MIGRATION_SQL_ONLY.sql');
    console.log('3. Click "Run" button');
    process.exit(1);
  }
  throw err;
}
