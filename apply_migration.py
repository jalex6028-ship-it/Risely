#!/usr/bin/env python3
"""
Apply Supabase database migration using direct PostgreSQL connection
"""

import os
import sys

try:
    import pg8000.native
except ImportError:
    print("❌ pg8000 not available. Installing...")
    os.system("pip install pg8000 --break-system-packages -q")
    import pg8000.native

def load_env():
    """Load environment variables from .env.local"""
    env_file = '.env.local'
    if not os.path.exists(env_file):
        print(f"❌ {env_file} not found")
        sys.exit(1)

    env = {}
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and '=' in line and not line.startswith('#'):
                key, val = line.split('=', 1)
                env[key.strip()] = val.strip()
    return env

def get_connection_string(supabase_url):
    """Convert Supabase URL to PostgreSQL connection string"""
    # Extract project ID from URL: https://[project-id].supabase.co
    project_id = supabase_url.replace('https://', '').replace('.supabase.co', '')

    # Note: We need the database password which is not in .env.local
    # Supabase uses: postgresql://postgres:[password]@[project-id].db.supabase.co:5432/postgres

    return f"postgresql://postgres@{project_id}.db.supabase.co:5432/postgres"

def apply_migration():
    """Apply the database migration"""
    print("🚀 Supabase Database Migration Tool\n")

    env = load_env()
    supabase_url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    service_key = env.get('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not service_key:
        print("❌ Missing Supabase credentials")
        sys.exit(1)

    print(f"📍 Supabase Project: {supabase_url}\n")

    # Read migration SQL
    if not os.path.exists('database/02-add-missing-fields.sql'):
        print("❌ Migration file not found: database/02-add-missing-fields.sql")
        sys.exit(1)

    with open('database/02-add-missing-fields.sql') as f:
        migration_sql = f.read()

    print("📝 Migration SQL Preview:")
    print("----------------------------------------")
    for line in migration_sql.split('\n')[:15]:
        print(line)
    print("... (truncated)\n")

    print("⚠️  ISSUE: Database Password Required\n")
    print("To apply this migration, we need the PostgreSQL password for:")
    print(f"  {get_connection_string(supabase_url)}\n")

    print("📖 Alternative Methods:\n")

    print("Option 1: Via Supabase Dashboard (Recommended)")
    project_id = supabase_url.split('.')[0].replace('https://', '')
    print(f"  1. Go to: https://supabase.com/dashboard/project/{project_id}/sql/1")
    print("  2. Click 'New Query'")
    print("  3. Paste SQL from: database/02-add-missing-fields.sql")
    print("  4. Click 'Run'\n")

    print("Option 2: Via psql Command Line")
    print(f"  psql 'postgresql://postgres:[password]@{project_id}.db.supabase.co:5432/postgres' < database/02-add-missing-fields.sql\n")

    print("Option 3: Via Supabase CLI")
    print("  supabase db push --linked\n")

    print("📚 Full Documentation: SUPABASE_MIGRATION_GUIDE.md")

if __name__ == '__main__':
    apply_migration()
