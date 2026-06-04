# Supabase Setup - Real-Time Multi-User Sync & Role-Based Admin

## 🚀 Quick Setup (5 minutes)

### **1. Run the Database Schema**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy-paste all SQL from `DATABASE_SETUP.sql`
5. Click **Run**

This creates:
- ✅ `user_roles` table (admin, moderator, member)
- ✅ Updated `members` with auth links
- ✅ All content tables (quests, challenges, etc.) with RLS
- ✅ Admin function to set first admin

### **2. Make Your First Admin User**

In Supabase SQL Editor, run:
```sql
SELECT make_admin('your-email@example.com');
```

Replace with your actual email. This user can now:
- Access admin panel (no PIN needed!)
- Create/edit quests, challenges, tasks, events, rewards
- All changes sync instantly to everyone

### **3. Enable Real-Time in Supabase**

1. Go to **Replication** settings
2. Enable real-time for these tables:
   - `quests`
   - `challenges`
   - `daily_tasks`
   - `events`
   - `rewards`
   - `polls`
   - `members`

This allows instant sync across all users.

---

## 🔐 How It Works Now

### **Before (PIN-based):**
```
User types PIN → Unlocks admin panel → Changes saved locally → Only they see updates
```

### **After (Role-based):**
```
Supabase Auth User (Admin Role) → Admin Panel Unlocked → Changes saved to DB → 
→ Real-time subscriptions → Everyone sees updates instantly ✨
```

---

## 👥 User Roles

### **Member** (Default)
- Can play the game
- Earn XP, complete quests
- See leaderboard
- Cannot access admin panel

### **Moderator**
- Can create/edit quests, challenges, tasks, events
- Cannot manage users or system settings
- Great for content managers

### **Admin**
- Full access to everything
- Manage users and permissions
- Create/edit all content
- View analytics

---

## 🔄 Real-Time Updates - How It Works

When admin creates a quest:

```
1. Admin submits form
   ↓
2. Data saved to Supabase database
   ↓
3. Real-time subscription triggers on all clients
   ↓
4. All players see the new quest instantly (no refresh needed!)
```

### **Technologies Used:**
- **Supabase Auth**: User authentication & sessions
- **Supabase Realtime**: PostgreSQL subscriptions for live updates
- **RLS Policies**: Row-level security for access control

---

## 🛠️ Managing Users

### **Promote User to Admin:**
```sql
SELECT make_admin('user@example.com');
```

### **Demote User to Moderator:**
```sql
UPDATE user_roles 
SET role = 'moderator' 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'user@example.com');
```

### **Demote User to Member:**
```sql
UPDATE user_roles 
SET role = 'member' 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'user@example.com');
```

---

## 📋 Admin Panel - Now Role-Based

### **Before:**
- Anyone with PIN "1234" could access
- Changes only saved locally

### **After:**
- Only users with `admin` or `moderator` role can access
- Changes saved to database
- All other users see updates in real-time
- No PIN needed - uses Supabase Auth

### **Access Requirements:**
```javascript
// Only users with admin/moderator role can:
- Create quests
- Edit challenges
- Add daily tasks
- Create events
- Manage shop
- Create polls

// Admins additionally can:
- Manage user roles
- View analytics
- System settings
```

---

## 🎮 Player Experience

### **What Players See:**

1. **Login Page** (on first visit)
   - Sign up with email/password
   - Or sign in if already have account

2. **Game** (after login)
   - Personalized to their account
   - Real-time leaderboard updates
   - Instant content updates when admins add stuff
   - Progress saved to database

3. **Profile** (coming soon)
   - View their XP history
   - Earned badges
   - Achievement stats

---

## 🔑 Authentication Flow

### **Sign Up:**
```
1. User enters email & password
2. Supabase Auth creates account
3. Member profile created automatically
4. Default role: "member"
5. Can login anytime
```

### **Login:**
```
1. User enters email & password
2. Supabase validates
3. User can access app
4. Role-based features unlock
```

### **Admin Check:**
```
1. User logs in
2. App checks user's role in database
3. If role = admin → Admin panel visible
4. If role = member → Admin panel hidden
```

---

## ⚡ Performance Tips

1. **Real-time Subscriptions:**
   - Only subscribe to tables you need
   - Use filters to reduce bandwidth
   - Automatically cleans up on unmount

2. **Caching:**
   - App loads data from Supabase
   - Real-time updates push changes
   - No manual refresh needed

3. **Scaling:**
   - Supabase handles 1000+ concurrent users
   - Database can store unlimited content
   - Real-time is fast (< 100ms latency)

---

## 🚨 Important Security Notes

1. **RLS Policies**: Only admins can create/edit content
2. **Auth Required**: Users must authenticate to access
3. **Email Verification**: (Optional) Enable in Supabase settings
4. **Passwords**: Use strong passwords, Supabase hashes them

---

## 📊 Monitoring

Monitor your app in Supabase Dashboard:
- **Auth Logs**: See login/signup activity
- **Database Logs**: See all API calls
- **Realtime Logs**: See subscription activity
- **Storage Logs**: If using file uploads

---

## 🆘 Troubleshooting

### **"Admin panel not showing"**
- Check user's role in `user_roles` table
- Make sure user is authenticated
- Clear browser cache

### **"Changes not syncing"**
- Verify Realtime is enabled in Supabase
- Check RLS policies are correct
- Look at browser console for errors

### **"Can't create quest"**
- Check user has `admin` or `moderator` role
- Verify RLS policies allow the action
- Check Supabase quota

### **"Slow updates"**
- Check internet connection
- Verify Supabase region is closest to you
- Too many subscriptions? Reduce them

---

## 🎉 You're All Set!

Your app now has:
✅ Real-time multi-user sync  
✅ Role-based admin access  
✅ Secure authentication  
✅ Instant content updates  
✅ Scalable infrastructure  

**Next Steps:**
1. Run the SQL schema
2. Make yourself admin
3. Enable real-time
4. Test creating a quest
5. Watch it sync to everyone instantly!
