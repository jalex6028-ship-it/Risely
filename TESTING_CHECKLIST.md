# Daily Reward Persistence - Testing Checklist

## Quick Test (5 minutes)

### Step 1: Claim Daily Login Reward
- [ ] App is running (`npm run dev`)
- [ ] Signed in with your account
- [ ] See "Claim Daily Reward" modal on login
- [ ] Click "Claim" button
- [ ] See notification: "Login reward: +[XP] 💎 (Day X)"
- [ ] See XP increase in top-right corner

### Step 2: Refresh & Verify
- [ ] **Refresh the page** (F5 or Ctrl+R)
- [ ] Wait for data to load (watch for "Loading..." messages to disappear)
- [ ] Check:
  - [ ] Your XP is still increased ✅
  - [ ] Login streak is still updated ✅
  - [ ] Notification is gone (expected) ✅

### Step 3: Complete a Daily Task
- [ ] Go to Home tab
- [ ] Find a daily task (e.g., "Morning Standup", "Stay Hydrated")
- [ ] Click "Done" or checkmark on task
- [ ] See XP increase
- [ ] See notification

### Step 4: Refresh & Verify Task
- [ ] **Refresh the page**
- [ ] Check:
  - [ ] Daily task is marked as done ✅
  - [ ] XP increase is still there ✅

---

## Full Test (15 minutes)

### Activity Checklist
Test all XP-earning activities:

- [ ] **Daily Login Reward**
  - [ ] Claim works
  - [ ] Persists after refresh
  - [ ] Streak increases correctly

- [ ] **Daily Tasks** 
  - [ ] Completing task awards XP
  - [ ] Persists after refresh
  - [ ] Shows as completed

- [ ] **Quests**
  - [ ] (Admin) Mark quest as complete for yourself
  - [ ] XP awarded
  - [ ] Persists after refresh

- [ ] **Events**
  - [ ] RSVP to an event
  - [ ] XP awarded (if applicable)
  - [ ] Persists after refresh

- [ ] **Feed Posts**
  - [ ] Post a message to feed
  - [ ] XP awarded (+5)
  - [ ] Persists after refresh

- [ ] **GemCrush** (if you have the game)
  - [ ] Play and win
  - [ ] XP awarded
  - [ ] Persists after refresh

---

## Multi-User Test (10 minutes)

### Open Two Browsers
1. Open browser window 1 → Sign in as User A
2. Open browser window 2 → Sign in as User B

### Test Real-Time Sync
- [ ] User A completes a quest
- [ ] Check User B's window → quest completion shows up in real-time
- [ ] User B completes a daily task
- [ ] Check User A's window → task completion shows up in real-time

### Test Persistence
- [ ] User A refreshes page
- [ ] User A's data is still intact
- [ ] User B refreshes page
- [ ] User B's data is still intact

---

## Database Verification (Optional)

### Check Supabase Dashboard
1. Go to [Supabase Console](https://app.supabase.com)
2. Select your project
3. Go to "Table Editor"
4. Click "members" table
5. Find your user
6. Check columns:
   - [ ] `total_xp` matches your app XP ✅
   - [ ] `monthly_xp` is updated ✅
   - [ ] `all_time_xp` is tracked ✅
   - [ ] `loginStreak` is correct ✅
   - [ ] `lastLoginDate` is today ✅

---

## Troubleshooting

### If daily login doesn't persist:
1. Check browser console (F12 → Console tab)
2. Look for errors like: `[PERSIST] Supabase update failed`
3. Check that user has `auth_user_id` in database
4. Verify Supabase connection is working

### If XP doesn't appear:
1. Check Supabase is responding (no network errors in console)
2. Make sure you're signed in with a real account (not demo)
3. Check that the activity actually completed (notification appeared)

### If page refresh loses data:
1. This should NOT happen anymore
2. If it does, report exact steps to reproduce
3. Check console for errors

---

## Success Criteria

✅ **PASS** if:
- Daily login reward persists after refresh
- Daily tasks persist after refresh
- XP changes persist after refresh
- No errors in browser console
- Real-time sync works between users
- Database values match app display

❌ **FAIL** if:
- Any activity undoes after refresh
- Errors appear in console
- Supabase updates fail
- Real-time sync doesn't work

---

**Expected Result**: Everything persists! 🎉
