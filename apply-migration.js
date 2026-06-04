#!/usr/bin/env node

/**
 * Apply Supabase database migration
 * This script executes the SQL migration directly via Supabase's pgAdmin interface
 */

const fs = require('fs');
const https = require('https');

const SUPABASE_URL = 'https://ecksfrhzvfzmfdhhnses.supabase.co';
const SERVICE_ROLE_KEY = 'seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVja3Nmcmh6dmZ6bWZkaGhuc2VzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg5MDQ3NCwiZXhwIjoyMDk1NDY2NDc0fQ.8ocVluF67uFQrIZIP4MU1UyPVXxR1d4oKT4Z7os3OKQ';

// Read the migration SQL
const migrationSQL = fs.readFileSync('./database/02-add-missing-fields.sql', 'utf8');

console.log('🚀 Applying Supabase database migration...\n');
console.log('📝 Migration SQL:');
console.log('----------------------------------------');
console.log(migrationSQL.split('\n').slice(0, 20).join('\n'));
console.log('... (truncated)\n');

// Since we can't directly execute SQL via REST API, we need to use the SQL editor
// This script shows the commands to run

console.log('⚠️  MANUAL STEP REQUIRED\n');
console.log('Unfortunately, Supabase SQL execution requires the web UI for authentication.');
console.log('Please follow these steps:\n');

console.log('1. Open: https://supabase.com/dashboard/project/ecksfrhzvfzmfdhhnses/sql/1');
console.log('2. Click "New Query" button');
console.log('3. Copy and paste the SQL below:');
console.log('----------------------------------------');
console.log(migrationSQL);
console.log('----------------------------------------');
console.log('4. Click "Run" button (blue button on right)');
console.log('5. Wait for "Success" message\n');

console.log('After migration is applied:');
console.log('- npm run build');
console.log('- npm run start');
console.log('- Test daily login rewards\n');

console.log('Need help? See: SUPABASE_MIGRATION_GUIDE.md\n');
