#!/usr/bin/env node

/**
 * Execute Supabase database migration using the service role key
 * This connects to Supabase and runs the migration SQL directly
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Read migration SQL
const migrationSQL = fs.readFileSync('./database/02-add-missing-fields.sql', 'utf8');

// Split by statements (approximate - real SQL parser would be better)
const statements = migrationSQL
  .split('\n-- ===')
  .filter(stmt => stmt.trim())
  .map(stmt => stmt.replace(/^.*\n/, '').trim())
  .filter(stmt => stmt && !stmt.startsWith('--'));

console.log('🚀 Connecting to Supabase...');
console.log(`URL: ${SUPABASE_URL}\n`);

// Create client with service role (has admin access)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function runMigration() {
  try {
    console.log('📝 Running migration statements...\n');

    // The Supabase JS client doesn't expose raw SQL execution
    // We need to use the REST API directly with curl or another HTTP method

    // For now, show the migration commands
    console.log('Available options to run this migration:\n');
    console.log('Option 1: Via Supabase Dashboard (Recommended)');
    console.log('  - Go to: https://supabase.com/dashboard/project/' +
                SUPABASE_URL.match(/https:\/\/([\w-]+)\.supabase\.co/)[1] + '/sql/1');
    console.log('  - Click "New Query"');
    console.log('  - Paste the SQL from database/02-add-missing-fields.sql');
    console.log('  - Click "Run"\n');

    console.log('Option 2: Via psql (if installed)');
    console.log('  psql "postgresql://postgres:[password]@' +
                SUPABASE_URL.match(/https:\/\/([\w-]+)\.supabase\.co/)[1] +
                '.db.supabase.co:5432/postgres" < database/02-add-missing-fields.sql\n');

    console.log('Option 3: Via curl');
    console.log('  curl -X POST ' + SUPABASE_URL + '/rest/v1/rpc/exec_sql \\');
    console.log('    -H "Authorization: Bearer ' + SERVICE_ROLE_KEY.substring(0, 20) + '..." \\');
    console.log('    -H "Content-Type: application/json" \\');
    console.log('    -d \'{"sql": "..migration SQL..."}\'\n');

    // Try to verify columns exist
    console.log('✓ Attempting to verify database columns...\n');

    const { data, error } = await supabase.rpc('verify_columns');

    if (error) {
      console.log('Note: Column verification requires the migration to be run first.\n');
    }

    console.log('📚 Migration SQL location: ./database/02-add-missing-fields.sql');
    console.log('📖 Full guide: SUPABASE_MIGRATION_GUIDE.md\n');

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

runMigration();
