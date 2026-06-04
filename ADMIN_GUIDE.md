# Interact App - Admin Guide

## 🔓 Access Admin Panel

**PIN:** `1234` (change this in code for security)

1. Open http://localhost:3000
2. Click the **⚙️ Gear icon** (bottom right)
3. Enter PIN: **1234**
4. You now have admin access!

---

## 📋 Managing Content

### **Quests Tab**
- **Create Quest:** Fill in title, description, XP reward, icon, and category
- **Delete Quest:** Click the trash icon next to any quest
- **Quests automatically appear** in the "Quests" section for all players
- Players complete them to earn XP and progress

### **Challenges Tab**
- **Create Challenge:** Multi-day challenges (7 days, 30 days, etc.)
- **Examples:** "Complete 5 quests", "Earn 500 XP this week"
- Players get progress tracking for each challenge

### **Daily Tasks Tab**
- **Create Daily Task:** Tasks that reset every day
- **Players earn XP** for completing each daily task
- Different from quests - these refresh daily

### **Events Tab**
- **Create Event:** Set date, time, location, description
- **RSVP Tracking:** Players can RSVP to attend
- Great for team meetings, competitions, celebrations

### **Shop/Rewards Tab**
- **Add Reward:** Items players can buy with diamonds
- **Set cost** in diamonds
- **Set stock** (how many available)
- Examples: Badges, cosmetics, perks, bonus XP multipliers

### **Polls Tab**
- **Create Poll:** Ask your team questions
- **Players vote** and see real-time results
- Great for decision making

### **Auto Rules Tab**
- **Automatic XP Awards:**
  - "Give 50 XP when member reaches 200 total XP"
  - "Award 'Rising Star' badge when monthly XP > 500"
- Automate reward logic without manual intervention

---

## 📊 Leaderboard/Board Panel

The **board/leaderboard** automatically displays:
- ✅ All members ranked by XP
- ✅ Current season stats
- ✅ Member profiles with badges
- ✅ Monthly winners

**It's controlled by the member data in the database** - rankings update in real-time as members earn XP!

---

## 💾 Data Persistence

### **Current Status:**
- ✅ All content saves to **browser localStorage**
- ✅ Data persists across page refreshes
- ✅ Works offline

### **Optional: Enable Cloud Backup (Supabase)**

To sync admin content to Supabase (accessible from any device):

1. In your admin panel, add a "Sync to Cloud" button
2. Call the sync functions from `lib/adminSync.js`
3. Your content will backup to the database

Example:
```javascript
import { adminSync } from '@/lib/adminSync';

// After creating a quest
await adminSync.saveQuests(quests);
```

---

## 🔐 Secure Admin PIN

To change the admin PIN:

1. Open `app/page.jsx`
2. Find the line: `if(adminPin==="1234")`
3. Change `1234` to your secure PIN
4. There are 2 places to update (search for both)

---

## 📱 What Players See

When you create content in the admin panel:

- **Quests** → Appear in "Quests" tab
- **Challenges** → Listed in "Challenges" section
- **Daily Tasks** → Show in daily section
- **Events** → Appear in "Events" tab
- **Rewards** → Items in the "Shop"
- **Leaderboard** → Rankings based on XP

---

## ✨ Tips

1. **Content shows instantly** - no need to refresh
2. **Keep daily tasks under 5** - better UX
3. **XP rewards:** 
   - Daily tasks: 10-25 XP
   - Quests: 50-200 XP
   - Challenges: 100-500 XP
4. **Test content** as a regular user before launch
5. **Use auto-rules** to automate common rewards

---

## 🆘 Troubleshooting

**"Admin PIN not working?"**
- Make sure you're typing `1234` correctly
- Check the browser console (F12) for errors

**"New content not showing?"**
- The app uses localStorage - it might be disabled
- Try a different browser
- Check if you're in private/incognito mode

**"Lost all my content?"**
- Content is in browser localStorage
- Clearing cache will delete it
- Backup your content regularly

---

**Your app is now fully controllable! 🎉**
