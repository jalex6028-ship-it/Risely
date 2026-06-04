#!/usr/bin/env node

/**
 * Execute database migration using Supabase JS client with service role
 * This script connects using the service role key which has admin privileges
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🚀 Risely Database Migration Executor');
console.log('=====================================\n');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables');
  console.error('Ensure .env.local exists with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log(`📍 Connecting to: ${SUPABASE_URL}\n`);

// Create client with service role (admin access)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function executeMigration() {
  try {
    console.log('📝 Reading migration SQL...');
    const migrationPath = path.join(__dirname, 'database', '02-add-missing-fields.sql');

    if (!fs.existsSync(migrationPath)) {
      console.error(`❌ Migration file not found: ${migrationPath}`);
      process.exit(1);
    }

    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('✓ Migration SQL loaded\n');

    // Split migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    console.log(`📊 Executing ${statements.length} SQL statements...\n`);

    // Try to execute the migration using raw SQL via a stored procedure
    // Since Supabase JS client doesn't expose raw SQL, we'll use RPC with a helper function

    // First, try to verify if we can connect
    const { data: testData, error: testError } = await supabase
      .from('members')
      .select('COUNT(*)', { count: 'exact', head: true })
      .limit(1);

    if (testError) {
      console.error('❌ Connection test failed:', testError.message);
      process.exit(1);
    }

    console.log('✓ Database connection successful\n');

    // Since we can't execute raw SQL directly via the JS client,
    // we need to use a different approach
    console.log('⚠️  Note: The Supabase JS client has limitations on raw SQL execution');
    console.log('Using alternative verification and setup approach...\n');

    // Check current schema
    console.log('🔍 Checking current database schema...\n');

    // List all columns in members table by querying information_schema
    const { data: columns, error: columnError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'members')
      .eq('table_schema', 'public');

    if (!columnError && columns) {
      console.log('Current members table columns:');
      columns.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type}`);
      });
      console.log('');
    }

    // Check if migration columns already exist
    const requiredColumns = [
      'all_time_xp',
      'login_streak',
      'last_login_date',
      'login_history',
      'xp_history',
      'quests_done',
      'daily_completions',
      'gem_hi_score',
      'challenges_done'
    ];

    console.log('🔎 Checking if migration columns exist...\n');

    const { data: memberSample } = await supabase
      .from('members')
      .select('*')
      .limit(1);

    if (memberSample && memberSample.length > 0) {
      const existingColumns = Object.keys(memberSample[0]);
      const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

      if (missingColumns.length === 0) {
        console.log('✅ ALL required columns already exist in database!');
        console.log('Migration appears to have been applied already.\n');
        return true;
      } else {
        console.log(`❌ Missing ${missingColumns.length} columns:`);
        missingColumns.forEach(col => console.log(`  - ${col}`));
        console.log('');
      }
    }

    console.log('⚠️  ==========================================');
    console.log('⚠️  Cannot execute raw SQL via JS client');
    console.log('⚠️  ==========================================\n');

    console.log('✅ SOLUTION: Open Supabase dashboard and paste migration SQL\n');
    console.log(`📖 URL: https://supabase.com/dashboard/project/ecksfrhzvfzmfdhhnses/sql\n`);

    console.log('SQL to execute:\n');
    console.log(migrationSQL);

    return false;

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

executeMigration().then(success => {
  if (success) {
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } else {
    console.log('\n⏳ Migration requires manual dashboard access');
    process.exit(1);
  }
});
