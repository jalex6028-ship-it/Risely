# 🚀 FINAL STEPS TO GET RISELY WORKING

All code fixes are complete. Only database migration remains. Follow these 3 simple steps.

---

## STEP 1: Apply Database Migration (5 minutes)

### Open Supabase Dashboard
Go to: https://supabase.com/dashboard/project/ecksfrhzvfzmfdhhnses/sql

### Create New Query
1. Click the **"New Query"** button (top left of SQL editor)
2. A new blank SQL tab will appear

### Copy Migration SQL
Open this file: `C:\risely-app\MIGRATION_SQL_ONLY.sql`

Copy **ALL** of its contents (it's about 35 lines of SQL)

### Paste into Supabase
Paste the SQL into the blank query editor in Supabase

### Execute
Click the blue **"Run"** button on the right side of the SQL editor

### Verify Success
You should see a green ✅ "Success" message at the bottom

---

## STEP 2: Build the App (2 minutes)

Open terminal/command prompt and run:

```bash
cd C:\risely-app
npm run build
```

This will compile all the code fixes. Should complete in 1-2 minutes.

---

## STEP 3: Start and Test (5 minutes)

Keep the terminal open from Step 2, then run:

```bash
npm run start
```

The app will start. Open: http://localhost:3000

### Sign Up Test
1. Click "Sign Up"
2. Enter email and password
3. Complete signup

### Test Daily Reward Claim
1. Click "Claim Daily Reward" button
2. You should see:
   - ✅ XP counter increases
   - ✅ Diamond counter increases
   - ✅ Reward button changes to "Claimed"
3. **REFRESH THE PAGE** (Ctrl+R or Cmd+R)
4. Verify:
   - ✅ XP is still there
   - ✅ Diamonds are still there
   - ✅ Button still shows "Claimed"

### Complete End-to-End Test

Test each feature to confirm all work:

**Daily Login Reward**
- [ ] Claim reward → XP/diamonds increase
- [ ] Refresh page → Values persist
- [ ] Next day → Reward available again

**Quests**
- [ ] Complete a quest → XP awarded
- [ ] Refresh page → XP persists

**GemCrush Game**
- [ ] Play and win → XP awarded
- [ ] Refresh page → XP persists

**Leaderboard**
- [ ] Check leaderboard → Your XP shows correctly
- [ ] Check rank → Calculates correctly

**Feed Posts**
- [ ] Create post → Shows in feed
- [ ] Refresh page → Post still there

---

## What Was Fixed (Technical Summary)

All code has been corrected:

✅ lib/useAuth.js - Fixed auth_id field references
✅ lib/fieldConversion.js - Created snake_case ↔ camelCase converter
✅ app/page.jsx - Fixed 11+ critical bugs:
   - Member lookup using correct ID field
   - XP persistence with correct field names
   - Login streak tracking
   - All reward functions

✅ database/02-add-missing-fields.sql - Migration ready

The only remaining step is applying the migration to Supabase.

---

## If Something Doesn't Work

### Migration SQL fails in Supabase
- Copy/paste the SQL again carefully
- Make sure you're NOT copying the box characters (╔═╗ etc)
- Use file: C:\risely-app\MIGRATION_SQL_ONLY.sql (no decorative text)

### App won't build
- Make sure Node.js 18+ is installed: `node --version`
- Delete node_modules: `rmdir /s node_modules` or `rm -rf node_modules`
- Reinstall: `npm install`
- Try build again: `npm run build`

### Data still doesn't persist after migration
- Verify migration succeeded in Supabase (should show green ✅)
- Restart the app: `npm run start` (fresh start in new terminal)
- Clear browser cache and cookies
- Sign up with a new test account

---

**That's it! You've got this! 🎉**
