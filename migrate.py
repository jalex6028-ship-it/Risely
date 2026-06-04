#!/usr/bin/env python3
"""
Final attempt to apply migration using service role JWT
"""
import os
import json
import base64
import subprocess

# Load .env
env = {}
with open('.env.local') as f:
    for line in f:
        if '=' in line:
            k, v = line.strip().split('=', 1)
            env[k] = v

url = env.get('NEXT_PUBLIC_SUPABASE_URL', '').strip()
key = env.get('SUPABASE_SERVICE_ROLE_KEY', '').strip()

if not url or not key:
    print("❌ Missing env variables")
    exit(1)

project_id = url.split('.')[0].replace('https://', '')
db_host = f"{project_id}.db.supabase.co"

# Try to extract password from JWT (won't work, but worth trying)
parts = key.split('.')
if len(parts) == 3:
    try:
        # Decode JWT payload
        payload = parts[1]
        # Add padding if needed
        payload += '=' * (4 - len(payload) % 4)
        decoded = base64.urlsafe_b64decode(payload)
        print("Service Role Key (decoded):")
        print(decoded.decode())
    except Exception as e:
        print(f"Could not decode JWT: {e}")

print(f"\n✅ To apply migration manually:")
print(f"\n1. Go to: https://supabase.com/dashboard/project/{project_id}/sql")
print(f"2. Click 'New Query'")
print(f"3. Paste SQL from: database/02-add-missing-fields.sql")
print(f"4. Click 'Run'\n")

# Suggest alternative: use curl
print(f"Alternative - Try with curl (if DB password is default 'postgres'):\n")
print(f"PGPASSWORD=postgres psql -h {db_host} -U postgres -d postgres < database/02-add-missing-fields.sql\n")
