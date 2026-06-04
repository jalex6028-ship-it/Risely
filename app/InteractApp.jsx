import React, { useState, useEffect, useRef } from "react";

// ── SVG Icon System ─────────────────────────────────────────────────────────
// Dribbble-inspired: bold filled shapes, gradient fills, each icon owns its color
// Usage:I.fire({size:20, color:"#f97316"}) or renderIcon("fire", 20, "#f97316")

// ─────────────────────────────────────────────────────────────────────────────
// RISELY ICON SYSTEM v2.0
// Design language: Duolingo-meets-Notion — rounded 24×24 grid, 1.5–2px stroke,
// filled shapes with luminous gradient cores, consistent visual weight.
// Every icon renders as inline SVG, flexShrink:0, verticalAlign:middle.
// Usage: I.home({size:20, color:ACCENT})  |  renderIcon("fire", 18, "#f97316")
// ─────────────────────────────────────────────────────────────────────────────

const I = {

    home: ({size=20,color="#3b9eff"}={}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",flexShrink:0}}>
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V10.5z" fill={color} fillOpacity=".18" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 22V17h6v5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

    feed: ({size=20,color="#3b9eff"}={}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",flexShrink:0}}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={color} fillOpacity=".15" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="9" y1="9" x2="15" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="13" x2="13" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

    quests: ({size=20,color="#3b9eff"}={}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",flexShrink:0}}>
      <circle cx="12" cy="12" r="9" fill={color} fillOpacity=".13" stroke={color} strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.4"/>
      <circle cx="12" cy="12" r="1.8" fill={color}/>
      <line x1="12" y1="3" x2="12" y2="5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="12" y1="18.5" x2="12" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="3" y1="12" x2="5.5" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="18.5" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),

    events: ({size=20,color="#3b9eff"}={}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",flexShrink:0}}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" fill={color} fillOpacity=".13" stroke={color} strokeWidth="1.6"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.4"/>
      <line x1="8" y1="3" x2="8" y2="7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="16" y1="3" x2="16" y2="7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="7" y="14" width="3" height="3" rx=".7" fill={color} fillOpacity=".7"/>
      <rect x="14" y="14" width="3" height="3" rx=".7" fill={color} fillOpacity=".7"/>
    </svg>
  ),

    shop: ({size=20,color="#3b9eff"}={}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",flexShrink:0}}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill={color} fillOpacity=".13" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.5"/>
      <path d="M16 10a4 4 0 0 1-8 0" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),

  // Emoji icons (compact)
  fire: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🔥</span>,
  trophy: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🏆</span>,
  crown: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>👑</span>,
  star: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⭐</span>,
  star_glow: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⭐</span>,
  medal: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🥇</span>,
  gem: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>💎</span>,
  badge: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎖</span>,
  xp: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⚡</span>,
  bolt: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⚡</span>,
  gift: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎁</span>,
  check: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>✅</span>,
  check_sm: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>✓</span>,
  plus: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>➕</span>,
  arrow_right: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>→</span>,
  gear: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⚙️</span>,
  bell: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🔔</span>,
  arrow: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>→</span>,
  sparkle: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>✨</span>,
  target: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎯</span>,
  clipboard: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📋</span>,
  calendar: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📅</span>,
  pin: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📍</span>,
  announce: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📢</span>,
  achievement: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🏅</span>,
  progress: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📈</span>,
  user: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>👤</span>,
  post: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>✍️</span>,
  muscle: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>💪</span>,
  leaderboard: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📊</span>,
  repeat: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🔄</span>,
  swords: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⚔️</span>,
  diamond_rarity: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>💎</span>,
  daily: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📋</span>,
  rankings: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📊</span>,
  badges_shelf: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎖</span>,
  add_post: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>✍️</span>,
  active_challenge: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⚔️</span>,
  my_progress: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📊</span>,
  location: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>📍</span>,
  sword: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⚔️</span>,
  swap: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🔄</span>,
  crush: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>💎</span>,
  chain: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>⛓️</span>,
  moves: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>👆</span>,
  raise_hand: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>✋</span>,
  handshake: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🤝</span>,
  ticket: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎫</span>,
  shirt: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>👕</span>,
  chair: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🪑</span>,
  snowflake: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>❄️</span>,
  confetti: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎉</span>,
  vote: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🗳️</span>,
  theater: ({size=20,color='#ccddef'}={}) => <span style={{fontSize:size*.7,lineHeight:1,display:'inline-flex',alignItems:'center'}}>🎭</span>,
};

const renderIcon=(key,size=20,color="#fff")=>{const fn=I[key];return fn?fn({size,color}):null;};



// ── HERO JOURNEY RANK SYSTEM (7 tiers × 4 divisions = 25 ranks) ─────────────
const RANK_TIERS = [
  { tier:"Initiate",   color:"#94a3b8", colorDark:"#475569", glow:"rgba(148,163,184,.5)", gem:"#cbd5e1" },
  { tier:"Explorer",   color:"#34d399", colorDark:"#059669", glow:"rgba(52,211,153,.5)",  gem:"#6ee7b7" },
  { tier:"Challenger", color:"#3b9eff", colorDark:"#1d4ed8", glow:"rgba(59,158,255,.5)",  gem:"#93c5fd" },
  { tier:"Champion",   color:"#c084fc", colorDark:"#7c3aed", glow:"rgba(192,132,252,.5)", gem:"#e879f9" },
  { tier:"Elite",      color:"#fbbf24", colorDark:"#b45309", glow:"rgba(251,191,36,.5)",  gem:"#fde68a" },
  { tier:"Master",     color:"#f87171", colorDark:"#b91c1c", glow:"rgba(248,113,113,.5)", gem:"#fca5a5" },
  { tier:"Legend",     color:"#fde047", colorDark:"#ca8a04", glow:"rgba(253,224,71,.6)",  gem:"#fef08a", isLegend:true },
];
const RANK_XP = [[0,80,160,260],[380,520,680,860],[1050,1260,1500,1780],[2100,2450,2850,3300],[3800,4400,5100,5900],[6800,7800,9000,10500],[12000]];
const LEVELS = (()=>{
  const out=[]; let idx=1;
  RANK_TIERS.forEach((t,ti)=>{
    const divs=t.isLegend?["I"]:["I","II","III","IV"];
    divs.forEach((div,di)=>{
      out.push({l:idx++,tier:t.tier,div,name:`${t.tier} ${div}`,
        xp:RANK_XP[ti][di]||RANK_XP[ti][0],
        color:t.color,colorDark:t.colorDark,glow:t.glow,gem:t.gem,
        tierIdx:ti,divIdx:di,isLegend:!!t.isLegend});
    });
  });
  return out;
})();
const BADGES = [
  { id:"first_steps",  name:"First Steps",   desc:"Complete a daily task",            rarity:"common",    hint:"Claim any daily task on Home" },
  { id:"quest_done",   name:"Quest Starter",  desc:"Complete your first quest",        rarity:"common",    hint:"Get marked for a quest by the board" },
  { id:"century",      name:"Century",        desc:"Earn 100 Diamonds total",                rarity:"common",    hint:"Keep earning Diamonds" },
  { id:"social_bee",   name:"Social Bee",     desc:"Post a shoutout",                  rarity:"common",    hint:"Tap Post on the Feed tab" },
  { id:"on_fire",      name:"On Fire",        desc:"3-day activity streak",            rarity:"rare",      hint:"Complete daily tasks 3 days in a row" },
  { id:"voter",        name:"Civic Voice",    desc:"Vote in a poll",                   rarity:"rare",      hint:"Find an active poll on Events or Feed" },
  { id:"shopper",      name:"Big Spender",    desc:"Redeem a reward",                  rarity:"rare",      hint:"Spend Diamonds in the Shop" },
  { id:"top3",         name:"Top 3",          desc:"Reach top 3 on leaderboard",       rarity:"epic",      hint:"Grind Diamonds to climb the monthly ranks" },
  { id:"rising_star",  name:"Rising Star",    desc:"Reach 500 Diamonds",                     rarity:"epic",      hint:"You need 500 total Diamonds" },
  { id:"challenger",   name:"Challenger",     desc:"Complete a timed challenge",       rarity:"epic",      hint:"Complete a challenge before it expires" },
  { id:"champ_season", name:"Season Champ",   desc:"Finish #1 in a season",            rarity:"epic",      hint:"Be top Diamond earner when month ends" },
  { id:"legend",       name:"Legend",         desc:"Reach 1000 Diamonds",                    rarity:"legendary", hint:"Earn 1000 Diamonds all-time" },
];
const RARITY = {
  common:    { bg:"#161d2e", border:"#2d3d55", color:"#7a92b0", label:"Common"    },
  rare:      { bg:"#131a2e", border:"#2a4a7f", color:"#5b8fd4", label:"Rare"      },
  epic:      { bg:"#0a1e3a", border:"#1e5a9e", color:"#a07ce0", label:"Epic"      },
  legendary: { bg:"#211400", border:"#8a5c00", color:"#d4a017", label:"Legendary" },
};
const DEFAULT_DAILY = [
  { id:"d1", title:"Check in",         desc:"Open the app today",                 xp:10 },
  { id:"d2", title:"Share something",  desc:"Post about Interact on social",      xp:20 },
  { id:"d3", title:"Drop an idea",     desc:"Suggest something in the gc",        xp:15 },
  { id:"d4", title:"Show up",          desc:"Attend today's meeting",             xp:30 },
  { id:"d5", title:"Help someone out", desc:"Help a fellow member",               xp:25 },
];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Daily Login Reward Calendar (Dribbble-inspired: Carlene Lim / Antoine David)
const LOGIN_REWARDS = [
  { day:1, xp:10,  icon:"bolt", label:"Spark",   color:"#6366f1", glow:"#6366f133", rarity:"common"    },
  { day:2, xp:20,  icon:"fire", label:"Heat",    color:"#f97316", glow:"#f9731633", rarity:"common"    },
  { day:3, xp:35,  icon:"gem", label:"Gem",     color:"#06b6d4", glow:"#06b6d444", rarity:"rare"      },
  { day:4, xp:50,  icon:"star", label:"Star",    color:"#0ea5e9", glow:"#0ea5e944", rarity:"rare"      },
  { day:5, xp:70,  icon:"trophy", label:"Trophy",  color:"#ec4899", glow:"#ec489944", rarity:"epic"      },
  { day:6, xp:100, icon:"crown", label:"Crown",   color:"#f59e0b", glow:"#f59e0b55", rarity:"epic"      },
  { day:7, xp:150, icon:"star_glow", label:"JACKPOT", color:"#fbbf24", glow:"#fbbf2466", rarity:"legendary", jackpot:true },
];

const getLv   = xp=>{ let c=LEVELS[0]; for(const l of LEVELS) if(xp>=l.xp) c=l; return c; };
const getNext = xp=>{ for(const l of LEVELS) if(xp<l.xp) return l; return null; };
const todayStr = () => new Date().toISOString().slice(0,10);
const monthStr = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; };
const monthName= m => { if(!m) return ""; const [y,mo]=m.split("-"); return `${MONTHS[parseInt(mo)-1]} ${y}`; };
const daysLeft = () => { const n=new Date(); return new Date(n.getFullYear(),n.getMonth()+1,0).getDate()-n.getDate(); };
const timeAgo  = ts => { const s=Math.floor((Date.now()-ts)/1000); if(s<60)return"just now"; if(s<3600)return`${Math.floor(s/60)}m ago`; if(s<86400)return`${Math.floor(s/3600)}h ago`; return`${Math.floor(s/86400)}d ago`; };
const countdown= e => { const ms=e-Date.now(); if(ms<=0)return"Ended"; const d=Math.floor(ms/86400000),h=Math.floor((ms%86400000)/3600000); return d>0?`${d}d ${h}h`:`${h}h left`; };
const dailyResetIn = () => { const n=new Date(),m=new Date(n); m.setHours(24,0,0,0); const ms=m-n,h=Math.floor(ms/3600000),mi=Math.floor((ms%3600000)/60000); return h>0?`${h}h ${mi}m`:`${mi}m`; };

function makeMember(id,name,xp,badges,quests,streak,pw) {
  return {id,name,xp,badges,questsDone:quests,dailyDone:{},streak,spentXP:0,password:pw,monthlyXP:xp,allTimeXP:xp,xpHistory:[],joinDate:"2024-09",photo:null,loginStreak:0,lastLoginDate:"",loginHistory:[],spinLastDate:""};
}
const DEFAULT_MEMBERS = [
  makeMember("m1","Sofia Radu",   1050,["first_steps","quest_done","century","on_fire","top3","rising_star","legend"],["q1","q2","q3"],7,"sofia"),
  makeMember("m2","Ioana Dima",   780, ["first_steps","quest_done","century","top3","rising_star"],["q1","q2","q3"],4,"ioana"),
  makeMember("m3","Alex Popescu", 420, ["first_steps","quest_done","century"],["q1","q2"],2,"alex"),
  makeMember("m4","Mihai Ionescu",150, ["first_steps","century"],["q1"],1,"mihai"),
  makeMember("m5","Andrei Popa",  60,  ["first_steps"],[],0,"andrei"),
  makeMember("m6","Elena Mihai",  30,  [],[],0,"elena"),
];
const DEFAULT_QUESTS = [
  {id:"q1",title:"Show Up & Shine",  desc:"Attend a club meeting or event",       xp:50, icon:"calendar",category:"Attendance", active:true},
  {id:"q2",title:"Party Planner",    desc:"Help organize a fundraiser party",      xp:100,icon:"confetti",category:"Events",    active:true},
  {id:"q3",title:"Spread the Word",  desc:"Bring a new member to Interact",        xp:150,icon:"megaphone",category:"Recruit",   active:true},
  {id:"q4",title:"Social Star",      desc:"Create content about Interact online",  xp:60, icon:"camera",category:"Promo",     active:true},
  {id:"q5",title:"Donation Drive",   desc:"Collect at least 5 donations",          xp:120,icon:"heart",category:"Fundraise", active:true},
];
const DEFAULT_FEED = [
  {id:"f1",type:"announcement",author:"Board",authorId:"board",content:"Welcome to RISELY! Log in with your first name as your password.",timestamp:Date.now()-172800000,reactions:{},pinned:true},
  {id:"f2",type:"achievement",author:"System",authorId:"system",content:"Sofia Radu just hit Legend status. 1000 Diamonds and counting!",timestamp:Date.now()-7200000,reactions:{},pinned:false},
];
const DEFAULT_CHALLENGES = [
  {id:"c1",title:"Party Week",   desc:"Attend 2 events this week",     xp:200,icon:"confetti",endsAt:Date.now()+432000000, active:true,completedBy:[]},
  {id:"c2",title:"Recruiter Rush",desc:"Bring someone new to the club",xp:300,icon:"megaphone",endsAt:Date.now()+1555200000,active:true,completedBy:[]},
];
const DEFAULT_POLLS = [
  {id:"p1",question:"What should our next fundraiser theme be?",options:[{id:"o1",text:"Masquerade Ball",votes:[]},{id:"o2",text:"Carnival Night",votes:[]},{id:"o3",text:"Retro Disco",votes:[]}],endsAt:Date.now()+604800000,active:true},
];
const DEFAULT_EVENTS = [
  {id:"e1",title:"Board Meeting",      date:"2026-03-10",time:"18:00",location:"Clubhouse", desc:"Monthly board sync",                  icon:"clipboard",rsvp:[]},
  {id:"e2",title:"Fundraiser Party",   date:"2026-03-22",time:"20:00",location:"Sky Lounge",desc:"Our biggest event of the semester!",   icon:"confetti",rsvp:[]},
  {id:"e3",title:"Volunteer Day",      date:"2026-04-05",time:"10:00",location:"City Park", desc:"Community clean-up & donation drive",  icon:"heart",rsvp:[]},
];
const DEFAULT_REWARDS = [
  {id:"r1", title:"Shoutout Post",      desc:"Board posts a shoutout for you on all socials",  cost:50,  icon:"📢", rarity:"common",    cat:"perks",       stock:99, featured:false},
  {id:"r2", title:"VIP Party Entry",    desc:"Skip the queue at the next club party",           cost:150, icon:"🎟", rarity:"epic",       cat:"experiences", stock:10, featured:true},
  {id:"r3", title:"Board Meeting Seat", desc:"Sit in on a real board meeting decision",         cost:200, icon:"💼", rarity:"legendary",  cat:"experiences", stock:5,  featured:false},
  {id:"r4", title:"Club Hoodie",        desc:"Premium Interact hoodie with your name on it",   cost:400, icon:"👕", rarity:"rare",       cat:"merch",       stock:8,  featured:false},
  {id:"r5", title:"Name on Trophy",     desc:"Engraved on the semester hall-of-fame trophy",   cost:800, icon:"🏆", rarity:"legendary",  cat:"special",     stock:1,  featured:false},
  {id:"r6", title:"Bonus Diamonds Pack",      desc:"Instant +100 Diamond boost to your balance",          cost:75,  icon:"⚡", rarity:"common",    cat:"perks",       stock:20, featured:false},
  {id:"r7", title:"Custom Badge",       desc:"Exclusive badge only redeemers can earn",         cost:300, icon:"🎖", rarity:"epic",       cat:"special",     stock:15, featured:false},
  {id:"r8", title:"Photo on Feed",      desc:"Your best moment featured on the club feed",      cost:120, icon:"📸", rarity:"common",    cat:"perks",       stock:30, featured:false},
  {id:"r9", title:"Event Front Seat",   desc:"Reserved front-row seat at any club event",       cost:250, icon:"🪑", rarity:"rare",       cat:"experiences", stock:6,  featured:false},
  {id:"r10",title:"Mystery Box",        desc:"Open for a surprise reward — anything inside",    cost:100, icon:"📦", rarity:"epic",       cat:"special",     stock:99, isMystery:true, featured:false},
];

function applyBadges(m, byMonth) {
  const b=new Set(m.badges||[]);
  if(Object.values(m.dailyDone||{}).flat().length>=1) b.add("first_steps");
  if((m.questsDone||[]).length>=1) b.add("quest_done");
  if((m.allTimeXP||0)>=100) b.add("century");
  if((m.allTimeXP||0)>=500) b.add("rising_star");
  if((m.allTimeXP||0)>=1000) b.add("legend");
  if((m.streak||0)>=3) b.add("on_fire");
  if(byMonth){const r=byMonth.findIndex(x=>x.id===m.id);if(r>=0&&r<3)b.add("top3");}
  return [...b];
}
function finalizeAll(ms){const s=[...ms].sort((a,b)=>b.monthlyXP-a.monthlyXP);return ms.map(m=>({...m,badges:applyBadges(m,s)}));}
function giveXP(members,id,amt,reason,icon="sparkle"){return members.map(m=>{if(m.id!==id)return m;return{...m,xp:(m.xp||0)+amt,monthlyXP:(m.monthlyXP||0)+amt,allTimeXP:(m.allTimeXP||0)+amt,xpHistory:[{ts:Date.now(),amount:amt,reason,icon},...(m.xpHistory||[]).slice(0,99)]}});}

async function storeGet(k){try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}}
async function storeSet(k,v){try{await window.storage.set(k,JSON.stringify(v));}catch{}}

// ── Design tokens
const BG="#050b14", SURF="#0a1628", CARD="#0d1e30", BORD="#152238", BORD2="#1e3250";
const MUTED="#4a6580", TEXT="#ccddef", ACCENT="#3b9eff", ACCL="#0f2040";
const GREEN="#34d399", ORANGE="#f59e0b", RED="#e05c4b";
// ── Cosmic helpers ────────────────────────────────────────────────────────────
const cosmicCard = {
  background:"radial-gradient(ellipse at 50% 0%,#0d2040 0%,#07111e 60%,#050b14 100%)",
  border:"1px solid #1e3250",
  borderRadius:16,
  boxShadow:"0 8px 32px rgba(0,0,0,.6), inset 0 1px 0 rgba(59,158,255,.06)"
};
const glowCard = (color="#3b9eff") => ({
  background:`radial-gradient(ellipse at 50% -10%, ${color}22 0%, #07111e 50%, #050b14 100%)`,
  border:`1px solid ${color}30`,
  borderRadius:16,
  boxShadow:`0 8px 32px rgba(0,0,0,.6), 0 0 0 1px ${color}10, inset 0 1px 0 ${color}15`
});
const sectionLabel = {
  fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase",
  fontWeight:700, color:"rgba(255,255,255,.28)", marginBottom:10
};

// ── Badge SVG visuals — all inner icons normalized to 14×14 centered at (16,16)
// Every icon uses coordinates within the clipped region (cx=16, cy=16, r=11 clip)
const BADGE_VISUALS = {
  first_steps:  {emoji:"👣",color:"#34d399"},
  quest_done:   {emoji:"🎯",color:"#3b9eff"},
  century:      {emoji:"💯",color:"#f59e0b"},
  social_bee:   {emoji:"🐝",color:"#fbbf24"},
  on_fire:      {emoji:"🔥",color:"#f97316"},
  voter:        {emoji:"🗳️",color:"#a78bfa"},
  shopper:      {emoji:"🛒",color:"#3b9eff"},
  top3:         {emoji:"🥇",color:"#fbbf24"},
  rising_star:  {emoji:"🌟",color:"#f59e0b"},
  challenger:   {emoji:"⚔️",color:"#e05c4b"},
  champ_season: {emoji:"🏆",color:"#fbbf24"},
  legend:       {emoji:"👑",color:"#c084fc"},
};

function RankBadgeFromXP({xp, size=48, glow=false}){
  return <RankBadge rank={getLv(xp)} size={size} glow={glow}/>;
}

function RankBadge({rank, size=48, glow=false}){
  if(!rank) return null;
  const {color,colorDark,glow:glowColor,gem,tierIdx,divIdx,isLegend}=rank;
  const s=size, h=s*0.5, id=`rb_${tierIdx}_${divIdx}_${s}`;
  const hex=(cx,cy,r)=>{const pts=[];for(let i=0;i<6;i++){const a=(Math.PI/3)*i-Math.PI/6;pts.push(`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`);}return pts.join(' ');};
  const cx=h,cy=h*0.96,r1=h*0.82,r2=h*0.68,r3=h*0.48;
  const divDots=(()=>{const dots=[];const total=isLegend?4:divIdx+1;for(let i=0;i<total;i++){const a=Math.PI*(0.65+i*(0.70/(Math.max(total-1,1))));dots.push({x:cx+r1*1.0*Math.cos(a),y:cy+r1*1.0*Math.sin(a)});}return dots;})();
  return(
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none"
      style={{display:"inline-block",verticalAlign:"middle",flexShrink:0,
        filter:glow?`drop-shadow(0 0 ${s*0.14}px ${color}) drop-shadow(0 0 ${s*0.06}px ${color})`:`drop-shadow(0 2px 4px rgba(0,0,0,.6))`}}>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.22"/><stop offset="100%" stopColor={colorDark} stopOpacity="0.38"/></linearGradient>
        <linearGradient id={`${id}rim`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor={colorDark}/></linearGradient>
        <linearGradient id={`${id}gem`} x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#fff" stopOpacity="0.9"/><stop offset="40%" stopColor={gem}/><stop offset="100%" stopColor={colorDark}/></linearGradient>
        <linearGradient id={`${id}plat`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.5"/><stop offset="100%" stopColor={colorDark} stopOpacity="0.8"/></linearGradient>
        <radialGradient id={`${id}glow`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={color} stopOpacity="0.3"/><stop offset="100%" stopColor={color} stopOpacity="0"/></radialGradient>
      </defs>
      {(glow||divIdx>=2||isLegend)&&<circle cx={cx} cy={cy} r={h*0.88} fill={`url(#${id}glow)`}/>}
      {(divIdx>=2||isLegend)&&(<>
        <path d={`M${cx-r1*0.85},${cy+r1*0.1} C${cx-r1*1.3},${cy-r1*0.3} ${cx-r1*1.5},${cy+r1*0.4} ${cx-r1*0.95},${cy+r1*0.55}`} stroke={color} strokeWidth={s*0.035} strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d={`M${cx-r1*0.85},${cy+r1*0.1} C${cx-r1*1.18},${cy-r1*0.1} ${cx-r1*1.3},${cy+r1*0.3} ${cx-r1*0.9},${cy+r1*0.48}`} stroke={color} strokeWidth={s*0.022} strokeLinecap="round" fill="none" opacity="0.45"/>
        <path d={`M${cx+r1*0.85},${cy+r1*0.1} C${cx+r1*1.3},${cy-r1*0.3} ${cx+r1*1.5},${cy+r1*0.4} ${cx+r1*0.95},${cy+r1*0.55}`} stroke={color} strokeWidth={s*0.035} strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d={`M${cx+r1*0.85},${cy+r1*0.1} C${cx+r1*1.18},${cy-r1*0.1} ${cx+r1*1.3},${cy+r1*0.3} ${cx+r1*0.9},${cy+r1*0.48}`} stroke={color} strokeWidth={s*0.022} strokeLinecap="round" fill="none" opacity="0.45"/>
      </>)}
      <polygon points={hex(cx,cy,r1)} fill={`url(#${id}bg)`} stroke={`url(#${id}rim)`} strokeWidth={s*0.045}/>
      <ellipse cx={cx} cy={cy-r1*0.35} rx={r1*0.55} ry={r1*0.2} fill="#fff" opacity="0.07"/>
      {divIdx>=1&&<polygon points={hex(cx,cy,r1*0.93)} fill="none" stroke={color} strokeWidth={s*0.018} opacity="0.3"/>}
      <polygon points={hex(cx,cy,r2)} fill={`url(#${id}plat)`} stroke={color} strokeWidth={s*0.025} opacity="0.9"/>
      <ellipse cx={cx} cy={cy-r2*0.3} rx={r2*0.5} ry={r2*0.2} fill="#fff" opacity="0.12"/>
      {(()=>{const gr=r3,gt=cy-gr*0.82,gb=cy+gr*0.82;return(<>
        <path d={`M${cx},${gt-gr*0.18} L${cx-gr*0.58},${cy-gr*0.04} L${cx},${gb} L${cx+gr*0.58},${cy-gr*0.04} Z`} fill={`url(#${id}gem)`}/>
        <path d={`M${cx-gr*0.24},${gt} L${cx+gr*0.24},${gt} L${cx+gr*0.58},${cy-gr*0.04} L${cx-gr*0.58},${cy-gr*0.04} Z`} fill="#fff" opacity="0.22"/>
        <circle cx={cx-gr*0.16} cy={cy-gr*0.28} r={gr*0.1} fill="#fff" opacity="0.7"/>
        <circle cx={cx-gr*0.16} cy={cy-gr*0.28} r={gr*0.05} fill="#fff"/>
      </>);})()}
      {isLegend&&(()=>{const cr=r3*0.52,cy2=cy-r2*0.6;return <path d={`M${cx-cr},${cy2+cr*0.6} L${cx-cr},${cy2} L${cx-cr*0.4},${cy2+cr*0.4} L${cx},${cy2-cr*0.28} L${cx+cr*0.4},${cy2+cr*0.4} L${cx+cr},${cy2} L${cx+cr},${cy2+cr*0.6} Z`} fill={gem} stroke={color} strokeWidth={s*0.025} opacity="0.95"/>;})()}
      {divDots.map((d,i)=>(<circle key={i} cx={d.x} cy={d.y} r={s*0.038} fill={isLegend?"#fde047":color} stroke="#050b14" strokeWidth={s*0.02} style={{filter:`drop-shadow(0 0 ${s*0.04}px ${color})`}}/>))}
    </svg>
  );
}

function BadgeIcon({id,size=52,unlocked=true}){
  const v=BADGE_VISUALS[id]||{emoji:"🎖",color:"#94a3b8"};
  return(
    <div style={{
      width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:`radial-gradient(circle at 35% 30%, ${v.color}44, ${v.color}22)`,
      border:`1.5px solid ${v.color}66`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.45,
      filter:unlocked?"none":"grayscale(1)",
      opacity:unlocked?1:0.35,
    }}>{v.emoji}</div>
  );
}

function BadgeIcon({id,size=52,unlocked=true}){
  const v=BADGE_VISUALS[id]||{emoji:"🎖",color:"#94a3b8"};
  return(
    <div style={{
      width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:`radial-gradient(circle at 35% 30%, ${v.color}44, ${v.color}22)`,
      border:`1.5px solid ${v.color}66`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.45,
      filter:unlocked?"none":"grayscale(1)",
      opacity:unlocked?1:0.35,
    }}>{v.emoji}</div>
  );
}
function XPGem({amount,size="md",showLabel=true}){
  const sz={sm:{g:20,f:11,p:"3px 8px"},md:{g:26,f:13,p:"5px 11px"},lg:{g:34,f:16,p:"7px 14px"}}[size]||{g:26,f:13,p:"5px 11px"};
  return(
    <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#1a2e50,#111e35)",border:"1px solid #2a4a7f",borderRadius:10,padding:sz.p}}>
      <svg width={sz.g} height={sz.g} viewBox="0 0 28 28">
        <defs><radialGradient id="gem_g" cx="38%" cy="30%" r="70%"><stop offset="0%" stopColor="#93c5fd"/><stop offset="40%" stopColor="#3b9eff"/><stop offset="100%" stopColor="#1d4ed8"/></radialGradient></defs>
        <polygon points="14,3 22,9 22,19 14,25 6,19 6,9" fill="url(#gem_g)"/>
        <polygon points="14,3 22,9 22,19 14,25 6,19 6,9" fill="none" stroke="#93c5fd" strokeWidth="0.6" opacity=".5"/>
        <polygon points="14,3 22,9 14,13" fill="#fff" opacity=".2"/>
        <polygon points="6,9 14,13 14,3" fill="#fff" opacity=".08"/>
        <line x1="6" y1="9" x2="22" y2="9" stroke="#fff" opacity=".15" strokeWidth="0.6"/>
        <ellipse cx="10" cy="10" rx="2.5" ry="1.5" fill="#fff" opacity=".35" transform="rotate(-20 10 10)"/>
      </svg>
      {showLabel&&amount!==undefined&&<span style={{fontWeight:700,fontSize:sz.f,color:"#93c5fd",letterSpacing:"-0.3px"}}>{typeof amount==="number"?amount.toLocaleString():amount}</span>}
    </div>
  );
}

// ── Shared UI components
function Pfp({member,size=44,ring}){
  if(member?.photo) return <img src={member.photo} alt={member.name} style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:ring?`2px solid ${ring}`:`2px solid rgba(30,50,80,.8)`,boxShadow:ring?`0 0 12px ${ring}55`:undefined}}/>;
  const pal=["#e05c4b","#e08c3a","#4caf7d","#3b9eff","#2e86de","#e05498","#3bbfe0","#b0a030"];
  const bg=pal[(member?.name||"?").charCodeAt(0)%pal.length];
  const ini=(member?.name||"?").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return <div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:size*0.36,color:"#fff",flexShrink:0,border:ring?`2px solid ${ring}`:`2px solid rgba(30,50,80,.8)`,letterSpacing:"-0.5px",boxShadow:ring?`0 0 12px ${ring}55`:undefined}}>{ini}</div>;
}

function Modal({title,onClose,children,wide}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:500,padding:"16px",paddingTop:"max(16px,env(safe-area-inset-top))",paddingBottom:"calc(16px + env(safe-area-inset-bottom))",backdropFilter:"blur(4px)",overflowY:"auto"}} onClick={onClose}>
      <div style={{
        background:"radial-gradient(ellipse at 50% -5%,#0d2540 0%,#07111e 55%,#040d1a 100%)",
        border:"1px solid #1e3a5a",borderRadius:22,padding:24,
        maxWidth:wide?500:380,width:"100%",marginTop:"auto",marginBottom:"auto",
        boxShadow:"0 32px 80px rgba(0,0,0,.9), 0 0 0 1px rgba(59,158,255,.08), inset 0 1px 0 rgba(59,158,255,.1)",
      }} onClick={e=>e.stopPropagation()}>
        {title&&<div style={{fontWeight:700,fontSize:16,marginBottom:18,color:TEXT,borderBottom:"1px solid rgba(30,50,80,.8)",paddingBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{background:"linear-gradient(90deg,#93c5fd,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{title}</span>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"50%",width:36,height:36,cursor:"pointer",color:MUTED,fontSize:16,lineHeight:1,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
        </div>}
        {children}
      </div>
    </div>
  );
}

// Diamond Pop animation
function XPPop({amount,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,1400);return()=>clearTimeout(t);},[]);
  return(
    <div style={{position:"fixed",top:"35%",left:"50%",transform:"translateX(-50%)",zIndex:9999,pointerEvents:"none",animation:"xppop 1.4s ease-out forwards"}}>
      <style>{`@keyframes xppop{0%{transform:translateX(-50%) translateY(0) scale(.7);opacity:0}20%{transform:translateX(-50%) translateY(-10px) scale(1.2);opacity:1}70%{transform:translateX(-50%) translateY(-30px) scale(1);opacity:1}100%{transform:translateX(-50%) translateY(-60px) scale(.9);opacity:0}}`}</style>
      <div style={{background:"linear-gradient(135deg,#0d2a4a,#081828)",border:"2px solid rgba(59,158,255,.5)",borderRadius:16,padding:"10px 20px",display:"flex",alignItems:"center",gap:8,boxShadow:"0 0 24px rgba(59,158,255,.4), inset 0 1px 0 rgba(59,158,255,.2)"}}>
        <XPGem showLabel={false} size="sm"/>
        <span style={{fontWeight:800,fontSize:20,color:"#93c5fd"}}>+{amount} <DiamondIcon size={20} color={"#34d399"}/></span>
      </div>
    </div>
  );
}

// Level up celebration
function LevelUpModal({level,onDone}){
  // Full promotion screen — rank badge + confetti burst + tier info
  const isNewTier = level.divIdx===0; // just entered a new tier
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600,padding:"20px 20px max(20px,env(safe-area-inset-bottom))",backdropFilter:"blur(8px)"}}>
      <LoginConfetti/>
      <style>{`
        @keyframes lvlup{0%{transform:scale(.3) rotate(-10deg);opacity:0}60%{transform:scale(1.1) rotate(2deg)}80%{transform:scale(.97)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes lvlFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes promoRing{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes badgeIn{0%{transform:scale(0) rotate(-20deg);opacity:0}65%{transform:scale(1.15) rotate(3deg);opacity:1}85%{transform:scale(.96)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes textFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div style={{
        textAlign:"center",maxWidth:320,width:"100%",position:"relative",
        background:`radial-gradient(ellipse at 50% -5%,${level.color}25,#050b14 55%,#040312 100%)`,
        border:`1px solid ${level.color}40`,borderRadius:28,padding:"40px 28px 32px",
        boxShadow:`0 0 80px ${level.glow}, 0 40px 100px rgba(0,0,0,.9), inset 0 1px 0 ${level.color}30`
      }}>
        <StarField/>
        {/* Animated rings behind badge */}
        <div style={{position:"absolute",top:32,left:"50%",transform:"translateX(-50%)",width:140,height:140,borderRadius:"50%",border:`2px solid ${level.color}30`,animation:"promoRing 2s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:24,left:"50%",transform:"translateX(-50%)",width:160,height:160,borderRadius:"50%",border:`1px solid ${level.color}15`,animation:"promoRing 2.8s .4s ease-in-out infinite"}}/>

        {/* Promotion label */}
        <div style={{fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:14,animation:"textFadeUp .4s ease both"}}>
          {isNewTier?"New Rank Tier Unlocked":"Rank Promotion"}
        </div>

        {/* Rank Badge — animated entrance */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:16,animation:"badgeIn .7s cubic-bezier(.175,.885,.32,1.275) forwards",position:"relative",zIndex:2}}>
          <RankBadge rank={level} size={96} glow={true}/>
        </div>

        {/* Rank name */}
        <div style={{
          fontSize:isNewTier?34:28,fontWeight:900,letterSpacing:"-1px",lineHeight:1,marginBottom:6,
          background:`linear-gradient(135deg,#fff 20%,${level.color})`,
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          animation:"textFadeUp .4s .15s ease both",position:"relative",zIndex:2
        }}>{level.name}</div>

        {/* Diamond threshold */}
        <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:4,animation:"textFadeUp .4s .25s ease both",position:"relative",zIndex:2}}>
          {level.xp.toLocaleString()} <DiamondIcon size={20} color={"currentColor"}/> reached
        </div>

        {/* Division pips row */}
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:20,animation:"textFadeUp .4s .3s ease both"}}>
          {(level.isLegend?["I","II","III","IV"]:["I","II","III","IV"].slice(0,level.divIdx+1)).map((d,i)=>(
            <div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<=level.divIdx?level.color:"rgba(255,255,255,.1)",boxShadow:i<=level.divIdx?`0 0 6px ${level.color}`:"none"}}/>
          ))}
        </div>

        {/* Motivational message */}
        <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginBottom:24,animation:"textFadeUp .4s .35s ease both",position:"relative",zIndex:2}}>
          {level.isLegend?"You've reached the pinnacle. True Legend.":isNewTier?`Welcome to ${level.tier}. Keep pushing forward!`:`One step closer to ${level.tier} ${["I","II","III","IV"][Math.min(level.divIdx+1,3)]}.`}
        </div>

        <button onClick={onDone} style={{
          background:`linear-gradient(135deg,${level.colorDark},${level.color})`,
          color:"#000",border:"none",borderRadius:14,padding:"13px 40px",
          fontWeight:900,fontSize:15,cursor:"pointer",fontFamily:"inherit",
          boxShadow:`0 6px 24px ${level.glow}, inset 0 1px 0 rgba(255,255,255,.3)`,
          animation:"textFadeUp .4s .4s ease both",position:"relative",zIndex:2
        }}>Keep Going →</button>
      </div>
    </div>
  );
}


function BadgeUnlockModal({badge,onDone}){
  const rs=RARITY[badge.rarity];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.94)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:601,padding:"20px 20px max(20px,env(safe-area-inset-bottom))",backdropFilter:"blur(8px)"}} onClick={onDone}>
      <style>{`@keyframes badgepop{0%{transform:scale(.3) rotate(-12deg);opacity:0}65%{transform:scale(1.12) rotate(2deg)}85%{transform:scale(.97)}100%{transform:scale(1) rotate(0);opacity:1}}@keyframes shimmer{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
      <div style={{textAlign:"center"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:11,color:rs.color,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:20,animation:"shimmer 1.8s ease infinite"}}>Badge Unlocked!</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:18,animation:"badgepop .65s cubic-bezier(.175,.885,.32,1.275) forwards"}}><BadgeIcon id={badge.id} size={96} unlocked={true}/></div>
        <div style={{fontSize:22,fontWeight:800,color:rs.color,marginBottom:6}}>{badge.name}</div>
        <div style={{fontSize:13,color:MUTED,marginBottom:30,maxWidth:220,margin:"0 auto 30px"}}>{badge.desc}</div>
        <button onClick={onDone} style={{background:`linear-gradient(135deg,${rs.color}33,${rs.color}18)`,color:rs.color,border:`1px solid ${rs.color}55`,borderRadius:12,padding:"11px 36px",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 16px ${rs.color}30`}}>Nice! →</button>
      </div>
    </div>
  );
}

function AllTasksDoneModal({onDone}){
  return(
    <div onClick={onDone} style={{
      position:"fixed",inset:0,zIndex:602,
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"max(24px,env(safe-area-inset-top)) 24px max(24px,env(safe-area-inset-bottom))",
      background:"rgba(2,8,18,.92)",
      backdropFilter:"blur(24px)",
      animation:"fadeIn .2s ease",
    }}>
      <style>{`
        @keyframes allDoneBounce{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-18px) scale(1.08)}65%{transform:translateY(-6px) scale(1.03)}}
        @keyframes allDoneRing{0%{transform:scale(.85);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes allDoneIn{0%{opacity:0;transform:scale(.88) translateY(20px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes allDoneShine{0%{left:-80%}100%{left:130%}}
        @keyframes allDonePulse{0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}50%{box-shadow:0 0 0 16px rgba(52,211,153,.08)}}
      `}</style>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%",maxWidth:340,textAlign:"center",
        background:"linear-gradient(160deg,#091c12 0%,#050d0a 55%,#071510 100%)",
        border:"1.5px solid rgba(52,211,153,.2)",
        borderRadius:28,
        overflow:"hidden",
        boxShadow:"0 0 60px rgba(52,211,153,.12), 0 32px 80px rgba(0,0,0,.85), inset 0 1px 0 rgba(52,211,153,.1)",
        animation:"allDoneIn .35s cubic-bezier(.22,1,.36,1)",
      }}>

        {/* Top glow panel */}
        <div style={{
          padding:"36px 28px 28px",
          position:"relative",overflow:"hidden",
          background:"linear-gradient(180deg,rgba(52,211,153,.08) 0%,transparent 100%)",
          borderBottom:"1px solid rgba(52,211,153,.08)",
        }}>
          {/* Ambient radial */}
          <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",
            width:240,height:180,
            background:"radial-gradient(ellipse,rgba(52,211,153,.22) 0%,transparent 70%)",
            pointerEvents:"none"}}/>
          {/* Shine sweep */}
          <div style={{position:"absolute",top:0,bottom:0,width:"45%",
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",
            animation:"allDoneShine 3s ease-in-out infinite",
            pointerEvents:"none",left:"-80%"}}/>

          {/* Trophy icon with pulse ring */}
          <div style={{
            width:88,height:88,borderRadius:"50%",margin:"0 auto 20px",
            background:"rgba(52,211,153,.1)",
            border:"2px solid rgba(52,211,153,.3)",
            display:"flex",alignItems:"center",justifyContent:"center",
            animation:"allDonePulse 2.4s ease-in-out infinite, allDoneRing .5s cubic-bezier(.22,1,.36,1)",
            boxShadow:"0 0 40px rgba(52,211,153,.15)",
            position:"relative",
          }}>
            <div style={{animation:"allDoneBounce 1.4s ease-in-out infinite"}}>
              {I.trophy({size:42,color:"#fbbf24"})}
            </div>
          </div>

          {/* Label */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:6,
            background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.2)",
            borderRadius:20,padding:"4px 14px",
            fontSize:10,fontWeight:800,color:"#34d399",
            letterSpacing:".15em",textTransform:"uppercase",
            marginBottom:14,
          }}>
            Daily Complete
          </div>

          {/* Headline */}
          <div style={{
            fontSize:26,fontWeight:900,letterSpacing:"-0.8px",
            color:"#fff",lineHeight:1.15,marginBottom:10,
          }}>
            All tasks<br/>
            <span style={{
              background:"linear-gradient(135deg,#34d399,#6ee7b7)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            }}>crushed today!</span>
          </div>

          {/* Subtext */}
          <div style={{fontSize:13,color:"rgba(255,255,255,.35)",lineHeight:1.6}}>
            Tasks reset at midnight.<br/>Come back tomorrow to keep the streak going.
          </div>
        </div>

        {/* Bottom CTA section */}
        <div style={{padding:"22px 28px 28px"}}>
          <button onClick={onDone} style={{
            width:"100%",padding:"14px",borderRadius:16,border:"none",cursor:"pointer",
            background:"linear-gradient(135deg,#059669,#10b981,#34d399)",
            color:"#fff",fontSize:14,fontWeight:800,fontFamily:"inherit",
            boxShadow:"0 8px 28px rgba(52,211,153,.35), inset 0 1px 0 rgba(255,255,255,.15)",
            letterSpacing:"-.1px",marginBottom:12,
            transition:"all .18s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 10px 36px rgba(52,211,153,.5)";e.currentTarget.style.transform="translateY(-1px)"}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 8px 28px rgba(52,211,153,.35)";e.currentTarget.style.transform=""}}>
            Keep the streak! →
          </button>
          <div style={{fontSize:11,color:"rgba(255,255,255,.2)",textAlign:"center"}}>
            Tap anywhere to dismiss
          </div>
        </div>

      </div>
    </div>
  );
}

function Toast({msg,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2800);return()=>clearTimeout(t);},[]);
  return <div style={{position:"fixed",bottom:"calc(88px + env(safe-area-inset-bottom))",left:"50%",transform:"translateX(-50%)",background:"radial-gradient(ellipse at 50% 0%,#0d2540,#050b14)",border:"1px solid rgba(59,158,255,.3)",color:"#93c5fd",padding:"10px 20px",borderRadius:12,fontWeight:600,fontSize:13,zIndex:9998,whiteSpace:"nowrap",boxShadow:"0 4px 24px rgba(0,0,0,.8), 0 0 16px rgba(59,158,255,.2)"}}>{msg}</div>;
}

const inp={background:"rgba(5,11,20,.9)",border:"1px solid #1e3250",color:TEXT,padding:"10px 14px",borderRadius:10,fontSize:14,fontFamily:"inherit",width:"100%",boxSizing:"border-box",marginBottom:10,outline:"none",boxShadow:"inset 0 2px 8px rgba(0,0,0,.4)"};
const Btn=({children,onClick,variant="primary",size="md",full,style:s={}})=>{
  const vs={
    primary:{background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",border:"1px solid rgba(59,130,246,.5)",boxShadow:"0 4px 16px rgba(37,99,235,.4), inset 0 1px 0 rgba(255,255,255,.15)"},
    secondary:{background:"rgba(13,30,48,.8)",color:TEXT,border:"1px solid #1e3250",boxShadow:"inset 0 1px 0 rgba(255,255,255,.04)"},
    danger:{background:"linear-gradient(135deg,#3d1515,#2d1010)",color:"#f87171",border:"1px solid #5c2020",boxShadow:"0 4px 12px rgba(224,92,75,.2)"},
    ghost:{background:"transparent",color:MUTED,border:"none"}
  };
  const ps={sm:"6px 14px",md:"9px 20px",lg:"12px 30px"};
  return <button onClick={onClick} style={{...vs[variant],padding:ps[size],borderRadius:10,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",width:full?"100%":undefined,...s}}>{children}</button>;
};

// SVG nav icons
const Nav={
  home:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  feed:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  quests:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  events:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  shop:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  ranks:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  bell:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  gear:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  check:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

// ── ULTRA-PREMIUM DAILY LOGIN REWARD MODAL (v9 Dribbble-inspired) ────────────
// Inspired by: Faruk Hossain's WinSphere (64 likes, 9.1k views) — deep purple/dark
//              gaming aesthetic, glowing rewards, spin & win cards
//              Antoine David's Peer.inc Streaks — large numeric day counter
//              Anna Ilyina's Gamification App — clean achievement badges
// Design: Cosmic dark bg with aurora gradients, 3D trophy hero, animated day
//         orbs with particle trails, cinematic reveal phase, streak fire meter

function LoginConfetti(){
  const colors=["#fbbf24","#3b9eff","#ec4899","#06b6d4","#f97316","#34d399","#6366f1","#f59e0b","#fff","#fb923c"];
  const pieces=Array.from({length:56},(_,i)=>({
    x:5+Math.random()*90, delay:Math.random()*.8, dur:1+Math.random()*.9,
    color:colors[i%colors.length], w:3+Math.random()*8, h:3+Math.random()*5,
    dx:(Math.random()-0.5)*180, dy:50+Math.random()*80, rot:Math.random()*720,
    type:Math.random()>.6?"circle":"rect"
  }));
  return(
    <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:800}}>
      <style>{`
        @keyframes cffall2{
          0%{transform:translateY(-20px) translateX(0) rotate(0deg) scale(1);opacity:1}
          80%{opacity:.8}
          100%{transform:translateY(var(--dy)) translateX(var(--dx)) rotate(var(--rot)) scale(.4);opacity:0}
        }
      `}</style>
      {pieces.map((p,i)=>(
        <div key={i} style={{
          position:"absolute",left:`${p.x}%`,top:"5%",
          width:p.w,height:p.h,background:p.color,
          borderRadius:p.type==="circle"?"50%":2,
          "--dy":`${p.dy}vh`,"--dx":`${p.dx}px`,"--rot":`${p.rot}deg`,
          animation:`cffall2 ${p.dur}s ${p.delay}s ease-in forwards`,
          boxShadow:`0 0 6px ${p.color}88`
        }}/>
      ))}
    </div>
  );
}

// Animated star particles floating in background
function StarField(){
  const stars=Array.from({length:24},(_,i)=>({
    x:Math.random()*100,y:Math.random()*100,
    size:1+Math.random()*2.5,delay:Math.random()*4,dur:2.5+Math.random()*3,
    opacity:.2+Math.random()*.5
  }));
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",borderRadius:"inherit"}}>
      <style>{`@keyframes startwinkle{0%,100%{opacity:var(--so);transform:scale(1)}50%{opacity:var(--so2);transform:scale(1.4)}}`}</style>
      {stars.map((s,i)=>(
        <div key={i} style={{
          position:"absolute",left:`${s.x}%`,top:`${s.y}%`,
          width:s.size,height:s.size,borderRadius:"50%",background:"#fff",
          "--so":s.opacity,"--so2":s.opacity*2,
          animation:`startwinkle ${s.dur}s ${s.delay}s ease-in-out infinite`
        }}/>
      ))}
    </div>
  );
}

// Premium 3D trophy icon for jackpot
function TrophyIcon({color="#fbbf24",size=80}){
  return(
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <defs>
        <radialGradient id="trg" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".9"/>
          <stop offset="40%" stopColor={color}/>
          <stop offset="100%" stopColor={color} stopOpacity=".6"/>
        </radialGradient>
        <filter id="trglow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="40" cy="74" rx="18" ry="4" fill={color} opacity=".25"/>
      {/* Cup body */}
      <path d="M26 18 H54 L50 48 Q40 54 30 48 Z" fill="url(#trg)" filter="url(#trglow)"/>
      {/* Handles */}
      <path d="M26 22 C18 22 14 30 18 36 C21 40 26 40 26 40" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M54 22 C62 22 66 30 62 36 C59 40 54 40 54 40" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      {/* Stem */}
      <rect x="36" y="48" width="8" height="12" rx="2" fill={color} opacity=".8"/>
      {/* Base */}
      <rect x="28" y="60" width="24" height="6" rx="3" fill={color}/>
      {/* Star on cup */}
      <polygon points="40,24 42.5,30 49,30 44,34 46,40 40,36 34,40 36,34 31,30 37.5,30" fill="#fff" opacity=".9"/>
      {/* Shine */}
      <ellipse cx="33" cy="26" rx="4" ry="2.5" fill="#fff" opacity=".4" transform="rotate(-20 33 26)"/>
    </svg>
  );
}

// Animated reward orb (for calendar day cells)
function RewardOrb({reward,isDone,isToday,isAlreadyToday,isFuture,size=52}){
  const c=reward.color,g=reward.glow;
  return(
    <div style={{
      width:size,height:size,borderRadius:"50%",position:"relative",display:"flex",
      alignItems:"center",justifyContent:"center",flexShrink:0,
      background:isDone
        ?"linear-gradient(145deg,#1a3a24,#0f2018)"
        :isToday
          ?`radial-gradient(circle at 35% 30%,${c}55,${c}18)`
          :isFuture
            ?"rgba(255,255,255,.04)"
            :`radial-gradient(circle at 35% 30%,${c}33,${c}10)`,
      border:`2px solid ${
        isDone?"#2a5a34"
        :isToday?c
        :isFuture?"rgba(255,255,255,.08)"
        :`${c}55`
      }`,
      boxShadow:isToday?`0 0 20px ${g},0 0 40px ${g},inset 0 0 20px ${g}`
                :isDone?"0 0 8px rgba(52,211,153,.2)"
                :undefined,
      animation:isToday?"loginOrbPulse 2s ease-in-out infinite":undefined,
    }}>
      <style>{`@keyframes loginOrbPulse{0%,100%{box-shadow:0 0 16px var(--oc),0 0 32px var(--oc)}50%{box-shadow:0 0 28px var(--oc),0 0 56px var(--oc),0 0 80px var(--oc)}}`}</style>
      <div style={{"--oc":g}}>
        <div style={{
          fontSize:isDone?18:isToday?reward.jackpot?22:20:isFuture?14:16,
          filter:isDone?"grayscale(.3)":isToday?`drop-shadow(0 0 8px ${c})`
                  :isFuture?"grayscale(1) brightness(.4)":undefined,
          transition:"all .3s"
        }}>
          {isDone?I.check_sm({size:16,color:"#34d399"}):renderIcon(reward.icon,18,reward.color)}
        </div>
      </div>
    </div>
  );
}

function DailyLoginModal({member, onClaim, onClose}){
  // ── Streak & state calculations ───────────────────────────────────────────
  const today     = todayStr();
  const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  const alreadyClaimed = member.lastLoginDate === today;
  const rawStreak = member.loginStreak || 0;
  const isAlive   = member.lastLoginDate === yesterday || alreadyClaimed;
  const effectiveStreak = isAlive ? rawStreak : 0;
  // dayIdx = which day in the 7-cycle we're on (1–7)
  const dayIdx = alreadyClaimed
    ? (effectiveStreak % 7 === 0 ? 7 : effectiveStreak % 7)
    : (effectiveStreak % 7 === 0 ? 1 : (effectiveStreak % 7) + 1);
  const reward = LOGIN_REWARDS[(dayIdx - 1) % 7];
  const [claimed,  setClaimed]  = React.useState(alreadyClaimed);
  const [claiming, setClaiming] = React.useState(false);
  const [showPop,  setShowPop]  = React.useState(false);

  // ── Design tokens ─────────────────────────────────────────────────────────
  const DS = {
    bg:     "#030912",
    surf:   "#070d1c",
    card:   "#0b1528",
    card2:  "#0f1e36",
    bord:   "#162038",
    bord2:  "#1e3052",
    text:   "#e4eeff",
    muted:  "#47607e",
    sub:    "#6a8aaa",
    green:  "#34d399",
    orange: "#f97316",
    blue:   "#3b9eff",
    purple: "#a78bfa",
    gold:   "#fbbf24",
    red:    "#f87171",
  };

  // ── SVG Icon system ───────────────────────────────────────────────────────
  const IC = {
    bolt:     (s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
    fire:     (s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22c5.523 0 8-3 8-7 0-3-2-5-4-6 1 3-1 5-3 5-1.5 0-2.5-1-2.5-1s-1 1-1 3c-2-1-3-3-3-5-2 2-2 4-2 5 0 4 2.5 6 7.5 6z" fill={c} fillOpacity=".2"/>
        <path d="M12 22c5.523 0 8-3 8-7 0-3-2-5-4-6 1 3-1 5-3 5-1.5 0-2.5-1-2.5-1s-1 1-1 3c-2-1-3-3-3-5-2 2-2 4-2 5 0 4 2.5 6 7.5 6z"/>
      </svg>
    ),
    gem:      (s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" fill={c} fillOpacity=".18"/><path d="M2 9h20M6 3l4 6m4 0l4-6M12 22l-4-7m8 0l-4 7m-4-7h8"/>
      </svg>
    ),
    star:     (s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill={c} fillOpacity=".25" stroke={c} strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    trophy:   (s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" fill={c} fillOpacity=".12"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" fill={c} fillOpacity=".12"/>
        <path d="M4 22h16M8 22v-4m8 4v-4M6 2h12v7a6 6 0 0 1-12 0V2z" fill={c} fillOpacity=".15"/>
        <line x1="12" y1="15" x2="12" y2="18"/>
      </svg>
    ),
    crown:    (s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M2 19h20M2 5l5 8 5-5 5 5 5-8v14H2V5z" fill={c} fillOpacity=".18"/>
      </svg>
    ),
    star_glow:(s=20,c="#fff")=>(
      <svg width={s} height={s} viewBox="0 0 24 24">
        <polygon points="12,1 15.5,8.5 24,9.5 17.5,15.5 19.5,24 12,20 4.5,24 6.5,15.5 0,9.5 8.5,8.5" fill={c} stroke={c} strokeWidth="1"/>
        <polygon points="12,5 14.5,10 20,10.5 15.5,14.5 17,20 12,17 7,20 8.5,14.5 4,10.5 9.5,10" fill="#fff" opacity=".4"/>
      </svg>
    ),
    lock:     (s=16,c="#3d5570")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2" fill={c} fillOpacity=".1"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    check:    (s=14,c="#34d399")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20,6 9,17 4,12"/>
      </svg>
    ),
    flame:    (s=16,c="#f97316")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 22c4 0 7-3 7-7 0-2.5-1.5-4-3-5 1 2.5-1 4-2.5 4S11 12 11 12s-1 1-1 2.5C8 13 7 11 7 9c-1.5 1.5-2 3.5-2 5 0 4 2.5 6 7 6z" fillOpacity=".9"/></svg>
    ),
    calendar: (s=16,c="#47607e")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" fill={c} fillOpacity=".1"/>
        <line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
      </svg>
    ),
    arrow_r:  (s=16,c="#47607e")=>(
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
      </svg>
    ),
  };

  // Map icon key → render fn
  const getIC = (key, size=20, color="#fff") => {
    const fn = IC[key] || IC.bolt;
    return fn(size, color);
  };

  // ── Animations CSS ────────────────────────────────────────────────────────
  const HUB_CSS = `
    @keyframes hubIn{from{opacity:0;transform:scale(.88) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes hubOverlayIn{from{opacity:0}to{opacity:1}}
    @keyframes nodeIn{from{opacity:0;transform:scale(.6) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes progressFill{from{width:0}to{width:var(--w)}}
    @keyframes claimPop{0%{transform:scale(0) rotate(-12deg);opacity:0}55%{transform:scale(1.18) rotate(3deg)}80%{transform:scale(.96)}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes xpRise{0%{opacity:0;transform:translateY(0) scale(.5)}40%{opacity:1;transform:translateY(-28px) scale(1.2)}100%{opacity:0;transform:translateY(-70px) scale(1)}}
    @keyframes streakGlow{0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0)}50%{box-shadow:0 0 16px 4px rgba(249,115,22,.35)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes pulseRing{0%{box-shadow:0 0 0 0 var(--rc)}100%{box-shadow:0 0 0 12px transparent}}
    @keyframes barFlow{from{background-position:0% 50%}to{background-position:100% 50%}}
    @keyframes todayBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}70%{transform:translateY(-2px)}}
    @keyframes closeFade{from{opacity:1}to{opacity:0;transform:scale(.92)}}
    .hub-card{animation:hubIn .38s cubic-bezier(.22,1,.36,1) both}
    .hub-overlay{animation:hubOverlayIn .25s ease both}
    .hub-node{animation:nodeIn .3s cubic-bezier(.34,1.56,.64,1) both}
    .hub-bar-fill{animation:progressFill .8s cubic-bezier(.22,1,.36,1) .3s both}
    .hub-claim-pop{animation:claimPop .5s cubic-bezier(.34,1.56,.64,1) both}
    .hub-xp-rise{animation:xpRise .9s ease both}
    .hub-today-bounce{animation:todayBounce 2s ease-in-out infinite .4s}
    .hub-btn:active{transform:scale(.94)!important;filter:brightness(.88)}
    .hub-node-today{animation:pulseRing 1.8s ease-in-out infinite}
  `;

  // ── Countdown to midnight ─────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = React.useState(dailyResetIn());
  React.useEffect(()=>{
    const t = setInterval(()=>setTimeLeft(dailyResetIn()), 30000);
    return ()=>clearInterval(t);
  }, []);

  // ── Streak milestone system ───────────────────────────────────────────────
  const MILESTONES = [
    {day:1,  label:"+10 💎",  icon:"bolt",     color:"#6366f1"},
    {day:3,  label:"+35 💎",  icon:"gem",      color:"#06b6d4"},
    {day:5,  label:"+70 💎",  icon:"trophy",   color:"#ec4899"},
    {day:7,  label:"JACKPOT", icon:"star_glow", color:"#fbbf24"},
    {day:14, label:"+200 💎", icon:"crown",    color:"#f59e0b"},
    {day:30, label:"LEGEND",  icon:"star_glow", color:"#c084fc"},
  ];
  const displayStreak = claimed ? effectiveStreak + (alreadyClaimed ? 0 : 1) : effectiveStreak;
  const nextMilestone = MILESTONES.find(m => m.day > displayStreak);
  const prevMilestone = [...MILESTONES].reverse().find(m => m.day <= displayStreak);
  const milestoneProgress = nextMilestone
    ? (displayStreak - (prevMilestone?.day||0)) / (nextMilestone.day - (prevMilestone?.day||0))
    : 1;

  // ── Login history dots ────────────────────────────────────────────────────
  const history = member.loginHistory || [];
  const last7 = Array.from({length:7},(_,i)=>{
    const d = new Date(Date.now() - (6-i)*86400000).toISOString().slice(0,10);
    return history.includes(d) || (d === today && (claimed || alreadyClaimed));
  });

  // ── Handle claim ─────────────────────────────────────────────────────────
  const handleClaim = () => {
    if(claimed || claiming) return;
    setClaiming(true);
    setTimeout(()=>{
      setClaimed(true);
      setClaiming(false);
      setShowPop(true);
      onClaim(reward);
      setTimeout(()=>setShowPop(false), 1200);
    }, 300);
  };

  // ── Rarity data ───────────────────────────────────────────────────────────
  const RARITY_STYLES = {
    common:    {color:"#94a3b8", bg:"rgba(148,163,184,.1)",  bord:"rgba(148,163,184,.22)"},
    rare:      {color:"#3b9eff", bg:"rgba(59,158,255,.1)",   bord:"rgba(59,158,255,.28)"},
    epic:      {color:"#ec4899", bg:"rgba(236,72,153,.1)",   bord:"rgba(236,72,153,.28)"},
    legendary: {color:"#fbbf24", bg:"rgba(251,191,36,.1)",   bord:"rgba(251,191,36,.35)"},
  };
  const rr = RARITY_STYLES[reward.rarity] || RARITY_STYLES.common;

  return (
    <div className="hub-overlay" style={{
      position:"fixed",inset:0,zIndex:500,
      background:"rgba(2,6,16,.92)",
      backdropFilter:"blur(16px)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:"max(16px,env(safe-area-inset-top)) 16px calc(16px + env(safe-area-inset-bottom))",
      overflowY:"auto",
    }} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <style>{HUB_CSS}</style>

      {/* Diamond pop animation */}
      {showPop&&(
        <div className="hub-xp-rise" style={{
          position:"fixed",top:"35%",left:"50%",transform:"translateX(-50%)",
          fontSize:28,fontWeight:900,color:DS.green,
          textShadow:`0 0 20px ${DS.green}`,
          pointerEvents:"none",zIndex:600,whiteSpace:"nowrap",
        }}>+{reward.xp} <DiamondIcon size={20} color={"#34d399"}/></div>
      )}

      {/* Main card */}
      <div className="hub-card" style={{
        background:`linear-gradient(160deg, #0b1628 0%, #070f1e 50%, #09122a 100%)`,
        border:`1.5px solid ${DS.bord2}`,
        borderRadius:28,
        width:"100%",
        maxWidth:400,
        maxHeight:"90dvh",
        overflowY:"auto",
        scrollbarWidth:"none",
        boxShadow:`0 32px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(59,158,255,.07), inset 0 1px 0 rgba(255,255,255,.05)`,
        position:"relative",
        overflow:"hidden",
      }}>
        {/* Ambient glow top */}
        <div style={{position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",
          width:280,height:200,
          background:`radial-gradient(ellipse, ${reward.color}22 0%, transparent 70%)`,
          pointerEvents:"none"}}/>

        <div style={{padding:"28px 24px 24px",position:"relative"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            {/* Close button */}
            <button onClick={onClose} style={{
              position:"absolute",top:0,right:0,
              background:"rgba(255,255,255,.05)",border:"none",
              borderRadius:10,width:34,height:34,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              color:DS.muted,fontSize:16,
            }} className="hub-btn">✕</button>

            {/* Label */}
            <div style={{fontSize:10,fontWeight:800,letterSpacing:".2em",
              textTransform:"uppercase",color:DS.muted,marginBottom:10}}>
              Daily Login Reward
            </div>

            {/* Dynamic status */}
            <div style={{fontSize:13,fontWeight:600,color:claimed?DS.green:DS.sub,marginBottom:16}}>
              {claimed ? "See you tomorrow 👋" : "Welcome back!"}
            </div>

            {/* Big day counter */}
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{
                fontSize:72,fontWeight:900,lineHeight:1,
                background:`linear-gradient(135deg,${reward.color},${reward.color}cc)`,
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                letterSpacing:"-3px",
              }}>
                {String(alreadyClaimed ? effectiveStreak : effectiveStreak + 1).padStart(2,"0")}
              </div>
              <div style={{fontSize:11,fontWeight:700,color:DS.muted,marginTop:2,letterSpacing:".05em"}}>
                Days logged in
              </div>
            </div>
          </div>
          <div style={{
            background:"rgba(255,255,255,.03)",border:`1px solid ${DS.bord}`,
            borderRadius:18,padding:"14px 16px",marginBottom:16,
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{
                  width:28,height:28,borderRadius:9,background:"rgba(249,115,22,.14)",
                  border:"1px solid rgba(249,115,22,.3)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  animation:"streakGlow 2s ease-in-out infinite",
                }}>
                  {IC.flame(14, DS.orange)}
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:800,color:DS.text}}>
                    {displayStreak} day streak
                  </div>
                  <div style={{fontSize:10,color:DS.muted}}>
                    {isAlive||claimed ? "Keep it going!" : "Streak reset — start fresh!"}
                  </div>
                </div>
              </div>
              {nextMilestone&&(
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,fontWeight:700,color:nextMilestone.color}}>
                    Day {nextMilestone.day}
                  </div>
                  <div style={{fontSize:9,color:DS.muted}}>next milestone</div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden",marginBottom:8}}>
              <div className="hub-bar-fill" style={{
                height:"100%",borderRadius:4,
                background:`linear-gradient(90deg,${reward.color},${DS.orange})`,
                boxShadow:`0 0 8px ${reward.color}66`,
                "--w":`${Math.min(milestoneProgress*100,100)}%`,
              }}/>
            </div>

            {/* Milestone markers */}
            <div style={{display:"flex",justifyContent:"space-between"}}>
              {MILESTONES.slice(0,4).map((m,mi)=>{
                const passed = displayStreak >= m.day;
                return(
                  <div key={mi} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{
                      width:22,height:22,borderRadius:8,
                      background:passed?`${m.color}25`:"rgba(255,255,255,.04)",
                      border:`1px solid ${passed?m.color+"55":DS.bord}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                    }}>
                      {passed
                        ? IC.check(11, DS.green)
                        : getIC(m.icon,11,passed?m.color:DS.muted)
                      }
                    </div>
                    <div style={{fontSize:8,color:passed?m.color:DS.muted,fontWeight:700}}>D{m.day}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:DS.muted,letterSpacing:".12em",
              textTransform:"uppercase",marginBottom:10}}>
              7-Day Cycle
            </div>
            <div style={{display:"flex",gap:5,justifyContent:"space-between"}}>
              {LOGIN_REWARDS.map((r,i)=>{
                const d = i + 1;
                const isDone  = d < dayIdx || (d === dayIdx && claimed);
                const isToday = d === dayIdx && !claimed;
                const isLocked= d > dayIdx;
                return(
                  <div key={i} className={`hub-node${isToday?" hub-today-bounce":""}`}
                    style={{
                      flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                      animationDelay:`${i*0.05}s`,
                    }}>
                    {/* Circle */}
                    <div style={{
                      width:isToday?46:38,height:isToday?46:38,
                      borderRadius:isToday?15:13,
                      background: isDone
                        ? `linear-gradient(135deg,${r.color}30,${r.color}15)`
                        : isToday
                        ? `linear-gradient(135deg,${r.color}40,${r.color}20)`
                        : "rgba(255,255,255,.03)",
                      border: `${isToday?"2px":"1.5px"} solid ${isDone||isToday?r.color+(isDone?"55":"88"):DS.bord}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow: isToday
                        ? `0 0 20px ${r.color}55, 0 0 40px ${r.color}22, inset 0 1px 0 ${r.color}33`
                        : isDone
                        ? `0 0 8px ${r.color}30`
                        : "none",
                      transition:"all .2s",
                      "--rc":r.color+"55",
                      position:"relative",
                    }} className={isToday?"hub-node-today":""}>
                      {isDone
                        ? <div style={{color:DS.green,display:"flex"}}>{IC.check(13,DS.green)}</div>
                        : isLocked
                        ? IC.lock(13,DS.muted)
                        : getIC(r.icon, isToday?20:16, isToday?r.color:r.color+"99")
                      }
                      {isToday&&(
                        <div style={{position:"absolute",top:-5,right:-5,
                          width:12,height:12,borderRadius:"50%",
                          background:DS.orange,
                          boxShadow:`0 0 8px ${DS.orange}`,
                          fontSize:7,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",
                          fontWeight:800
                        }}>!</div>
                      )}
                    </div>
                    {/* Day label */}
                    <div style={{fontSize:8,fontWeight:isToday?800:600,
                      color:isDone?DS.green:isToday?r.color:DS.muted,
                      letterSpacing:".02em"}}>
                      {isDone ? "✓" : isToday ? "TODAY" : `D${d}`}
                    </div>
                    {/* Diamond amount */}
                    <div style={{fontSize:8,fontWeight:700,
                      color:isLocked?DS.muted:r.color+(isLocked?"55":""),
                      lineHeight:1}}>
                      +{r.xp}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{
            background: claimed
              ? "linear-gradient(135deg,rgba(52,211,153,.08),rgba(52,211,153,.04))"
              : `linear-gradient(135deg,${reward.color}12,${reward.color}06)`,
            border:`1.5px solid ${claimed?DS.green+"30":reward.color+"35"}`,
            borderRadius:20,
            padding:"18px 18px 16px",
            marginBottom:12,
            position:"relative",
            overflow:"hidden",
            boxShadow: claimed
              ? "0 0 30px rgba(52,211,153,.08)"
              : `0 0 30px ${reward.color}12`,
            transition:"all .4s",
          }}>
            {/* Shimmer on unclaimed */}
            {!claimed&&(
              <div style={{position:"absolute",inset:0,
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",
                backgroundSize:"200% 100%",animation:"shimmer 2.5s ease-in-out infinite",
                pointerEvents:"none"}}/>
            )}

            <div style={{display:"flex",alignItems:"center",gap:14}}>
              {/* Reward icon */}
              <div className={claimed?"hub-claim-pop":""} style={{
                width:56,height:56,borderRadius:18,flexShrink:0,
                background: claimed ? "rgba(52,211,153,.14)" : `${reward.color}18`,
                border: `1.5px solid ${claimed?DS.green+"44":reward.color+"44"}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow: claimed
                  ? `0 0 20px rgba(52,211,153,.2)`
                  : `0 0 20px ${reward.color}22, inset 0 1px 0 ${reward.color}22`,
              }}>
                {getIC(reward.icon, 28, claimed ? DS.green : reward.color)}
              </div>

              <div style={{flex:1,minWidth:0}}>
                {/* Rarity */}
                <div style={{display:"inline-flex",alignItems:"center",gap:5,
                  background:rr.bg,border:`1px solid ${rr.bord}`,
                  borderRadius:6,padding:"2px 8px",
                  fontSize:8,fontWeight:800,letterSpacing:".1em",color:rr.color,
                  textTransform:"uppercase",marginBottom:6}}>
                  {reward.rarity}
                </div>
                <div style={{fontSize:10,color:DS.muted,marginBottom:3}}>
                  {claimed ? "Today's reward (claimed)" : "Today's reward"}
                </div>
                <div style={{display:"flex",alignItems:"baseline",gap:5}}>
                  <span style={{fontSize:26,fontWeight:900,
                    color:claimed?DS.green:reward.color,letterSpacing:"-1px"}}>
                    +{reward.xp}
                  </span>
                  <span style={{fontSize:13,fontWeight:700,color:DS.muted}}><DiamondIcon size={18} color={"currentColor"}/></span>
                  <span style={{fontSize:12,fontWeight:600,color:DS.muted}}>·</span>
                  <span style={{fontSize:12,fontWeight:700,color:claimed?DS.green:reward.color}}>
                    {reward.label}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div style={{flexShrink:0}}>
                {claimed ? (
                  <div style={{
                    width:44,height:44,borderRadius:14,
                    background:"rgba(52,211,153,.14)",border:"1.5px solid rgba(52,211,153,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    {IC.check(20,DS.green)}
                  </div>
                ) : (
                  <button onClick={handleClaim} disabled={claiming} className="hub-btn" style={{
                    padding:"11px 18px",borderRadius:14,border:"none",cursor:"pointer",
                    background:`linear-gradient(135deg,${reward.color},${reward.color}cc)`,
                    color:"#fff",fontSize:13,fontWeight:800,fontFamily:"inherit",
                    boxShadow:`0 6px 20px ${reward.color}44`,
                    opacity:claiming?.7:1,
                    transition:"all .2s",
                    whiteSpace:"nowrap",
                  }}>
                    {claiming ? "Claiming..." : "Claim →"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div style={{
            background:"rgba(255,255,255,.03)",border:`1px solid ${DS.bord}`,
            borderRadius:16,padding:"12px 16px",marginBottom:14,
            display:"flex",alignItems:"center",justifyContent:"space-between",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {IC.calendar(16,DS.muted)}
              <div>
                <div style={{fontSize:12,fontWeight:700,color:DS.text}}>
                  Next reward in <span style={{color:DS.blue}}>{timeLeft}</span>
                </div>
                <div style={{fontSize:10,color:DS.muted,marginTop:1}}>
                  Come back for +{LOGIN_REWARDS[dayIdx%7].xp} 💎
                </div>
              </div>
            </div>
            <div style={{fontSize:18,fontWeight:900,color:LOGIN_REWARDS[dayIdx%7].color}}>
              {IC.arrow_r(16,DS.muted)}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <div style={{fontSize:10,fontWeight:700,color:DS.muted,letterSpacing:".12em",textTransform:"uppercase"}}>
              Last 7 days
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              {last7.map((active,i)=>(
                <div key={i} style={{
                  width:active?10:8,height:active?10:8,borderRadius:"50%",
                  background:active?DS.orange:"rgba(255,255,255,.08)",
                  boxShadow:active?`0 0 6px ${DS.orange}88`:"none",
                  transition:"all .3s",
                }}/>
              ))}
            </div>
            {displayStreak >= 3 && (
              <div style={{display:"flex",alignItems:"center",gap:5,
                background:"rgba(249,115,22,.1)",border:"1px solid rgba(249,115,22,.2)",
                borderRadius:20,padding:"4px 12px",
                fontSize:11,fontWeight:700,color:DS.orange}}>
                {IC.flame(12,DS.orange)}
                {displayStreak}-day streak!{displayStreak >= 7 ? " 🔥" : ""}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function GemCrushGame({onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",zIndex:400,padding:"max(16px,env(safe-area-inset-top)) 16px calc(16px + env(safe-area-inset-bottom))"}} onClick={onClose}>
      <div style={{background:"#0d1e30",border:"1px solid #3b9eff44",borderRadius:20,padding:32,textAlign:"center",maxWidth:280}} onClick={e=>e.stopPropagation()}>
        <div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><DiamondIcon size={56} color={"#a78bfa"}/></div>
        <div style={{fontSize:18,fontWeight:900,color:"#ccddef",marginBottom:8}}>GemCrush</div>
        <div style={{fontSize:12,color:"#4a6580",marginBottom:20}}>Coming soon in the next update!</div>
        <button onClick={onClose} style={{background:"#3b9eff",color:"#fff",border:"none",borderRadius:10,padding:"10px 24px",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Close</button>
      </div>
    </div>
  );
}

function RanksModal({byMonth,members,userId,me,setModal,setDetailM}){
  const [ranksTab,setRanksTab]=useState("leaderboard");
  const rankColors=["#fbbf24","#94a3b8","#cd7c3a"];
  return(
  <Modal title="Season Rankings" onClose={()=>setModal(null)} wide>
    {/* Tab switcher */}
    <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,.03)",borderRadius:10,padding:3}}>
      {[{k:"leaderboard",l:"Leaderboard"},{k:"ranks",l:"Rank Tiers"}].map(({k,l})=>(
        <button key={k} onClick={()=>setRanksTab(k)} style={{flex:1,padding:"7px 0",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,
          background:ranksTab===k?"linear-gradient(135deg,#1e40af,#2563eb)":"transparent",
          color:ranksTab===k?"#fff":"rgba(255,255,255,.4)",
          boxShadow:ranksTab===k?"0 2px 12px rgba(37,99,235,.4)":"none"}}>{l}</button>
      ))}
    </div>

    {ranksTab==="leaderboard"&&(<>
      <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:16,textAlign:"center",letterSpacing:"0.12em",textTransform:"uppercase"}}>{monthName(monthStr())} · {members.length} members</div>
      {/* Podium top 3 */}
      {byMonth.length>=3&&(
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:8,marginBottom:20}}>
          {[byMonth[1],byMonth[0],byMonth[2]].map((m,pi)=>{
            const pos=[2,1,3][pi],lv=getLv(m.allTimeXP||0),H=[90,120,72][pi],isMe=m.id===userId;
            const rc=rankColors[pos-1];
            return(
              <div key={m.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}} onClick={()=>{setDetailM(m);setModal("detail");}}>
                <Pfp member={m} size={pos===1?52:38} ring={isMe?ACCENT:rc}/>
                <RankBadge rank={lv} size={pos===1?32:24} glow={pos===1}/>
                <div style={{fontSize:pos===1?11:10,fontWeight:700,color:isMe?ACCENT:TEXT,textAlign:"center",maxWidth:80,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.name.split(" ")[0]}</div>
                <div style={{fontSize:10,fontWeight:800,color:rc,filter:`drop-shadow(0 0 4px ${rc}88)`}}>{m.monthlyXP} <DiamondIcon size={20} color={"#34d399"}/></div>
                <div style={{
                  width:"100%",borderRadius:"10px 10px 0 0",height:H,
                  background:`radial-gradient(ellipse at 50% 0%,${rc}25,rgba(5,11,20,.8))`,
                  border:`1px solid ${rc}40`,borderBottom:"none",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:pos===1?32:24,fontWeight:900,color:rc,
                  boxShadow:`0 0 20px ${rc}25`
                }}>{pos===1?I.crown({size:14,color:"#fbbf24"}):pos===2?I.medal({size:14,rank:2}):I.medal({size:14,rank:3})}</div>
              </div>);
          })}
        </div>
      )}
      {/* Rest of leaderboard */}
      {byMonth.slice(3).map((m,i)=>{
        const lv=getLv(m.allTimeXP||0),isMe=m.id===userId;
        return(
          <div key={m.id} onClick={()=>{setDetailM(m);setModal("detail");}} style={{
            background:isMe?"radial-gradient(ellipse at 0% 50%,rgba(59,158,255,.1),#050b14)":"radial-gradient(ellipse at 0% 50%,rgba(255,255,255,.015),#050b14)",
            border:`1px solid ${isMe?"rgba(59,158,255,.25)":"rgba(255,255,255,.06)"}`,
            borderRadius:12,padding:"10px 12px",display:"flex",alignItems:"center",gap:10,marginBottom:6,cursor:"pointer",
            boxShadow:isMe?"0 0 16px rgba(59,158,255,.1)":"none"
          }}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",fontWeight:700,width:22,textAlign:"center"}}>#{i+4}</div>
            <Pfp member={m} size={34} ring={isMe?ACCENT:lv.color+"66"}/>
            <RankBadge rank={lv} size={22}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:isMe?700:500,fontSize:13,color:isMe?"#93c5fd":TEXT,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.name}{isMe&&<span style={{fontSize:10,color:ACCENT,marginLeft:4}}>(you)</span>}</div>
              <div style={{fontSize:9,color:lv.color,marginTop:1}}>{lv.name}</div>
            </div>
            <div style={{fontWeight:800,color:lv.color,fontSize:13,letterSpacing:"-0.3px",filter:`drop-shadow(0 0 4px ${lv.color}66)`}}>{m.monthlyXP}</div>
          </div>);
      })}
    </>)}

    {ranksTab==="ranks"&&(
      <div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:14,textAlign:"center"}}>Your current rank: <span style={{color:getLv(me?.allTimeXP||0).color,fontWeight:700}}>{getLv(me?.allTimeXP||0).name}</span></div>
        {RANK_TIERS.map((tier,ti)=>{
          const tierRanks=LEVELS.filter(l=>l.tier===tier.tier);
          const myLv=getLv(me?.allTimeXP||0);
          const isCurrentTier=myLv.tier===tier.tier;
          const isPastTier=myLv.tierIdx>ti;
          return(
            <div key={tier.tier} style={{
              background:isCurrentTier?`radial-gradient(ellipse at 0% 50%,${tier.color}12,#050b14)`:"rgba(255,255,255,.015)",
              border:`1px solid ${isCurrentTier?tier.color+"35":"rgba(255,255,255,.06)"}`,
              borderRadius:14,padding:"12px 14px",marginBottom:8,
              boxShadow:isCurrentTier?`0 0 20px ${tier.color}18`:"none"
            }}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                <RankBadge rank={tierRanks[tierRanks.length-1]} size={36} glow={isCurrentTier}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:isPastTier||isCurrentTier?tier.color:"rgba(255,255,255,.4)"}}>{tier.tier}{tier.isLegend&&" ✦"}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.25)",marginTop:1}}>
                    {tier.isLegend?`From ${RANK_XP[ti][0].toLocaleString()} Diamonds`:`${RANK_XP[ti][0].toLocaleString()} – ${(RANK_XP[ti][3]||RANK_XP[ti][0]).toLocaleString()} 💎`}
                  </div>
                </div>
                {isCurrentTier&&<div style={{fontSize:9,fontWeight:700,color:tier.color,background:`${tier.color}15`,border:`1px solid ${tier.color}30`,borderRadius:6,padding:"2px 8px"}}>YOU ARE HERE</div>}
                {isPastTier&&<div style={{fontSize:12}}>{I.check_sm({size:14,color:"#34d399"})}</div>}
              </div>
              {/* Division row */}
              <div style={{display:"flex",gap:4}}>
                {tierRanks.map(r=>{
                  const isMyRank=r.l===myLv.l;
                  const isPast=r.l<myLv.l;
                  return(
                    <div key={r.div} style={{flex:1,textAlign:"center",padding:"6px 4px",borderRadius:8,
                      background:isMyRank?`${tier.color}20`:isPast?`${tier.color}08`:"rgba(255,255,255,.02)",
                      border:`1px solid ${isMyRank?tier.color+"55":isPast?tier.color+"20":"rgba(255,255,255,.05)"}`
                    }}>
                      <RankBadge rank={r} size={isMyRank?28:22}/>
                      <div style={{fontSize:8,color:isMyRank?tier.color:isPast?tier.color+"88":"rgba(255,255,255,.2)",fontWeight:isMyRank?700:400,marginTop:3}}>{r.div}</div>
                      <div style={{fontSize:7,color:"rgba(255,255,255,.2)",marginTop:1}}>{r.xp.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </Modal>);
}

// ── Diamond SVG icon — game-style colored gem ──────────────────────────
const DiamondIcon = ({size=20, color="#34d399", style={}}) => (
  <svg width={size} height={size} viewBox="0 0 32 36" fill="none"
    style={{display:"inline-block",verticalAlign:"middle",flexShrink:0,...style}}>
    <defs>
      <linearGradient id="di-a" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b8f4ff"/>
        <stop offset="100%" stopColor="#22d3ee"/>
      </linearGradient>
      <linearGradient id="di-b" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8"/>
        <stop offset="100%" stopColor="#0369a1"/>
      </linearGradient>
      <linearGradient id="di-c" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9"/>
        <stop offset="100%" stopColor="#0c4a6e"/>
      </linearGradient>
      <linearGradient id="di-d" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9"/>
        <stop offset="100%" stopColor="#0891b2"/>
      </linearGradient>
    </defs>
    {/* Left top crown */}
    <polygon points="16,1 4,12 16,15"   fill="url(#di-a)"/>
    {/* Right top crown */}
    <polygon points="16,1 28,12 16,15"  fill="url(#di-b)" fillOpacity=".9"/>
    {/* Left pavilion */}
    <polygon points="4,12 16,15 16,35"  fill="url(#di-c)"/>
    {/* Right pavilion */}
    <polygon points="28,12 16,15 16,35" fill="url(#di-b)" fillOpacity=".85"/>
    {/* Belt face */}
    <polygon points="4,12 16,15 28,12"  fill="url(#di-d)" fillOpacity=".7"/>
    {/* Left bright specular */}
    <polygon points="7,12 12,13 9,18"   fill="white" fillOpacity=".5"/>
    {/* Top specular */}
    <polygon points="16,2 19,8 16,10"   fill="white" fillOpacity=".65"/>
    {/* Small top-right glint */}
    <polygon points="22,10 25,11 23,13" fill="white" fillOpacity=".3"/>
    {/* Crisp outline */}
    <polygon points="16,1 28,12 16,35 4,12"
      fill="none" stroke="rgba(255,255,255,.25)" strokeWidth=".8" strokeLinejoin="round"/>
    {/* Belt line */}
    <line x1="4" y1="12" x2="28" y2="12"
      stroke="rgba(255,255,255,.2)" strokeWidth=".8"/>
  </svg>
);

export default function App(){
  const KEY="ixp_";
  const fileRef=useRef();

  const [members,    setMembers]    = useState(DEFAULT_MEMBERS);
  const [quests,     setQuests]     = useState(DEFAULT_QUESTS);
  const [feed,       setFeed]       = useState(DEFAULT_FEED);
  const [challenges, setChallenges] = useState(DEFAULT_CHALLENGES);
  const [polls,      setPolls]      = useState(DEFAULT_POLLS);
  const [events,     setEvents]     = useState(DEFAULT_EVENTS);
  const [rewards,    setRewards]    = useState(DEFAULT_REWARDS);
  const [daily,      setDaily]      = useState(DEFAULT_DAILY);
  const [notifs,     setNotifs]     = useState([]);
  const [seasons,    setSeasons]    = useState([]);

  const [userId,  setUserId]  = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab,     setTab]     = useState("home");
  const [toast,   setToast]   = useState(null);
  const [modal,   setModal]   = useState(null);
  const [xpPop,   setXpPop]   = useState(null);
  const [lvlUp,   setLvlUp]   = useState(null);
  const [badgeUnlock, setBadgeUnlock] = useState(null);
  const [allTasksDone, setAllTasksDone] = useState(false);
  const [showLoginReward, setShowLoginReward] = useState(false);
  const [showGemCrush,    setShowGemCrush]    = useState(false);
  const [detailM, setDetailM] = useState(null);
  const [historyM,setHistoryM]= useState(null);

  // form state
  const [loginName,setLoginName]=useState(""); const [loginPass,setLoginPass]=useState(""); const [loginErr,setLoginErr]=useState("");
  const [adminPin, setAdminPin] =useState(""); const [pinErr,   setPinErr]   =useState(false);
  const [newName,  setNewName]  =useState(""); const [newPw,    setNewPw]    =useState("");
  const [xpTarget, setXpTarget] =useState(""); const [xpAmount, setXpAmount] =useState(50); const [xpReason,setXpReason]=useState("");
  const [qTarget,  setQTarget]  =useState(""); const [selQuest, setSelQuest] =useState("");
  const [postText, setPostText] =useState("");
  const [editName, setEditName] =useState(""); const [editPw,   setEditPw]   =useState(""); const [editPwNew,setEditPwNew]=useState(""); const [editErr,setEditErr]=useState("");
  const [nQ, setNQ]=useState({title:"",desc:"",xp:50,icon:"bolt",category:"General"});
  const [nCh,setNCh]=useState({title:"",desc:"",xp:100,icon:"target",days:7});
  const [nPo,setNPo]=useState({question:"",options:["",""]});
  const [nEv,setNEv]=useState({title:"",date:"",time:"",location:"",desc:"",icon:"calendar"});
  const [nRw,setNRw]=useState({title:"",desc:"",cost:100,icon:"gift",stock:5});
  const [nDt,setNDt]=useState({title:"",desc:"",xp:15});
  const [editDtId,setEditDtId]=useState(null);
  const [editDt,setEditDt]=useState({title:"",desc:"",xp:15});
  const [adminTab,setAdminTab]=useState("analytics");
  const [autoRules,setAutoRules]=useState([]);
  const [nRule,setNRule]=useState({questId:"",trigger:"xp_gte",value:100,label:""});


  const notify=msg=>setToast(msg);
  const addNotif=(uid,msg,icon="sparkle")=>setNotifs(prev=>[{id:"n"+Date.now(),userId:uid,msg,icon,read:false,ts:Date.now()},...(prev||[]).slice(0,49)]);
  const saveM=v=>{setMembers(v);storeSet(KEY+"members",v);}; const saveQ=v=>{setQuests(v);storeSet(KEY+"quests",v);};
  const saveF=v=>{setFeed(v);storeSet(KEY+"feed",v);}; const saveCh=v=>{setChallenges(v);storeSet(KEY+"challenges",v);};
  const savePo=v=>{setPolls(v);storeSet(KEY+"polls",v);}; const saveEv=v=>{setEvents(v);storeSet(KEY+"events",v);};
  const saveRw=v=>{setRewards(v);storeSet(KEY+"rewards",v);}; const saveNo=v=>{setNotifs(v);storeSet(KEY+"notifs",v);};
  const saveSe=v=>{setSeasons(v);storeSet(KEY+"seasons",v);};
  const saveDa=v=>{setDaily(v);storeSet(KEY+"daily",v);};
  const saveAR=v=>{setAutoRules(v);storeSet(KEY+"autorules",v);};
  const fin=arr=>finalizeAll(arr);

  useEffect(()=>{
    let cancelled=false;
    (async()=>{
      try{
        const m=await storeGet(KEY+"members"),q=await storeGet(KEY+"quests"),f=await storeGet(KEY+"feed");
        const ch=await storeGet(KEY+"challenges"),po=await storeGet(KEY+"polls"),ev=await storeGet(KEY+"events");
        const rw=await storeGet(KEY+"rewards"),no=await storeGet(KEY+"notifs"),se=await storeGet(KEY+"seasons");
        const da=await storeGet(KEY+"daily");
        const ar=await storeGet(KEY+"autorules");
        const uid=await storeGet(KEY+"userId"),lsm=await storeGet(KEY+"lastMonth");
        if(cancelled)return;
        const cur=monthStr(); let lM=m||DEFAULT_MEMBERS;
        if(lsm&&lsm!==cur){
          const sorted=[...lM].sort((a,b)=>b.monthlyXP-a.monthlyXP),winner=sorted[0];
          const ns={month:lsm,label:monthName(lsm),top3:sorted.slice(0,3).map(x=>({id:x.id,name:x.name,xp:x.monthlyXP,photo:x.photo})),totalXP:lM.reduce((s,x)=>s+x.monthlyXP,0)};
          lM=lM.map(x=>({...x,monthlyXP:0,questsDone:[],dailyDone:{},badges:x.id===winner?.id&&!x.badges.includes("champ_season")?[...x.badges,"champ_season"]:x.badges,xpHistory:[{ts:Date.now(),amount:0,reason:`Season ended. You finished #${sorted.findIndex(s=>s.id===x.id)+1} for ${monthName(lsm)}.`,icon:"calendar"},...(x.xpHistory||[])]}));
          const newSe=[ns,...(se||[])]; setSeasons(newSe); storeSet(KEY+"seasons",newSe);
          const fPost={id:"f"+Date.now(),type:"announcement",author:"System",authorId:"system",content:`${monthName(lsm)} season wrapped. Champion: ${winner?.name} with ${winner?.monthlyXP} 💎.`,timestamp:Date.now(),reactions:{},pinned:true};
          const nf=[fPost,...(f||DEFAULT_FEED)]; setFeed(nf); storeSet(KEY+"feed",nf);
          storeSet(KEY+"lastMonth",cur);
        } else { if(f)setFeed(f); if(se)setSeasons(se); if(!lsm)storeSet(KEY+"lastMonth",cur); }
        setMembers(fin(lM)); if(q)setQuests(q); if(ch)setChallenges(ch); if(po)setPolls(po);
        if(ev)setEvents(ev); if(rw)setRewards(rw); if(no)setNotifs(no);
        if(da)setDaily(da);
        if(ar)setAutoRules(ar);
        if(uid)setUserId(uid); else setModal("login");
      } catch { setModal("login"); }
    })();
    return()=>{cancelled=true;};
  },[]);

  const me=members.find(m=>m.id===userId);
  const byMonth=[...members].sort((a,b)=>b.monthlyXP-a.monthlyXP);
  const myRank=byMonth.findIndex(m=>m.id===userId)+1;
  const availXP=me?(me.allTimeXP||0)-(me.spentXP||0):0;
  const todayDone=me?.dailyDone?.[todayStr()]||[];
  const unread=(notifs||[]).filter(n=>n.userId===userId&&!n.read).length;

  const awardXPWithEffects=(membersArr,uid,amt,reason,icon)=>{
    const before=membersArr.find(m=>m.id===uid);
    const beforeLv=getLv(before?.allTimeXP||0);
    let u=giveXP(membersArr,uid,amt,reason,icon);
    const after=u.find(m=>m.id===uid);
    const afterLv=getLv(after?.allTimeXP||0);
    setXpPop(amt);
    if(afterLv.l>beforeLv.l) setTimeout(()=>setLvlUp(afterLv),600);
    return fin(u);
  };

  const handleLogin=()=>{
    const mbr=members.find(m=>m.name.toLowerCase().startsWith(loginName.toLowerCase().trim()));
    if(!mbr){setLoginErr("Member not found");return;}
    if(mbr.password!==loginPass){setLoginErr("Wrong password");return;}
    setUserId(mbr.id); storeSet(KEY+"userId",mbr.id);
    setModal(null); setLoginName(""); setLoginPass(""); setLoginErr("");
    notify(`Hey ${mbr.name.split(" ")[0]}`);
    // Show daily login reward modal after brief delay
    setTimeout(()=>setShowLoginReward(true),500);
  };

  // Called when user claims the daily login reward
  const handleLoginRewardClaim=(reward)=>{
    if(!me&&!userId)return;
    const currentMbr=members.find(m=>m.id===userId);
    if(!currentMbr)return;
    const today=todayStr();
    const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
    if(currentMbr.lastLoginDate===today)return; // already claimed
    const isStreakAlive=currentMbr.lastLoginDate===yesterday;
    const newStreak=(isStreakAlive?(currentMbr.loginStreak||0):0)+1;
    let u=awardXPWithEffects(members,userId,reward.xp,`Day ${newStreak%7||7} login reward`,reward.icon);
    u=u.map(m=>m.id===userId?{...m,loginStreak:newStreak,lastLoginDate:today,loginHistory:[...(m.loginHistory||[]),today].slice(-30)}:m);
    saveM(fin(u));
    addNotif(userId,`Login reward: +${reward.xp} 💎 (Day ${newStreak%7||7})`,reward.icon);
  };



  const handleGemCrushReward=(xpAmount, gcScore, newHiScore)=>{
    if(!me||!userId)return;
    let u=awardXPWithEffects(members,userId,xpAmount,"GemCrush","gem");
    u=u.map(m=>m.id===userId?{...m,
      gemHiScore: Math.max(m.gemHiScore||0, newHiScore||0)
    }:m);
    saveM(fin(u));
    addNotif(userId,`GemCrush: +${xpAmount} 💎 (${gcScore.toLocaleString()} pts)`,"gem");
  };

  const doDaily=taskId=>{
    if(todayDone.includes(taskId))return;
    const t=daily.find(x=>x.id===taskId);
    const prevBadges=new Set(members.find(m=>m.id===userId)?.badges||[]);
    let u=awardXPWithEffects(members,userId,t.xp,t.title,"check");
    const newDone=[...todayDone,taskId];
    u=u.map(m=>m.id!==userId?m:{...m,dailyDone:{...m.dailyDone,[todayStr()]:newDone}});
    const finU=fin(u);
    // Check for first_steps badge unlock
    const newBadges=new Set(finU.find(m=>m.id===userId)?.badges||[]);
    if(!prevBadges.has("first_steps")&&newBadges.has("first_steps")){
      setTimeout(()=>setBadgeUnlock(BADGES.find(b=>b.id==="first_steps")),800);
    }
    saveM(finU);
    addNotif(userId,`+${t.xp} 💎 — ${t.title}`,"check");
    // All tasks done?
    if(newDone.length===daily.length) setTimeout(()=>setAllTasksDone(true),1200);
  };

  const doReact=(pid,emoji)=>saveF(feed.map(p=>{if(p.id!==pid)return p;const prev=p.reactions[emoji]||[];return{...p,reactions:{...p.reactions,[emoji]:prev.includes(userId)?prev.filter(x=>x!==userId):[...prev,userId]}};}));

  const doShoutout=()=>{
    if(!postText.trim())return;
    saveF([{id:"f"+Date.now(),type:"shoutout",author:me.name,authorId:userId,content:postText.trim(),timestamp:Date.now(),reactions:{},pinned:false},...feed]);
    const prevBadges=new Set(me.badges||[]);
    const u=awardXPWithEffects(members,userId,10,"Posted a shoutout","megaphone");
    const withBadge=u.map(m=>m.id===userId?{...m,badges:[...new Set([...m.badges,"social_bee"])]}:m);
    if(!prevBadges.has("social_bee")) setTimeout(()=>setBadgeUnlock(BADGES.find(b=>b.id==="social_bee")),800);
    saveM(withBadge);
    addNotif(userId,"+10 💎 for your shoutout","megaphone");
    setPostText(""); setModal(null);
  };

  const doAnnounce=()=>{ if(!postText.trim())return; saveF([{id:"f"+Date.now(),type:"announcement",author:"Board",authorId:"board",content:postText.trim(),timestamp:Date.now(),reactions:{},pinned:false},...feed]); setPostText(""); setModal(null); notify("Posted"); };

  const doVote=(pid,oid)=>{
    savePo(polls.map(p=>p.id!==pid?p:{...p,options:p.options.map(o=>({...o,votes:o.id===oid?[...new Set([...o.votes.filter(x=>x!==userId),userId])]:o.votes.filter(x=>x!==userId)}))}));
    if(!me.badges.includes("voter")){
      const u=awardXPWithEffects(members,userId,5,"Voted in a poll","vote");
      saveM(u.map(m=>m.id===userId?{...m,badges:[...m.badges,"voter"]}:m));
      addNotif(userId,"+5 💎 for voting","vote");
      setTimeout(()=>setBadgeUnlock(BADGES.find(b=>b.id==="voter")),800);
    } else notify("Vote updated");
  };

  const doRSVP=evId=>{
    saveEv(events.map(e=>e.id!==evId?e:{...e,rsvp:e.rsvp.includes(userId)?e.rsvp.filter(x=>x!==userId):[...e.rsvp,userId]}));
    const ev=events.find(e=>e.id===evId);
    notify(!ev.rsvp.includes(userId)?"RSVP confirmed":"RSVP removed");
  };

  const doRedeem=rw=>{
    if(availXP<rw.cost){notify("Not enough Diamonds");return;}
    if(rw.stock<=0){notify("Out of stock");return;}
    saveRw(rewards.map(r=>r.id===rw.id?{...r,stock:r.stock-1}:r));
    const prevBadges=new Set(me.badges||[]);
    const withBadge=fin(members.map(m=>m.id===userId?{...m,spentXP:(m.spentXP||0)+rw.cost,badges:[...new Set([...m.badges,"shopper"])]}:m));
    saveM(withBadge);
    saveF([{id:"f"+Date.now(),type:"achievement",author:"System",authorId:"system",content:`${me.name} redeemed "${rw.title}" from the shop.`,timestamp:Date.now(),reactions:{},pinned:false},...feed]);
    addNotif(userId,`Redeemed "${rw.title}" — collect from the board`,rw.icon);
    if(!prevBadges.has("shopper")) setTimeout(()=>setBadgeUnlock(BADGES.find(b=>b.id==="shopper")),400);
    else notify("Redeemed!");
    setModal(null);
  };

  const handlePhotoUpload=e=>{
    const file=e.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{ saveM(fin(members.map(m=>m.id===userId?{...m,photo:ev.target.result}:m))); notify("Photo updated"); };
    reader.readAsDataURL(file);
  };

  const saveProfile=()=>{
    setEditErr(""); if(editName.trim()&&editName.trim().length<2){setEditErr("Name too short");return;}
    if(editPwNew&&!editPw){setEditErr("Enter current password to change it");return;}
    if(editPw&&editPw!==me.password){setEditErr("Wrong current password");return;}
    saveM(fin(members.map(m=>m.id!==userId?m:{...m,name:editName.trim()||m.name,password:editPwNew||m.password})));
    setModal(null); setEditName(""); setEditPw(""); setEditPwNew(""); notify("Saved");
  };

  const adminAwardXP=()=>{
    if(!xpTarget)return;
    const u=fin(giveXP(members,xpTarget,Number(xpAmount),xpReason||"Board award","sparkle"));
    saveM(u); addNotif(xpTarget,`Board gave you +${xpAmount} Diamonds`+(xpReason?" — "+xpReason:""),"sparkle");
    const name=members.find(m=>m.id===xpTarget)?.name;
    setModal(null); setXpAmount(50); setXpTarget(""); setXpReason(""); notify(`+${xpAmount} 💎 → ${name}`);
  };

  const adminQuestDone=()=>{
    if(!selQuest||!qTarget)return;
    const q=quests.find(x=>x.id===selQuest);
    if(members.find(m=>m.id===qTarget)?.questsDone?.includes(selQuest)){notify("Already done");return;}
    let u=giveXP(members,qTarget,q.xp,`Quest: ${q.title}`,q.icon);
    u=u.map(m=>m.id===qTarget?{...m,questsDone:[...(m.questsDone||[]),selQuest]}:m);
    saveM(fin(u)); const name=members.find(m=>m.id===qTarget)?.name;
    saveF([{id:"f"+Date.now(),type:"achievement",author:"System",authorId:"system",content:`${name} completed "${q.title}" (+${q.xp} 💎)`,timestamp:Date.now(),reactions:{},pinned:false},...feed]);
    addNotif(qTarget,`Quest "${q.title}" done! +${q.xp} Diamonds`,q.icon);
    setModal(null); setSelQuest(""); setQTarget(""); notify("Quest done");
  };

  const adminChallDone=(chId,mId)=>{
    const ch=challenges.find(c=>c.id===chId);
    if(!ch||ch.completedBy.includes(mId)){notify("Already done");return;}
    saveCh(challenges.map(c=>c.id===chId?{...c,completedBy:[...c.completedBy,mId]}:c));
    let u=giveXP(members,mId,ch.xp,`Challenge: ${ch.title}`,ch.icon);
    u=u.map(m=>m.id===mId?{...m,badges:[...new Set([...m.badges,"challenger"])]}:m);
    saveM(fin(u)); const name=members.find(m=>m.id===mId)?.name;
    saveF([{id:"f"+Date.now(),type:"achievement",author:"System",authorId:"system",content:`${name} completed "${ch.title}" (+${ch.xp} 💎)`,timestamp:Date.now(),reactions:{},pinned:false},...feed]);
    addNotif(mId,`Challenge "${ch.title}" done! +${ch.xp} Diamonds`,ch.icon);
    notify("Done"); setModal(null);
  };

  // ── Auto-assign engine ───────────────────────────────────────────────────────
  const runAutoAssign=()=>{
    if(!autoRules.length||!quests.length)return;
    let updated=[...members]; let assigned=0;
    autoRules.forEach(rule=>{
      const q=quests.find(x=>x.id===rule.questId&&x.active);
      if(!q)return;
      updated=updated.map(m=>{
        if((m.questsDone||[]).includes(rule.questId))return m;
        let match=false;
        if(rule.trigger==="xp_gte"&&(m.allTimeXP||0)>=Number(rule.value))match=true;
        if(rule.trigger==="streak_gte"&&(m.streak||0)>=Number(rule.value))match=true;
        if(rule.trigger==="badges_gte"&&(m.badges||[]).length>=Number(rule.value))match=true;
        if(rule.trigger==="monthly_gte"&&(m.monthlyXP||0)>=Number(rule.value))match=true;
        if(!match)return m;
        assigned++;
        addNotif(m.id,`New quest assigned: "${q.title}" — ${rule.label||"You qualify!"}`,q.icon||"target");
        return m;
      });
    });
    if(assigned>0){saveM(fin(updated));notify(`Auto-assigned ${assigned} quest(s)`);}
    else notify("No new assignments triggered");
  };

  const doSeasonReset=()=>{
    const cur=monthStr(),sorted=[...members].sort((a,b)=>b.monthlyXP-a.monthlyXP),winner=sorted[0];
    const ns={month:cur,label:monthName(cur),top3:sorted.slice(0,3).map(x=>({id:x.id,name:x.name,xp:x.monthlyXP,photo:x.photo})),totalXP:members.reduce((s,x)=>s+x.monthlyXP,0)};
    saveSe([ns,...seasons]);
    saveM(members.map(x=>({...x,monthlyXP:0,questsDone:[],dailyDone:{},badges:x.id===winner?.id&&!x.badges.includes("champ_season")?[...x.badges,"champ_season"]:x.badges,xpHistory:[{ts:Date.now(),amount:0,reason:`Season ended. You finished #${sorted.findIndex(s=>s.id===x.id)+1} for ${monthName(cur)}.`,icon:"calendar"},...(x.xpHistory||[])]})));
    storeSet(KEY+"lastMonth",monthStr());
    saveF([{id:"f"+Date.now(),type:"announcement",author:"System",authorId:"system",content:`${monthName(cur)} wrapped. Champion: ${winner?.name} with ${winner?.monthlyXP} 💎.`,timestamp:Date.now(),reactions:{},pinned:true},...feed]);
    setModal(null); notify("Season archived");
  };

  const TABS=[
    {id:"home",  label:"Home",   icon:Nav.home},
    {id:"feed",  label:"Feed",   icon:Nav.feed},
    {id:"quests",label:"Quests", icon:Nav.quests},
    {id:"events",label:"Events", icon:Nav.events},
    {id:"shop",  label:"Shop",   icon:Nav.shop},
  ];
  const c={background:CARD,border:`1px solid ${BORD}`,borderRadius:12,padding:"15px 16px",marginBottom:10};

  // Helper: next badge teaser
  const nextBadgeTeaser=()=>{
    if(!me) return null;
    const myB=new Set(me.badges||[]);
    const next=BADGES.find(b=>!myB.has(b.id));
    return next;
  };


  // ── v10 dopamine helpers ─────────────────────────────────────────────────────
  const todayDoneCount = todayDone.length;
  const totalTasks = daily.length;
  const tasksPct = Math.round((todayDoneCount/totalTasks)*100);
  const xpToNext = me ? (getNext(me.allTimeXP||0)?.xp - (me.allTimeXP||0)) : null;
  const rankPct  = me && getNext(me.allTimeXP||0) ? Math.min(99, Math.round(
    ((me.allTimeXP||0) - getLv(me.allTimeXP||0).minXP) /
    ((getNext(me.allTimeXP||0).xp - getLv(me.allTimeXP||0).minXP)) * 100
  )) : 99;
  const lv       = me ? getLv(me.allTimeXP||0) : null;
  const loginStrk= me?.loginStreak||0;
  const todayStr_= todayStr();
  const loginToday = me?.lastLoginDate===todayStr_;

  const nextBadge=(()=>{if(!me)return null;const s=new Set(me.badges||[]);return BADGES.find(b=>!s.has(b.id));})();
  const aheadOf = me ? [...byMonth].reverse().find(m=>m.id!==userId&&m.monthlyXP>(me.monthlyXP||0)) : null;
  const tasksDone= todayDoneCount; const tasksTotal=totalTasks;
  const allDailyDone = todayDoneCount >= totalTasks;


  // ── Shop state ──
  const [shopCat,       setShopCat]       = useState("featured");
  const [shopRedeemed,  setShopRedeemed]  = useState(null);
  const [mysteryOpen,   setMysteryOpen]   = useState(false);
  const [mysteryAnim,   setMysteryAnim]   = useState(false);
  const [mysteryResult, setMysteryResult] = useState(null);
  const MYSTERY_PRIZES = [
    {icon:"⚡",title:"+50 Diamonds!",     sub:"Instant Diamonds — keep grinding!",          xp:50},
    {icon:"💎",title:"+100 Diamonds Jackpot!",  sub:"Rare find — nice one!",                xp:100},
    {icon:"🎖",title:"Rare Badge!",        sub:"Social Bee badge earned!",             xp:0},
    {icon:"🎟",title:"Exclusive Perk!",    sub:"1-day VIP status unlocked!",           xp:0},
    {icon:"⭐",title:"+75 Diamonds!",      sub:"Mystery rewarded you well!",           xp:75},
  ];
  const DAILY_REWARDS = React.useMemo(()=>{
    const seed = new Date().toDateString();
    const seeded = [...rewards].sort((a,b)=>(a.id+seed).length-(b.id+seed).length);
    return seeded.filter(r=>!r.isMystery).slice(0,3).map(r=>({...r,cost:Math.round(r.cost*.8)}));
  },[rewards]);
  const RARITY_META = {
    common:    {label:"Common",    color:"#94a3b8", glow:"rgba(148,163,184,.3)",  bg:"rgba(148,163,184,.08)",  border:"rgba(148,163,184,.2)"},
    rare:      {label:"Rare",      color:"#3b9eff", glow:"rgba(59,158,255,.35)",  bg:"rgba(59,158,255,.1)",    border:"rgba(59,158,255,.3)"},
    epic:      {label:"Epic",      color:"#c084fc", glow:"rgba(192,132,252,.4)",  bg:"rgba(192,132,252,.1)",   border:"rgba(192,132,252,.3)"},
    legendary: {label:"Legendary", color:"#f59e0b", glow:"rgba(251,191,36,.5)",   bg:"rgba(251,191,36,.1)",    border:"rgba(251,191,36,.35)"},
  };
  const doMysteryBox = () => {
    if(availXP < 100){notify("Need 100 Diamonds to open");return;}
    const prize = MYSTERY_PRIZES[Math.floor(Math.random()*MYSTERY_PRIZES.length)];
    setMysteryOpen(true); setMysteryResult(null);
    // Delay reveal for dramatic effect
    setTimeout(()=>{
      setMysteryResult(prize);
      if(prize.xp>0){
        const u=giveXP(members,userId,prize.xp,"Mystery Box","📦");
        saveM(fin(u)); setXpPop(prize.xp);
      }
      const u2=members.map(m=>m.id!==userId?m:{...m,spentXP:(m.spentXP||0)+100});
      saveM(fin(u2));
    },1600);
  };
  const featuredRw = rewards.find(r=>r.featured) || rewards.find(r=>r.rarity==="legendary") || rewards[0];
  const limitedRws = rewards.filter(r=>r.stock<=10&&!r.isMystery).slice(0,3);
  const shopCss = `
    @keyframes shopGlow{0%,100%{box-shadow:0 0 20px rgba(59,158,255,.15)}50%{box-shadow:0 0 32px rgba(59,158,255,.35)}}
    @keyframes legendaryPulse{0%,100%{box-shadow:0 0 24px rgba(251,191,36,.2),inset 0 1px 0 rgba(251,191,36,.15)}50%{box-shadow:0 0 40px rgba(251,191,36,.45),inset 0 1px 0 rgba(251,191,36,.3)}}
    @keyframes mysteryFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-6px) rotate(1deg)}}
    @keyframes mysteryShake{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(5deg)}}
    @keyframes mysteryReveal{0%{transform:scale(0) rotate(-15deg);opacity:0}60%{transform:scale(1.2) rotate(3deg);opacity:1}80%{transform:scale(.95)}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes redeemPop{0%{transform:scale(0) translateY(20px);opacity:0}60%{transform:scale(1.1) translateY(-4px)}100%{transform:scale(1) translateY(0);opacity:1}}
    @keyframes confettiDrop{0%{transform:translateY(-20px) rotate(0);opacity:1}100%{transform:translateY(80px) rotate(360deg);opacity:0}}
    @keyframes xpWallet{0%,100%{text-shadow:0 0 20px rgba(52,211,153,.4)}50%{text-shadow:0 0 35px rgba(52,211,153,.7)}}
    @keyframes shopCardHover{to{transform:translateY(-2px)}}
    @keyframes limitedPulse{0%,100%{opacity:.7}50%{opacity:1}}
  `;

  return(
    <div style={{minHeight:"100vh",background:BG,color:TEXT,fontFamily:"'Sora',-apple-system,'Segoe UI',Roboto,sans-serif",paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
        body,html{margin:0;padding:0;overscroll-behavior:none}
        ::-webkit-scrollbar{width:2px;height:2px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
        select option{background:#080f1e}
        textarea,input,select,button{font-family:'Sora',-apple-system,sans-serif}
        input[type=date],input[type=time]{color-scheme:dark}

        /* ── iOS input zoom prevention (font-size must be >= 16px) ── */
        input,textarea,select{font-size:16px!important}
        @media (min-width:400px){input,textarea,select{font-size:14px!important}}

        /* ── Safe area insets ── */
        :root{
          --sat:env(safe-area-inset-top);
          --sar:env(safe-area-inset-right);
          --sab:env(safe-area-inset-bottom);
          --sal:env(safe-area-inset-left);
        }

        /* ── Touch targets: min 44px ── */
        button{min-height:36px}
        .tap-target{min-height:44px;min-width:44px}

        /* ── Prevent text selection on UI elements ── */
        button,nav,[role=button]{-webkit-user-select:none;user-select:none}

        /* ── Smooth momentum scrolling on iOS ── */
        .scroll-view{-webkit-overflow-scrolling:touch;overflow-y:auto}

        /* ── Hide scrollbars on mobile tab bars ── */
        .scrollbar-none{scrollbar-width:none;-ms-overflow-style:none}
        .scrollbar-none::-webkit-scrollbar{display:none}

        /* ── Spacing tokens ─────────────── */
        :root{
          --sp-1:4px;--sp-2:8px;--sp-3:12px;--sp-4:16px;
          --sp-5:20px;--sp-6:24px;--sp-8:32px;--sp-10:40px;
          --r-sm:10px;--r-md:14px;--r-lg:18px;--r-xl:22px;--r-2xl:28px;
          --shadow-sm:0 2px 8px rgba(0,0,0,.35);
          --shadow-md:0 6px 24px rgba(0,0,0,.5);
          --shadow-lg:0 12px 48px rgba(0,0,0,.65);
          --shadow-xl:0 24px 72px rgba(0,0,0,.8);
        }

        /* ── Typography ─────────────────── */
        .t-headline{font-size:26px;font-weight:900;letter-spacing:-1px;line-height:1.1}
        .t-section{font-size:15px;font-weight:800;letter-spacing:-.3px}
        .t-card-title{font-size:14px;font-weight:700;letter-spacing:-.2px}
        .t-body{font-size:13px;font-weight:400;line-height:1.55}
        .t-caption{font-size:11px;font-weight:500;letter-spacing:.02em}
        .t-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
        .t-micro{font-size:9px;font-weight:600;letter-spacing:.06em}

        /* ── Button system ──────────────── */
        .btn-primary{
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:12px 20px;border-radius:var(--r-lg);border:none;cursor:pointer;
          background:linear-gradient(135deg,#3b9eff,#60b4ff);color:#fff;
          font-size:13px;font-weight:800;letter-spacing:-.1px;
          box-shadow:0 6px 20px rgba(59,158,255,.35);
          transition:all .18s cubic-bezier(.22,1,.36,1);
          font-family:'Sora',sans-serif;
        }
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(59,158,255,.45)}
        .btn-primary:active{transform:scale(.95);box-shadow:none}
        .btn-secondary{
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:10px 18px;border-radius:var(--r-md);cursor:pointer;
          background:rgba(255,255,255,.05);color:rgba(255,255,255,.7);
          border:1px solid rgba(255,255,255,.1);
          font-size:12px;font-weight:700;
          transition:all .18s;font-family:'Sora',sans-serif;
        }
        .btn-secondary:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18)}
        .btn-secondary:active{transform:scale(.96)}
        .btn-ghost{
          background:none;border:none;cursor:pointer;
          display:inline-flex;align-items:center;justify-content:center;
          transition:opacity .15s;font-family:'Sora',sans-serif;
        }
        .btn-ghost:active{opacity:.6}

        /* ── Card system ────────────────── */
        .card{
          background:#0c1525;border:1px solid #182840;
          border-radius:var(--r-xl);padding:var(--sp-4);
          box-shadow:var(--shadow-sm);
          transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s,border-color .22s;
        }
        .card-interactive:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
        .card-interactive:active{transform:scale(.99)}
        .card-glow-blue:hover{border-color:rgba(59,158,255,.3);box-shadow:0 8px 32px rgba(59,158,255,.12)}
        .card-glow-green:hover{border-color:rgba(52,211,153,.3);box-shadow:0 8px 32px rgba(52,211,153,.1)}
        .card-glow-gold:hover{border-color:rgba(251,191,36,.35);box-shadow:0 8px 32px rgba(251,191,36,.12)}
        .card-glow-purple:hover{border-color:rgba(167,139,250,.3);box-shadow:0 8px 32px rgba(167,139,250,.1)}

        /* ── Input system ───────────────── */
        .input-field{
          width:100%;padding:11px 14px;
          background:#080f1e;border:1.5px solid #182840;
          border-radius:var(--r-md);color:#e4eeff;
          font-size:13px;font-weight:500;outline:none;
          transition:border-color .18s,box-shadow .18s;
          font-family:'Sora',sans-serif;
        }
        .input-field::placeholder{color:#3a5570}
        .input-field:focus{border-color:rgba(59,158,255,.5);box-shadow:0 0 0 3px rgba(59,158,255,.1)}
        select.input-field{cursor:pointer}

        /* ── Badge / pill system ────────── */
        .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        .badge-blue{background:rgba(59,158,255,.12);border:1px solid rgba(59,158,255,.25);color:#3b9eff}
        .badge-green{background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.25);color:#34d399}
        .badge-gold{background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.3);color:#fbbf24}
        .badge-purple{background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.25);color:#a78bfa}
        .badge-red{background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.25);color:#f87171}
        .badge-muted{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#4a6880}

        /* ── Section header ─────────────── */
        .sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .sec-head-title{font-size:14px;font-weight:800;color:#e4eeff;letter-spacing:-.25px;display:flex;align-items:center;gap:7px}
        .sec-head-sub{font-size:11px;color:#47607e;margin-top:2px}
        .sec-head-action{font-size:11px;font-weight:700;color:#3b9eff;cursor:pointer;display:flex;align-items:center;gap:4px}
        .sec-head-action:hover{opacity:.8}

        /* ── Divider ────────────────────── */
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);margin:16px 0}

        /* ── Animations ─────────────────── */
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
        @keyframes slideUp{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes xpPop{0%{opacity:0;transform:translateX(-50%) translateY(0) scale(.6)}40%{opacity:1;transform:translateX(-50%) translateY(-32px) scale(1.1)}100%{opacity:0;transform:translateX(-50%) translateY(-64px) scale(.9)}}
        @keyframes progressFill{from{width:0}to{width:var(--w)}}
        @keyframes rankGlow{0%,100%{box-shadow:0 0 0 0 ${lv?.color||ACCENT}44}50%{box-shadow:0 0 0 8px ${lv?.color||ACCENT}00}}
        @keyframes pulseGlow{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes streakPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @keyframes bellpulse{0%,100%{transform:scale(1)}40%{transform:scale(1.2) rotate(8deg)}}
        @keyframes redeemPop{0%{transform:scale(0) translateY(20px);opacity:0}55%{transform:scale(1.1) translateY(-4px)}100%{transform:scale(1) translateY(0);opacity:1}}
        @keyframes cardIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes xpWallet{0%,100%{text-shadow:0 0 20px rgba(52,211,153,.4)}50%{text-shadow:0 0 35px rgba(52,211,153,.7)}}
        @keyframes walletPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes legendaryPulse{0%,100%{box-shadow:0 0 30px rgba(251,191,36,.25)}50%{box-shadow:0 0 50px rgba(251,191,36,.5)}}
        @keyframes limitedUrgency{0%,100%{opacity:.8}50%{opacity:1}}
        @keyframes mysteryFloat{0%,100%{transform:translateY(0) rotate(-2deg) scale(1)}50%{transform:translateY(-8px) rotate(2deg) scale(1.04)}}
        @keyframes mysteryShake{0%,100%{transform:rotate(0)}15%{transform:rotate(-12deg)}30%{transform:rotate(12deg)}45%{transform:rotate(-7deg)}60%{transform:rotate(7deg)}}
        @keyframes mysteryReveal{0%{transform:scale(0) rotate(-15deg);opacity:0;filter:blur(6px)}55%{transform:scale(1.18) rotate(3deg)}80%{transform:scale(.97)}100%{transform:scale(1) rotate(0);opacity:1;filter:none}}
        @keyframes confettiDrop{0%{transform:translateY(-15px) rotate(0);opacity:1}100%{transform:translateY(80px) rotate(720deg);opacity:0}}
        @keyframes featuredShine{0%{left:-80%}100%{left:130%}}
        @keyframes limitedPulse{0%,100%{opacity:.7}50%{opacity:1}}
        @keyframes shopGlow{0%,100%{box-shadow:0 0 20px rgba(59,158,255,.15)}50%{box-shadow:0 0 40px rgba(59,158,255,.4)}}
        @keyframes shopCardHover{to{transform:translateY(-2px)}}
        @keyframes shopCardIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tabSlide{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes priceGlow{0%,100%{filter:drop-shadow(0 0 4px currentColor)}50%{filter:drop-shadow(0 0 14px currentColor)}}
        @keyframes hubIn{from{opacity:0;transform:scale(.88) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes hubOverlayIn{from{opacity:0}to{opacity:1}}
        @keyframes nodeIn{from{opacity:0;transform:scale(.6) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes claimPop{0%{transform:scale(0) rotate(-12deg);opacity:0}55%{transform:scale(1.18) rotate(3deg)}80%{transform:scale(.96)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes xpRise{0%{opacity:0;transform:translateX(-50%) translateY(0) scale(.6)}35%{opacity:1;transform:translateX(-50%) translateY(-28px) scale(1.15)}100%{opacity:0;transform:translateX(-50%) translateY(-70px)}}
        @keyframes streakGlow{0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0)}50%{box-shadow:0 0 16px 4px rgba(249,115,22,.3)}}
        @keyframes barFlow{from{background-position:0% 50%}to{background-position:100% 50%}}
        @keyframes todayBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}70%{transform:translateY(-2px)}}
        @keyframes pulseRing{0%{box-shadow:0 0 0 0 var(--rc)}100%{box-shadow:0 0 0 12px transparent}}
        @keyframes boxShake{0%,100%{transform:rotate(0) scale(1)}10%{transform:rotate(-14deg) scale(1.08)}20%{transform:rotate(14deg) scale(1.08)}30%{transform:rotate(-10deg) scale(1.05)}40%{transform:rotate(10deg) scale(1.05)}50%{transform:rotate(-6deg)}60%{transform:rotate(6deg)}70%{transform:rotate(-3deg)}80%{transform:rotate(3deg)}90%{transform:rotate(0) scale(1.02)}}
        @keyframes boxFloat{0%,100%{transform:translateY(0) rotate(-3deg) scale(1)}50%{transform:translateY(-14px) rotate(3deg) scale(1.06)}}
        @keyframes crackIn{0%{opacity:0;transform:scale(0) rotate(-20deg)}50%{opacity:1;transform:scale(1.3) rotate(5deg)}70%{transform:scale(.95) rotate(-2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes prizeFloat{0%{opacity:0;transform:translateY(30px) scale(.5)}60%{opacity:1;transform:translateY(-8px) scale(1.1)}100%{transform:translateY(0) scale(1);opacity:1}}
        @keyframes ringExpand{0%{transform:scale(.8);opacity:0}50%{opacity:1}100%{transform:scale(2.2);opacity:0}}
        @keyframes particleFly{0%{transform:translate(0,0) rotate(0) scale(1);opacity:1}100%{transform:translate(var(--px),var(--py)) rotate(720deg) scale(0);opacity:0}}
        @keyframes glowPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes shimmerSlide{0%{left:-80%}100%{left:130%}}

        .tab-in{animation:fadeUp .22s cubic-bezier(.22,1,.36,1) both}
        .card-in{animation:cardIn .25s ease both}
        .bell-pulse{animation:bellpulse 1.6s ease-in-out infinite}
        .btn-press:active{transform:scale(.93)!important;filter:brightness(.85)}
        .shop-card-hover{transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s,border-color .22s}
        .shop-card-hover:hover{transform:translateY(-4px) scale(1.01)}
        .shop-btn-press:active{transform:scale(.93)!important;filter:brightness(.88)}
        .shop-tab-content{animation:tabSlide .2s ease both}
        .hub-card{animation:hubIn .38s cubic-bezier(.22,1,.36,1) both}
        .hub-overlay{animation:hubOverlayIn .25s ease both}
        .hub-node{animation:nodeIn .3s cubic-bezier(.34,1.56,.64,1) both}
        .hub-bar-fill{animation:progressFill .8s cubic-bezier(.22,1,.36,1) .3s both}
        .hub-claim-pop{animation:claimPop .5s cubic-bezier(.34,1.56,.64,1) both}
        .hub-xp-rise{animation:xpRise .9s ease both}
        .hub-today-bounce{animation:todayBounce 2.2s ease-in-out infinite .4s}
        .hub-btn:active{transform:scale(.94)!important;filter:brightness(.88)}
        .hub-node-today{animation:pulseRing 1.8s ease-in-out infinite}

        /* ── Mobile responsive overrides ── */
        @media (max-width:380px){
          .admin-tabs{gap:4px}
          .admin-tabs button{padding:5px 8px;font-size:10px}
        }
        @media (max-width:400px){
          .shop-grid-3{grid-template-columns:repeat(2,1fr)!important}
          .stat-row{flex-direction:column}
        }
        /* ── Active state for touch feel ── */
        button:active{opacity:.82;transform:scale(.97)}
        .btn-primary:active{opacity:1;transform:scale(.95)}
      `}</style>
      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhotoUpload}/>
      <div style={{
        background:"rgba(3,9,18,.95)",
        borderBottom:"1px solid rgba(255,255,255,.06)",
        padding:"env(safe-area-inset-top) 16px 0",
        backdropFilter:"blur(28px)",
        position:"sticky",top:0,zIndex:50,
        boxShadow:"0 1px 24px rgba(0,0,0,.5)",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:640,margin:"0 auto",height:54}}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{
              width:32,height:32,borderRadius:10,
              background:"linear-gradient(135deg,#1a3a6a,#0f2a52)",
              border:"1px solid rgba(59,158,255,.3)",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 4px 12px rgba(59,158,255,.2)",
            }}>
              {I.trophy({size:16,color:"#3b9eff"})}
            </div>
            <div style={{
              fontSize:18,fontWeight:900,letterSpacing:"-0.6px",
              background:"linear-gradient(135deg,#e4eeff,#93c5fd)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            }}>RISELY</div>
          </div>

          {/* Right side */}
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {/* Diamond balance */}
            {me&&(
              <div style={{
                display:"flex",alignItems:"center",gap:6,
                background:"rgba(59,158,255,.1)",border:"1px solid rgba(59,158,255,.22)",
                borderRadius:20,padding:"5px 12px",cursor:"pointer",
              }} onClick={()=>setTab("shop")}>
                <DiamondIcon size={18} color={"#3b9eff"}/>
                <span style={{fontSize:12,fontWeight:800,color:"#3b9eff"}}>{availXP.toLocaleString()}</span>
              </div>
            )}

            {/* Notification bell */}
            <button className="btn-ghost" onClick={()=>setModal("notifs")} style={{
              width:36,height:36,borderRadius:11,
              background:unread>0?"rgba(59,158,255,.1)":"rgba(255,255,255,.04)",
              border:`1px solid ${unread>0?"rgba(59,158,255,.25)":"rgba(255,255,255,.08)"}`,
              color:unread>0?ACCENT:MUTED,position:"relative",
            }} className={`btn-ghost${unread>0?" bell-pulse":""}`}>
              {Nav.bell}
              {unread>0&&(
                <div style={{
                  position:"absolute",top:6,right:6,
                  width:8,height:8,borderRadius:"50%",
                  background:"#f87171",boxShadow:"0 0 8px rgba(248,113,113,.7)",
                }}/>
              )}
            </button>

            {/* Profile / Login */}
            {me ? (
              <button className="btn-ghost" onClick={()=>{setEditName(me.name);setModal("profile");}} style={{
                width:36,height:36,borderRadius:11,padding:3,
                background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",
              }}>
                <Pfp member={me} size={28} ring={lv?.color}/>
              </button>
            ) : (
              <button className="btn-primary" style={{padding:"7px 14px",fontSize:12}} onClick={()=>setModal("login")}>
                Sign in
              </button>
            )}

            {/* Admin */}
            {isAdmin&&(
              <button onClick={()=>setModal("admin")} style={{
                width:36,height:36,borderRadius:11,border:"none",cursor:"pointer",
                background:"linear-gradient(135deg,rgba(59,158,255,.2),rgba(124,58,237,.15))",
                border:"1px solid rgba(59,158,255,.3)",
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>
                {I.gear({size:16,color:ACCENT})}
              </button>
            )}
            {!isAdmin&&(
              <button onClick={()=>setModal("adminLogin")} style={{
                width:36,height:36,borderRadius:11,border:"1px solid rgba(255,255,255,.07)",
                background:"rgba(255,255,255,.03)",cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>
                {I.gear({size:16,color:MUTED})}
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{maxWidth:640,margin:"0 auto",padding:"14px 14px"}} className="tab-in">
        {tab==="home"&&!me&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"72vh",padding:"0 8px",textAlign:"center"}}>
            <div style={{
              width:80,height:80,borderRadius:24,marginBottom:24,
              background:"linear-gradient(135deg,#1a3a6a,#0f2052)",
              border:"1.5px solid rgba(59,158,255,.3)",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 0 40px rgba(59,158,255,.15)",
              animation:"orbFloat 3s ease-in-out infinite",
            }}>
              {I.trophy({size:36,color:"#3b9eff"})}
            </div>
            <div style={{fontSize:32,fontWeight:900,letterSpacing:"-1.5px",color:"#fff",marginBottom:8,lineHeight:1.1}}>
              Welcome to<br/>
              <span style={{background:"linear-gradient(135deg,#93c5fd,#3b9eff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>RISELY</span>
            </div>
            <div style={{fontSize:14,color:MUTED,marginBottom:32,lineHeight:1.65,maxWidth:260}}>
              Earn Diamonds, unlock rewards, climb the leaderboard and compete with your team.
            </div>
            {/* Teaser stats */}
            <div style={{display:"flex",gap:10,marginBottom:32,width:"100%",maxWidth:320}}>
              {[
                {n:members.length,l:"Members",c:ACCENT},
                {n:quests.filter(q=>q.active).length,l:"Quests",c:GREEN},
                {n:rewards.length,l:"Rewards",c:"#a78bfa"},
              ].map(s=>(
                <div key={s.l} style={{flex:1,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"14px 8px",textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:900,color:s.c,letterSpacing:"-0.8px"}}>{s.n}</div>
                  <div style={{fontSize:10,color:MUTED,marginTop:3,fontWeight:600}}>{s.l}</div>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{maxWidth:280,width:"100%"}} onClick={()=>setModal("login")}>
              Get Started →
            </button>
            <div style={{marginTop:10,fontSize:11,color:MUTED}}>Password = your first name</div>
          </div>
        )}
        {tab==="home"&&me&&(()=>{
          const lv_=getLv(me.allTimeXP||0);
          const nxt_=getNext(me.allTimeXP||0);
          const loginStrk_=me.loginStreak||0;
          const loginToday_=me.lastLoginDate===todayStr();
          const rankPct=nxt_?Math.min(99,Math.round(((me.allTimeXP||0)-lv_.xp)/(nxt_.xp-lv_.xp)*100)):99;

          return(
            <div>
              {!loginToday_&&(
                <div onClick={()=>setShowLoginReward(true)} style={{
                  background:"linear-gradient(135deg,#160900,#0f0500,#160a00)",
                  border:"1.5px solid rgba(251,191,36,.4)",
                  borderRadius:20,padding:"14px 18px",marginBottom:12,cursor:"pointer",
                  position:"relative",overflow:"hidden",
                  boxShadow:"0 8px 32px rgba(251,191,36,.12), 0 0 0 1px rgba(251,191,36,.08)",
                  display:"flex",alignItems:"center",gap:14,animation:"cardIn .25s ease",
                }}>
                  <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 10% 50%,rgba(251,191,36,.12),transparent 60%)",pointerEvents:"none"}}/>
                  <div style={{
                    width:48,height:48,borderRadius:15,flexShrink:0,
                    background:"rgba(251,191,36,.1)",border:"1.5px solid rgba(251,191,36,.35)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    animation:"orbFloat 2s ease-in-out infinite",
                    boxShadow:"0 0 20px rgba(251,191,36,.25)",
                  }}>
                    {I.gift({size:24,color:"#fbbf24"})}
                  </div>
                  <div style={{flex:1,zIndex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:"#fbbf24",marginBottom:3}}>
                      Day {(loginStrk_%7)||7} Reward Ready!
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.45)"}}>
                      {loginStrk_>=1?`${loginStrk_}-day streak — keep it going!`:"Tap to claim your daily Diamonds"}
                    </div>
                  </div>
                  <div style={{
                    width:28,height:28,borderRadius:9,
                    background:"rgba(251,191,36,.12)",border:"1px solid rgba(251,191,36,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color:"#fbbf24",fontSize:13,flexShrink:0,
                  }}>→</div>
                </div>
              )}
              <div style={{
                background:`linear-gradient(145deg,${lv_.color}10,#0a1220,#060e1c)`,
                border:`1.5px solid ${lv_.color}30`,
                borderRadius:22,padding:"20px 20px 18px",marginBottom:12,
                position:"relative",overflow:"hidden",
                boxShadow:`0 12px 40px rgba(0,0,0,.55), 0 0 0 1px ${lv_.color}10`,
              }}>
                <div style={{position:"absolute",top:-40,right:-20,width:160,height:160,
                  background:`radial-gradient(circle,${lv_.color}15,transparent 70%)`,pointerEvents:"none"}}/>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                  {/* Avatar with ring */}
                  <div onClick={()=>{setEditName(me.name);setModal("profile");}} style={{position:"relative",cursor:"pointer",flexShrink:0}}>
                    <div style={{
                      width:58,height:58,borderRadius:"50%",
                      background:`conic-gradient(${lv_.color} 0% ${rankPct}%, rgba(255,255,255,.06) ${rankPct}% 100%)`,
                      padding:3,display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:`0 0 20px ${lv_.color}30`,
                    }}>
                      <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"#060e1c",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                        <Pfp member={me} size={48} ring={lv_.color}/>
                      </div>
                    </div>
                    <div style={{position:"absolute",bottom:-2,right:-2}}>
                      <RankBadgeFromXP xp={me.allTimeXP||0} size={22} glow/>
                    </div>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,color:MUTED,marginBottom:2}}>Welcome back</div>
                    <div style={{fontSize:20,fontWeight:900,color:"#fff",letterSpacing:"-.5px",marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{me.name.split(" ")[0]}</div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,
                      background:`${lv_.color}18`,border:`1px solid ${lv_.color}35`,
                      borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:800,color:lv_.color,letterSpacing:".04em"}}>
                      {lv_.name}
                    </div>
                  </div>
                  <div style={{textAlign:"center",flexShrink:0}}>
                    <div style={{fontSize:24,fontWeight:900,color:lv_.color,letterSpacing:"-1px",lineHeight:1}}>#{myRank}</div>
                    <div style={{fontSize:9,color:MUTED,marginTop:3,fontWeight:600}}>SEASON</div>
                  </div>
                </div>
                {/* Diamond progress bar */}
                <div style={{marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)"}}>{(me.allTimeXP||0).toLocaleString()} <DiamondIcon size={20} color={"#34d399"}/></span>
                    {nxt_&&<span style={{fontSize:11,color:MUTED}}>{nxt_.xp.toLocaleString()} <DiamondIcon size={20} color={"#34d399"}/></span>}
                  </div>
                  <div style={{height:6,background:"rgba(255,255,255,.05)",borderRadius:4,overflow:"hidden"}}>
                    <div className="hub-bar-fill" style={{
                      height:"100%",borderRadius:4,"--w":`${rankPct}%`,
                      background:`linear-gradient(90deg,${lv_.color},${lv_.color}cc)`,
                      boxShadow:`0 0 8px ${lv_.color}66`,
                    }}/>
                  </div>
                  {nxt_&&<div style={{fontSize:10,color:MUTED,marginTop:4}}>{nxt_.xp-(me.allTimeXP||0)} <DiamondIcon size={18} color={MUTED}/> to {nxt_.name}</div>}
                </div>
                {/* Stat chips */}
                <div style={{display:"flex",gap:6,marginTop:14}}>
                  {[
                    {l:"Monthly Diamonds",v:(me.monthlyXP||0).toLocaleString(),c:ACCENT},
                    {l:"Streak",v:`${loginStrk_}d`,c:ORANGE,anim:loginStrk_>=3?"streakPulse 1.8s ease-in-out infinite":"none"},
                    {l:"Quests",v:(me.questsDone||[]).length,c:GREEN},
                    {l:"Badges",v:(me.badges||[]).length,c:"#a78bfa"},
                  ].map(s=>(
                    <div key={s.l} style={{flex:1,background:"rgba(255,255,255,.04)",borderRadius:10,padding:"8px 4px",textAlign:"center",animation:s.anim||"none"}}>
                      <div style={{fontSize:15,fontWeight:900,color:s.c,letterSpacing:"-.4px"}}>{s.v}</div>
                      <div style={{fontSize:8,color:MUTED,marginTop:2,fontWeight:600}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {(()=>{
                const todayDone=me.dailyDone?.[todayStr()]||[];
                const allDone=todayDone.length>=daily.length;
                return(
                  <div style={{
                    background:"#0c1525",border:"1px solid #182840",
                    borderRadius:20,marginBottom:12,overflow:"hidden",
                  }}>
                    <div style={{padding:"14px 16px 0"}}>
                      <div className="sec-head">
                        <div>
                          <div className="sec-head-title">
                            {I.bolt({size:15,color:ACCENT})} Daily Tasks
                          </div>
                          <div className="sec-head-sub">{todayDone.length}/{daily.length} completed</div>
                        </div>
                        {allDone&&<div style={{fontSize:11,fontWeight:800,color:GREEN,display:"flex",alignItems:"center",gap:5}}>
                          {I.check({size:14,color:GREEN})} All done!
                        </div>}
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{height:3,background:"rgba(255,255,255,.04)",margin:"0 16px 12px"}}>
                      <div style={{height:"100%",width:`${daily.length>0?(todayDone.length/daily.length)*100:0}%`,
                        background:`linear-gradient(90deg,${ACCENT},${GREEN})`,
                        borderRadius:3,transition:"width .5s ease"}}/>
                    </div>
                    {daily.map((t,ti)=>{
                      const done=todayDone.includes(t.id);
                      return(
                        <div key={t.id} onClick={()=>{if(!done&&me)doDaily(t.id);}}
                          style={{
                            display:"flex",alignItems:"center",gap:12,
                            padding:"12px 16px",
                            borderTop:ti>0?`1px solid rgba(255,255,255,.04)`:"none",
                            cursor:done?"default":"pointer",
                            transition:"background .15s",
                          }}
                          onMouseEnter={e=>{if(!done)e.currentTarget.style.background="rgba(255,255,255,.02)"}}
                          onMouseLeave={e=>e.currentTarget.style.background=""}>
                          <div style={{
                            width:32,height:32,borderRadius:10,flexShrink:0,
                            background:done?"rgba(52,211,153,.1)":"rgba(255,255,255,.04)",
                            border:`1.5px solid ${done?"rgba(52,211,153,.3)":"rgba(255,255,255,.08)"}`,
                            display:"flex",alignItems:"center",justifyContent:"center",
                            transition:"all .2s",
                          }}>
                            {done?I.check({size:14,color:GREEN}):<div style={{width:10,height:10,borderRadius:"50%",border:`1.5px solid rgba(255,255,255,.2)`}}/>}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:13,fontWeight:700,color:done?"rgba(52,211,153,.8)":"#ccddef",marginBottom:2}}>{t.title}</div>
                            <div style={{fontSize:11,color:MUTED}}>{t.desc}</div>
                          </div>
                          <div style={{fontSize:13,fontWeight:900,color:done?"rgba(52,211,153,.6)":ACCENT,flexShrink:0}}>+{t.xp}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              {challenges.filter(c=>c.active&&c.endsAt>Date.now()).length>0&&(
                <div style={{marginBottom:12}}>
                  <div className="sec-head">
                    <div className="sec-head-title">{I.sword({size:15,color:RED})} Active Challenges</div>
                  </div>
                  {challenges.filter(c=>c.active&&c.endsAt>Date.now()).map(ch=>(
                    <div key={ch.id} style={{
                      background:"linear-gradient(135deg,rgba(224,92,75,.08),rgba(251,146,60,.06))",
                      border:"1px solid rgba(224,92,75,.2)",borderRadius:18,
                      padding:"14px 16px",marginBottom:8,
                      display:"flex",alignItems:"center",gap:12,
                    }}>
                      <div style={{width:44,height:44,borderRadius:14,background:"rgba(224,92,75,.1)",
                        border:"1px solid rgba(224,92,75,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {renderIcon(ch.icon||"target",22,RED)||I.target({size:22,color:RED})}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:2}}>{ch.title}</div>
                        <div style={{fontSize:11,color:MUTED,marginBottom:4}}>{ch.desc}</div>
                        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:RED,fontWeight:700}}>
                          <div style={{width:6,height:6,borderRadius:"50%",background:RED,animation:"pulseGlow 1.4s ease-in-out infinite"}}/>
                          {countdown(ch.endsAt)}
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                        <span style={{fontWeight:900,color:ORANGE,fontSize:14}}>+{ch.xp}</span>
                        <DiamondIcon size={18} color={ORANGE}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{background:"#0c1525",border:"1px solid #182840",borderRadius:20,marginBottom:12,overflow:"hidden"}}>
                <div style={{padding:"14px 16px 12px"}}>
                  <div className="sec-head">
                    <div className="sec-head-title">{I.trophy({size:15,color:ORANGE})} Season Rankings</div>
                    <div className="sec-head-action" onClick={()=>setModal("ranks")}>See all →</div>
                  </div>
                </div>
                {byMonth.slice(0,3).map((m_,idx)=>{
                  const isMe_=m_.id===userId;
                  const mlv=getLv(m_.allTimeXP||0);
                  const medals=["🥇","🥈","🥉"];
                  return(
                    <div key={m_.id} onClick={()=>{setDetailM(m_);setModal("detail");}} style={{
                      display:"flex",alignItems:"center",gap:12,
                      padding:"11px 16px",
                      borderTop:"1px solid rgba(255,255,255,.04)",
                      cursor:"pointer",
                      background:isMe_?"rgba(59,158,255,.05)":"transparent",
                      transition:"background .15s",
                    }}
                    onMouseEnter={e=>e.currentTarget.style.background=isMe_?"rgba(59,158,255,.07)":"rgba(255,255,255,.02)"}
                    onMouseLeave={e=>e.currentTarget.style.background=isMe_?"rgba(59,158,255,.05)":"transparent"}>
                      <div style={{width:28,textAlign:"center",fontSize:18}}>{medals[idx]}</div>
                      <Pfp member={m_} size={34} ring={isMe_?ACCENT:mlv.color+"55"}/>
                      <RankBadgeFromXP xp={m_.allTimeXP||0} size={20}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:isMe_?800:600,color:isMe_?"#93c5fd":"#ccddef",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m_.name}</div>
                        <div style={{fontSize:10,color:mlv.color}}>{mlv.name}</div>
                      </div>
                      <div style={{fontWeight:800,fontSize:13,color:mlv.color}}>{(m_.monthlyXP||0).toLocaleString()} <DiamondIcon size={20} color={"#34d399"}/></div>
                    </div>
                  );
                })}
              </div>
              {events.filter(ev=>new Date(ev.date)>=new Date()).slice(0,1).map(ev=>(
                <div key={ev.id} style={{
                  background:"#0c1525",border:"1px solid #182840",
                  borderRadius:20,marginBottom:12,padding:"14px 16px",
                  display:"flex",gap:14,alignItems:"center",
                }}>
                  <div style={{
                    width:48,height:48,borderRadius:14,flexShrink:0,
                    background:"rgba(59,158,255,.1)",border:"1px solid rgba(59,158,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    {I.calendar({size:22,color:ACCENT})}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:9,fontWeight:700,color:MUTED,letterSpacing:".1em",textTransform:"uppercase",marginBottom:3}}>Upcoming Event</div>
                    <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:2}}>{ev.title}</div>
                    <div style={{fontSize:11,color:ACCENT,fontWeight:600}}>{ev.date}{ev.time?` · ${ev.time}`:""}</div>
                  </div>
                  {me&&(
                    <button onClick={e=>{e.stopPropagation();doRSVP(ev.id);}} style={{
                      padding:"8px 14px",borderRadius:12,border:"none",cursor:"pointer",
                      background:(ev.rsvps||[]).includes(userId)?"rgba(52,211,153,.15)":"rgba(59,158,255,.1)",
                      color:(ev.rsvps||[]).includes(userId)?GREEN:ACCENT,
                      fontSize:11,fontWeight:800,fontFamily:"inherit",flexShrink:0,
                      border:`1px solid ${(ev.rsvps||[]).includes(userId)?"rgba(52,211,153,.3)":"rgba(59,158,255,.25)"}`,
                    }}>{(ev.rsvps||[]).includes(userId)?"✓ Going":"RSVP"}</button>
                  )}
                </div>
              ))}
              {(()=>{
                const nb=BADGES.find(b=>!(me.badges||[]).includes(b.id));
                if(!nb) return null;
                return(
                  <div onClick={()=>setModal("badges")} style={{
                    background:"linear-gradient(135deg,rgba(167,139,250,.07),rgba(167,139,250,.04))",
                    border:"1px solid rgba(167,139,250,.18)",
                    borderRadius:18,padding:"13px 16px",marginBottom:12,
                    display:"flex",alignItems:"center",gap:13,cursor:"pointer",
                  }} className="card-interactive">
                    <BadgeIcon id={nb.id} size={44}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:9,fontWeight:700,color:"rgba(167,139,250,.5)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:3}}>Next Badge</div>
                      <div style={{fontSize:13,fontWeight:800,color:"#ddd6fe"}}>{nb.name}</div>
                      <div style={{fontSize:11,color:MUTED,marginTop:1}}>{nb.hint||nb.desc}</div>
                    </div>
                    <div style={{color:"rgba(167,139,250,.4)",fontSize:14}}>→</div>
                  </div>
                );
              })()}

            </div>
          );
        })()}
        {tab==="feed"&&(
          <div>
            {/* Composer */}
            {me&&(
              <div style={{background:"#0c1525",border:"1px solid #182840",borderRadius:20,padding:"14px 16px",marginBottom:12}}>
                <div className="sec-head"><div className="sec-head-title">{I.post({size:15,color:ACCENT})} Share something</div></div>
                <textarea value={postText} onChange={e=>setPostText(e.target.value)}
                  placeholder={isAdmin?"Post an announcement…":"Share a win or hype someone up..."}
                  className="input-field" style={{resize:"none",minHeight:68,marginBottom:10}}/>
                <div style={{display:"flex",gap:8}}>
                  {isAdmin&&(
                    <button className="btn-secondary" style={{flex:1}} onClick={()=>{
                      if(!postText.trim())return;
                      const post={id:"f"+Date.now(),type:"announcement",author:"Board",authorId:"board",content:postText.trim(),timestamp:Date.now(),reactions:{},pinned:false};
                      saveF([post,...feed]);setPostText("");notify("Announced!");
                    }}>📢 Announce</button>
                  )}
                  <button className="btn-primary" style={{flex:1}} onClick={()=>{
                    if(!postText.trim())return;
                    const post={id:"f"+Date.now(),type:isAdmin?"announcement":"post",author:isAdmin?"Board":me.name,authorId:isAdmin?"board":userId,content:postText.trim(),timestamp:Date.now(),reactions:{},pinned:false};
                    saveF([post,...feed]);
                    if(!isAdmin){let u=awardXPWithEffects(members,userId,5,"Posted to feed","heart");saveM(fin(u));}
                    setPostText("");notify("Posted!");
                  }}>Post</button>
                </div>
              </div>
            )}
            {/* Posts */}
            {feed.map(p=>(
              <div key={p.id} style={{
                background:p.type==="announcement"?"linear-gradient(135deg,rgba(59,158,255,.07),rgba(59,158,255,.03))":"#0c1525",
                border:`1px solid ${p.type==="announcement"?"rgba(59,158,255,.2)":p.type==="achievement"?"rgba(52,211,153,.15)":"#182840"}`,
                borderRadius:18,padding:"14px 16px",marginBottom:10,position:"relative",
              }}>
                {p.pinned&&(
                  <div style={{position:"absolute",top:12,right:12,background:"rgba(251,191,36,.12)",border:"1px solid rgba(251,191,36,.25)",borderRadius:6,padding:"2px 8px",fontSize:9,fontWeight:700,color:"#fbbf24",letterSpacing:".06em"}}>📌 PINNED</div>
                )}
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                  {p.authorId!=="system"&&p.authorId!=="board"
                    ?<Pfp member={members.find(m=>m.id===p.authorId)||{name:p.author}} size={36}/>
                    :<div style={{width:36,height:36,borderRadius:11,background:p.type==="announcement"?"rgba(59,158,255,.12)":"rgba(52,211,153,.12)",border:`1px solid ${p.type==="announcement"?"rgba(59,158,255,.25)":"rgba(52,211,153,.25)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {p.type==="announcement"?I.announce({size:18,color:ACCENT}):I.achievement({size:18,color:GREEN})}
                    </div>
                  }
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:p.type==="announcement"?"#93c5fd":"#ccddef"}}>{p.author}</div>
                    <div style={{fontSize:10,color:MUTED,marginTop:1}}>{timeAgo(p.timestamp)}</div>
                  </div>
                  {isAdmin&&<button onClick={()=>saveF(feed.filter(f=>f.id!==p.id))} className="btn-ghost" style={{color:MUTED,fontSize:11,padding:"4px 8px",borderRadius:8,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>✕</button>}
                </div>
                <div style={{fontSize:13,color:"#ccddef",lineHeight:1.6,marginBottom:12}}>{p.content}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {[{key:"heart",label:"❤️"},{key:"fire",label:"🔥"},{key:"clap",label:"👏"},{key:"star",label:"⭐"}].map(r=>{
                    const count=(p.reactions||{})[r.key]||0;
                    const voted=((p.reactions||{})[r.key+"_voters"]||[]).includes(userId);
                    return(
                      <button key={r.key} onClick={()=>{
                        if(!userId)return;
                        const voters=(p.reactions||{})[r.key+"_voters"]||[];
                        const already=voters.includes(userId);
                        saveF(feed.map(f=>f.id!==p.id?f:{...f,reactions:{...(f.reactions||{}),[r.key]:Math.max(0,(f.reactions||{})[r.key]||0)+(already?-1:1),[r.key+"_voters"]:already?voters.filter(v=>v!==userId):[...voters,userId]}}));
                      }} style={{
                        background:voted?"rgba(59,158,255,.12)":"rgba(255,255,255,.04)",
                        border:`1px solid ${voted?"rgba(59,158,255,.3)":"rgba(255,255,255,.07)"}`,
                        borderRadius:20,padding:"5px 11px",cursor:"pointer",
                        color:voted?ACCENT:MUTED,fontSize:12,fontFamily:"inherit",
                        display:"flex",alignItems:"center",gap:5,transition:"all .15s",
                      }}>
                        <span>{r.label}</span>
                        {count>0&&<span style={{fontWeight:700,fontSize:11}}>{count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="quests"&&(
          <div>
            {/* Header + stats */}
            <div style={{background:"#0c1525",border:"1px solid #182840",borderRadius:20,padding:"16px",marginBottom:12}}>
              <div className="sec-head">
                <div className="sec-head-title">{I.target({size:15,color:ACCENT})} Active Quests</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                {[
                  {l:"Quests Done",v:me?.questsDone?.length||0,c:GREEN},
                  {l:"Season Rank",v:`#${myRank}`,c:"#a78bfa"},
                  {l:"Season Diamonds",v:(me?.monthlyXP||0).toLocaleString(),c:ACCENT},
                  {l:"Total Diamonds",v:(me?.allTimeXP||0).toLocaleString(),c:ORANGE},
                ].map(s=>(
                  <div key={s.l} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"12px",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:900,color:s.c,letterSpacing:"-.5px"}}>{s.v}</div>
                    <div style={{fontSize:9,color:MUTED,marginTop:2,textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="divider" style={{margin:"12px 0"}}/>
              <div style={{fontSize:11,color:MUTED}}>Complete quests to earn Diamonds and unlock achievements.</div>
            </div>
            {/* Quest list */}
            {quests.filter(q=>q.active).map(q=>{
              const done=me?.questsDone?.includes(q.id);
              return(
                <div key={q.id} style={{
                  background:"#0c1525",
                  border:`1px solid ${done?"rgba(52,211,153,.2)":"#182840"}`,
                  borderRadius:18,padding:"14px 16px",marginBottom:8,
                  opacity:done?.75:1,
                  transition:"all .2s",
                }}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{
                      width:44,height:44,borderRadius:14,flexShrink:0,
                      background:done?"rgba(52,211,153,.1)":"rgba(255,255,255,.04)",
                      border:`1.5px solid ${done?"rgba(52,211,153,.25)":"rgba(255,255,255,.08)"}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                    }}>
                      {done?I.check({size:20,color:GREEN}):renderIcon(q.icon||"star",20,"#fbbf24")||I.star({size:20,color:"#fbbf24"})}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:800,color:done?"rgba(52,211,153,.8)":"#fff",marginBottom:3}}>{q.title}</div>
                      <div style={{fontSize:11,color:MUTED,lineHeight:1.4}}>{q.desc}</div>
                      {q.category&&(
                        <div style={{marginTop:6,display:"inline-flex",alignItems:"center",background:"rgba(59,158,255,.1)",border:"1px solid rgba(59,158,255,.2)",borderRadius:6,padding:"2px 8px",fontSize:9,fontWeight:700,color:ACCENT,letterSpacing:".08em",textTransform:"uppercase"}}>{q.category}</div>
                      )}
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      {done
                        ?<div style={{fontSize:10,fontWeight:700,color:"rgba(52,211,153,.6)"}}>Done</div>
                        :<div>
                          <div style={{fontSize:18,fontWeight:900,color:GREEN,letterSpacing:"-.5px"}}>+{q.xp}</div>
                          <div style={{fontSize:9,color:MUTED,fontWeight:600}}><DiamondIcon size={18} color={"#34d399"}/></div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
            {quests.filter(q=>q.active).length===0&&(
              <div style={{textAlign:"center",padding:"40px 20px",color:MUTED,background:"#0c1525",border:"1px solid #182840",borderRadius:20}}>
                <div style={{fontSize:32,marginBottom:8}}>{I.target({size:32,color:MUTED})}</div>
                <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>No active quests</div>
                <div style={{fontSize:12}}>Check back soon for new missions</div>
              </div>
            )}
          </div>
        )}
        {tab==="events"&&(
          <div>
            {/* Add event (admin) */}
            {isAdmin&&(
              <div style={{background:"#0c1525",border:"1px solid #182840",borderRadius:20,padding:"14px 16px",marginBottom:12}}>
                <div className="sec-head"><div className="sec-head-title">+ Add Event</div></div>
                {[{ph:"Event title",val:nEv.title,key:"title"},{ph:"Location",val:nEv.location,key:"location"},{ph:"Description",val:nEv.desc,key:"desc"}].map(f=>(
                  <input key={f.key} className="input-field" placeholder={f.ph} value={f.val}
                    onChange={e=>setNEv(d=>({...d,[f.key]:e.target.value}))} style={{marginBottom:8}}/>
                ))}
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <input type="date" className="input-field" value={nEv.date} onChange={e=>setNEv(d=>({...d,date:e.target.value}))} style={{flex:1}}/>
                  <input type="time" className="input-field" value={nEv.time} onChange={e=>setNEv(d=>({...d,time:e.target.value}))} style={{flex:1}}/>
                </div>
                <button className="btn-primary" style={{width:"100%"}} onClick={()=>{
                  if(!nEv.title.trim())return;
                  saveEv([{id:"ev"+Date.now(),...nEv,rsvps:[],icon:"calendar"},...events]);
                  setNEv({title:"",date:"",time:"",location:"",desc:"",icon:"calendar"});notify("Event added");
                }}>Add Event</button>
              </div>
            )}
            {/* Polls */}
            {polls.filter(p=>p.active).map(p=>{
              const total=p.options.reduce((s,o)=>(o.votes||[]).length+s,0);
              const voted=me&&p.options.some(o=>(o.votes||[]).includes(userId));
              return(
                <div key={p.id} style={{background:"#0c1525",border:"1px solid #182840",borderRadius:18,padding:"14px 16px",marginBottom:10}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:12}}>{I.vote({size:14,color:ACCENT})} {p.question}</div>
                  {p.options.map((o,oi)=>{
                    const cnt=(o.votes||[]).length;
                    const pct=total?Math.round(cnt/total*100):0;
                    const myVote=me&&(o.votes||[]).includes(userId);
                    return(
                      <div key={oi} onClick={()=>!voted&&me&&doVote(p.id,o.id)} style={{marginBottom:8,cursor:voted?"default":"pointer"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <span style={{fontSize:12,fontWeight:myVote?700:500,color:myVote?ACCENT:"#ccddef"}}>{o.text||o}</span>
                          {voted&&<span style={{fontSize:11,color:MUTED}}>{pct}%</span>}
                        </div>
                        <div style={{height:6,background:"rgba(255,255,255,.05)",borderRadius:4,overflow:"hidden"}}>
                          {voted&&<div style={{width:`${pct}%`,height:"100%",background:myVote?ACCENT:"rgba(255,255,255,.15)",borderRadius:4,transition:"width .5s ease"}}/>}
                        </div>
                      </div>
                    );
                  })}
                  <div style={{fontSize:10,color:MUTED,marginTop:8}}>{total} vote{total!==1?"s":""}</div>
                </div>
              );
            })}
            {/* Events */}
            {events.length===0&&(
              <div style={{textAlign:"center",padding:"40px 20px",color:MUTED,background:"#0c1525",border:"1px solid #182840",borderRadius:20}}>
                <div style={{marginBottom:8}}>{I.calendar({size:32,color:MUTED})}</div>
                <div style={{fontSize:14,fontWeight:700}}>No events yet</div>
              </div>
            )}
            {events.map(ev=>{
              const going=(ev.rsvps||[]).includes(userId);
              const isPast=ev.date&&new Date(ev.date)<new Date();
              return(
                <div key={ev.id} style={{
                  background:"#0c1525",border:"1px solid #182840",
                  borderRadius:18,padding:"14px 16px",marginBottom:10,opacity:isPast?.6:1,
                }}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:48,height:48,borderRadius:14,flexShrink:0,background:"rgba(59,158,255,.1)",border:"1px solid rgba(59,158,255,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {I.calendar({size:22,color:ACCENT})}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:3}}>{ev.title}</div>
                      {ev.date&&<div style={{fontSize:11,color:ACCENT,fontWeight:600,marginBottom:2}}>{ev.date}{ev.time?` · ${ev.time}`:""}</div>}
                      {ev.location&&<div style={{fontSize:11,color:MUTED,marginBottom:4,display:"flex",alignItems:"center",gap:4}}>{I.pin({size:11,color:MUTED})} {ev.location}</div>}
                      {ev.desc&&<div style={{fontSize:12,color:"rgba(255,255,255,.6)",lineHeight:1.5,marginBottom:10}}>{ev.desc}</div>}
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        {!isPast&&me&&(
                          <button onClick={()=>{
                            const rsvps=ev.rsvps||[];
                            saveEv(events.map(e=>e.id!==ev.id?e:{...e,rsvps:going?rsvps.filter(r=>r!==userId):[...rsvps,userId]}));
                            if(!going){let u=awardXPWithEffects(members,userId,10,"RSVP to event","calendar");saveM(fin(u));}
                          }} style={{
                            background:going?"rgba(52,211,153,.12)":"rgba(59,158,255,.1)",
                            border:`1px solid ${going?"rgba(52,211,153,.3)":"rgba(59,158,255,.25)"}`,
                            borderRadius:10,padding:"7px 14px",cursor:"pointer",
                            color:going?GREEN:ACCENT,fontSize:11,fontWeight:700,fontFamily:"inherit",
                          }}>
                            {going?"✓ Going":"RSVP"}
                          </button>
                        )}
                        {(ev.rsvps?.length>0)&&<span style={{fontSize:10,color:MUTED}}>{ev.rsvps.length} going</span>}
                        {isAdmin&&<button onClick={()=>saveEv(events.filter(e=>e.id!==ev.id))} style={{background:"rgba(224,92,75,.1)",border:"1px solid rgba(224,92,75,.2)",borderRadius:8,padding:"5px 10px",cursor:"pointer",color:"#f87171",fontSize:11,fontFamily:"inherit",marginLeft:"auto"}}>Remove</button>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab==="shop"&&(()=>{
          // ── Icon components (SVG, no emojis) ──────────────────────────────────
          const IconXP = ({size=20,color="#34d399"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color} opacity=".2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 2v15.77M5.82 21.02l6.18-3.25 6.18 3.25" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          );
          const IconGift = ({size=20,color="#a78bfa"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z" fill={color} fillOpacity=".15"/>
              <path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          );
          const IconTrophy = ({size=20,color="#f59e0b"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" fill={color} fillOpacity=".1"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" fill={color} fillOpacity=".1"/>
              <path d="M4 22h16M8 22V18m8 4v-4M6 2h12v7a6 6 0 0 1-12 0V2z" fill={color} fillOpacity=".15"/>
              <path d="M12 15v3" />
            </svg>
          );
          const IconTicket = ({size=20,color="#3b9eff"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
              <path d="M2 9a3 3 0 1 1 0 6V19a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4a3 3 0 1 1 0-6V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" fill={color} fillOpacity=".12"/>
              <path d="M9 12h6M9 9h6M9 15h4" />
            </svg>
          );
          const IconShirt = ({size=20,color="#c084fc"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" fill={color} fillOpacity=".13"/>
            </svg>
          );
          const IconStar = ({size=20,color="#f59e0b"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillOpacity=".2" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          );
          const IconLock = ({size=16,color="#4a6580"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" fill={color} fillOpacity=".1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          );
          const IconClock = ({size=14,color="#f87171"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
            </svg>
          );
          const IconBox = ({size=44,color="#a78bfa"}) => (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c084fc"/><stop offset="100%" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
              <path d="M6 16L24 6l18 10v16L24 42 6 32z" fill="url(#boxGrad)" fillOpacity=".18" stroke={color} strokeWidth="1.5"/>
              <path d="M6 16l18 10 18-10M24 26v16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M15 11l18 10" stroke={color} strokeWidth="1.2" strokeOpacity=".5" strokeLinecap="round"/>
              <circle cx="24" cy="20" r="4" fill={color} fillOpacity=".3"/>
              <path d="M22 20l1.5 1.5L26 18" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          );
          const IconMegaphone = ({size=20,color="#3b9eff"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 11l16-5v12L3 13v-2z" fill={color} fillOpacity=".13"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
              <path d="M19 7c0 0 1 1.5 1 5s-1 5-1 5"/>
            </svg>
          );
          const IconCamera = ({size=20,color="#34d399"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill={color} fillOpacity=".12"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          );
          const IconChair = ({size=20,color="#f59e0b"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 8V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4" fill={color} fillOpacity=".12"/>
              <path d="M18 12H6a2 2 0 0 0-2 2v3h16v-3a2 2 0 0 0-2-2z" fill={color} fillOpacity=".2"/>
              <path d="M4 17v4M20 17v4M8 12V8M16 12V8"/>
            </svg>
          );
          const IconBadge = ({size=20,color="#c084fc"}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
              <circle cx="12" cy="8" r="6" fill={color} fillOpacity=".13"/>
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill={color} fillOpacity=".1"/>
              <circle cx="12" cy="8" r="2.5" fill={color} fillOpacity=".4"/>
            </svg>
          );

          // ── Icon picker by key ──
          const RewardIcon = ({iconKey, size=24, color}) => {
            const map = {
              megaphone: <IconMegaphone size={size} color={color||"#3b9eff"}/>,
              ticket:    <IconTicket    size={size} color={color||"#3b9eff"}/>,
              chair:     <IconChair     size={size} color={color||"#f59e0b"}/>,
              shirt:     <IconShirt     size={size} color={color||"#c084fc"}/>,
              trophy:    <IconTrophy    size={size} color={color||"#f59e0b"}/>,
              bolt:      <IconXP        size={size} color={color||"#34d399"}/>,
              badge:     <IconBadge     size={size} color={color||"#c084fc"}/>,
              camera:    <IconCamera    size={size} color={color||"#34d399"}/>,
              calendar:  <IconChair     size={size} color={color||"#3b9eff"}/>,
              gift:      <IconGift      size={size} color={color||"#a78bfa"}/>,
              "📢":      <IconMegaphone size={size} color={color||"#3b9eff"}/>,
              "🎟":      <IconTicket    size={size} color={color||"#3b9eff"}/>,
              "💼":      <IconChair     size={size} color={color||"#f59e0b"}/>,
              "👕":      <IconShirt     size={size} color={color||"#c084fc"}/>,
              "🏆":      <IconTrophy    size={size} color={color||"#f59e0b"}/>,
              "⚡":      <IconXP        size={size} color={color||"#34d399"}/>,
              "🎖":      <IconBadge     size={size} color={color||"#c084fc"}/>,
              "📸":      <IconCamera    size={size} color={color||"#34d399"}/>,
              "🪑":      <IconChair     size={size} color={color||"#f59e0b"}/>,
              "📦":      <IconGift      size={size} color={color||"#a78bfa"}/>,
            };
            return map[iconKey] || <IconGift size={size} color={color||"#a78bfa"}/>;
          };

          // ── Design tokens ──
          const S = {
            bg:      "#030912",
            surf:    "#080f1e",
            card:    "#0c1525",
            card2:   "#101d30",
            bord:    "#182840",
            bord2:   "#1f3354",
            text:    "#e2eeff",
            muted:   "#4a6880",
            sub:     "#7a9ab8",
            accent:  "#3b9eff",
            green:   "#34d399",
            purple:  "#a78bfa",
            gold:    "#f59e0b",
            red:     "#f87171",
            orange:  "#fb923c",
          };

          const RARITY = {
            common:    {color:"#94a3b8", bg:"rgba(148,163,184,.1)",  bord:"rgba(148,163,184,.22)", label:"COMMON"},
            rare:      {color:"#3b9eff", bg:"rgba(59,158,255,.1)",   bord:"rgba(59,158,255,.28)",  label:"RARE"},
            epic:      {color:"#a78bfa", bg:"rgba(167,139,250,.1)",  bord:"rgba(167,139,250,.3)",  label:"EPIC"},
            legendary: {color:"#f59e0b", bg:"rgba(245,158,11,.1)",   bord:"rgba(245,158,11,.35)",  label:"LEGENDARY"},
          };

          const CATS = [
            {id:"featured",    label:"Featured"},
            {id:"daily",       label:"Daily"},
            {id:"perks",       label:"Perks"},
            {id:"experiences", label:"Experiences"},
            {id:"merch",       label:"Merch"},
            {id:"special",     label:"Special"},
          ];

          const filteredRws = shopCat === "daily"
            ? DAILY_REWARDS
            : shopCat === "featured"
            ? rewards.filter(r=>!r.isMystery)
            : rewards.filter(r => r.cat === shopCat && !r.isMystery);

          const canAffordFn = cost => availXP >= cost;

          // ── Diamond Header ────────────────────────────────────────────────────────
          const XPHeader = () => (
            <div style={{padding:"18px 16px 0"}}>
              <div style={{
                background:"linear-gradient(135deg, #0a1930 0%, #061020 50%, #08152a 100%)",
                border:`1.5px solid rgba(59,158,255,.25)`,
                borderRadius:22,
                padding:"20px 22px 18px",
                position:"relative",
                overflow:"hidden",
                boxShadow:"0 8px 32px rgba(0,0,0,.55), inset 0 1px 0 rgba(59,158,255,.12)",
              }}>
                {/* Animated glow orb */}
                <div style={{position:"absolute",top:-50,right:-30,width:180,height:180,
                  background:"radial-gradient(circle,rgba(59,158,255,.18) 0%,transparent 70%)",
                  animation:"walletPulse 3s ease-in-out infinite",pointerEvents:"none"}}/>
                <div style={{position:"absolute",bottom:-40,left:-20,width:130,height:130,
                  background:"radial-gradient(circle,rgba(52,211,153,.12) 0%,transparent 70%)",
                  animation:"walletPulse 3.5s ease-in-out infinite .5s",pointerEvents:"none"}}/>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",
                  color:S.muted,marginBottom:8,position:"relative"}}>Your Diamond Balance</div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8,position:"relative"}}>
                  <div style={{width:42,height:42,borderRadius:13,
                    background:"rgba(52,211,153,.12)",border:"1px solid rgba(52,211,153,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <DiamondIcon size={24} color={S.green}/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{fontSize:36,fontWeight:900,color:S.green,letterSpacing:"-1.5px",
                      animation:"xpWallet 2.5s ease-in-out infinite"}}>{availXP.toLocaleString()}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"rgba(52,211,153,.55)",display:"flex",alignItems:"center"}}><DiamondIcon size={18} color={"#34d399"}/></div>
                  </div>
                </div>
                <div style={{fontSize:12,color:S.muted,position:"relative"}}>
                  Spend your Diamonds on exclusive club rewards
                </div>
                {/* Decorative line */}
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,
                  background:"linear-gradient(90deg,transparent,rgba(59,158,255,.3),rgba(52,211,153,.3),transparent)"}}/>
              </div>
            </div>
          );

          // ── Category Tabs ─────────────────────────────────────────────────────
          const CategoryTabs = () => (
            <div style={{padding:"14px 16px 4px",overflowX:"auto",scrollbarWidth:"none",display:"flex",gap:6}}>
              {CATS.map(c => {
                const active = shopCat === c.id;
                return (
                  <button key={c.id} onClick={()=>setShopCat(c.id)} style={{
                    flexShrink:0, padding:"7px 16px", borderRadius:30,
                    border: active ? "none" : `1px solid ${S.bord}`,
                    background: active
                      ? "linear-gradient(135deg,#1a3a6a,#0f2a52)"
                      : "rgba(255,255,255,.03)",
                    color: active ? S.accent : S.muted,
                    fontSize:12, fontWeight: active ? 800 : 600,
                    cursor:"pointer", fontFamily:"inherit",
                    boxShadow: active ? `0 0 0 1px rgba(59,158,255,.5), 0 4px 14px rgba(59,158,255,.25)` : "none",
                    transition:"all .2s",
                  }}>{c.label}</button>
                );
              })}
            </div>
          );

          // ── Featured Hero Card ────────────────────────────────────────────────
          const FeaturedCard = () => {
            if (!featuredRw) return null;
            const rr = RARITY[featuredRw.rarity] || RARITY.common;
            const canAfford = canAffordFn(featuredRw.cost);
            const isLegendary = featuredRw.rarity === "legendary";
            return (
              <div style={{padding:"6px 16px 4px"}}>
                <div style={{
                  background: isLegendary
                    ? "linear-gradient(145deg,#1c0e00,#110900,#180d00)"
                    : "linear-gradient(145deg,#0e1630,#09101f,#0d1428)",
                  border: `1.5px solid ${isLegendary ? "rgba(245,158,11,.4)" : "rgba(167,139,250,.35)"}`,
                  borderRadius:24,
                  padding:"24px 22px 20px",
                  position:"relative",
                  overflow:"hidden",
                  boxShadow: isLegendary
                    ? "0 16px 50px rgba(0,0,0,.7), 0 0 60px rgba(245,158,11,.1)"
                    : "0 16px 50px rgba(0,0,0,.65), 0 0 40px rgba(167,139,250,.08)",
                  animation: isLegendary ? "legendaryPulse 3s ease-in-out infinite" : "none",
                  cursor:"pointer",
                  transition:"transform .2s",
                }} className="shop-card-hover">
                  {/* Radial backdrop */}
                  <div style={{position:"absolute",inset:0,pointerEvents:"none",
                    background: isLegendary
                      ? "radial-gradient(ellipse 80% 60% at 50% -5%,rgba(245,158,11,.22) 0%,transparent 65%)"
                      : "radial-gradient(ellipse 80% 60% at 50% -5%,rgba(139,92,246,.2) 0%,transparent 65%)"
                  }}/>
                  {/* Shine sweep */}
                  <div style={{position:"absolute",top:0,bottom:0,width:"50%",
                    background:"linear-gradient(90deg,transparent,rgba(255,255,255,.05),transparent)",
                    animation:"featuredShine 3.5s ease-in-out infinite",
                    pointerEvents:"none",left:"-80%"}}/>
                  {/* Featured tag */}
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,
                    background:isLegendary?"rgba(245,158,11,.14)":"rgba(139,92,246,.14)",
                    border:`1px solid ${isLegendary?"rgba(245,158,11,.35)":"rgba(139,92,246,.35)"}`,
                    borderRadius:20,padding:"3px 11px",
                    fontSize:9,fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",
                    color:isLegendary?S.gold:S.purple,marginBottom:16,position:"relative"}}>
                    <IconStar size={10} color={isLegendary?S.gold:S.purple}/>
                    Featured this week
                  </div>
                  {/* Icon + info row */}
                  <div style={{display:"flex",gap:18,alignItems:"flex-start",position:"relative"}}>
                    {/* Large icon */}
                    <div style={{
                      width:80,height:80,borderRadius:22,flexShrink:0,
                      background: isLegendary ? "rgba(245,158,11,.12)" : "rgba(139,92,246,.12)",
                      border: `1.5px solid ${isLegendary?"rgba(245,158,11,.3)":"rgba(139,92,246,.3)"}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow: isLegendary
                        ? "0 0 30px rgba(245,158,11,.2), inset 0 1px 0 rgba(245,158,11,.1)"
                        : "0 0 20px rgba(139,92,246,.15), inset 0 1px 0 rgba(139,92,246,.1)",
                    }}>
                      <RewardIcon iconKey={featuredRw.icon} size={38}
                        color={isLegendary?S.gold:S.purple}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      {/* Rarity badge */}
                      <div style={{display:"inline-block",background:rr.bg,border:`1px solid ${rr.bord}`,
                        borderRadius:6,padding:"2px 8px",fontSize:9,fontWeight:800,
                        letterSpacing:".1em",color:rr.color,marginBottom:8}}>{rr.label}</div>
                      <div style={{fontSize:22,fontWeight:900,color:"#fff",
                        letterSpacing:"-.5px",marginBottom:5,lineHeight:1.1}}>{featuredRw.title}</div>
                      <div style={{fontSize:12,color:S.sub,lineHeight:1.5,marginBottom:12}}>{featuredRw.desc}</div>
                      {/* Price + CTA */}
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <DiamondIcon size={18} color={canAfford?S.green:S.muted}/>
                          <span style={{fontSize:20,fontWeight:900,
                            color:canAfford?S.green:S.muted,letterSpacing:"-0.5px"}}>{featuredRw.cost.toLocaleString()}</span>
                          <span style={{fontSize:11,color:S.muted,fontWeight:600}}><DiamondIcon size={18} color={"currentColor"}/></span>
                        </div>
                        {me ? (
                          <button onClick={()=>{
                            if(!canAfford){notify("Not enough Diamonds — keep earning!");return;}
                            if(featuredRw.stock===0){notify("Out of stock");return;}
                            doRedeem(featuredRw);setShopRedeemed(featuredRw);
                          }} style={{
                            flex:1,padding:"11px 16px",borderRadius:14,border:"none",
                            cursor:canAfford?"pointer":"not-allowed",fontFamily:"inherit",
                            fontSize:13,fontWeight:800,transition:"all .18s",
                            background: canAfford
                              ? (isLegendary
                                ? "linear-gradient(135deg,#d97706,#b45309)"
                                : "linear-gradient(135deg,#7c3aed,#5b21b6)")
                              : "rgba(255,255,255,.05)",
                            color: canAfford ? "#fff" : S.muted,
                            boxShadow: canAfford
                              ? isLegendary ? "0 6px 22px rgba(217,119,6,.4)" : "0 6px 22px rgba(124,58,237,.4)"
                              : "none",
                          }} className="shop-btn-press">
                            {canAfford ? "Redeem →" : "Need more Diamonds"}
                          </button>
                        ) : (
                          <button onClick={()=>setModal("login")} style={{
                            flex:1,padding:"11px 16px",borderRadius:14,border:`1px solid rgba(59,158,255,.3)`,
                            background:"rgba(59,158,255,.1)",cursor:"pointer",
                            fontFamily:"inherit",fontSize:13,fontWeight:800,color:S.accent,
                          }} className="shop-btn-press">Sign in →</button>
                        )}
                      </div>
                      {featuredRw.stock<=3&&featuredRw.stock>0&&(
                        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:8,
                          fontSize:10,fontWeight:700,color:S.red}}>
                          <IconClock size={12} color={S.red}/>
                          Only {featuredRw.stock} remaining — act fast!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          };

          // ── Mystery Box Card ──────────────────────────────────────────────────
          const MysteryBoxCard = () => (
            <div style={{padding:"6px 16px 4px"}}>
              <div style={{
                background:"linear-gradient(145deg,#0e0720,#070418,#0c0622)",
                border:"1.5px solid rgba(167,139,250,.3)",
                borderRadius:22,padding:"20px 22px",
                position:"relative",overflow:"hidden",
                boxShadow:"0 12px 40px rgba(0,0,0,.6), 0 0 40px rgba(124,58,237,.08)",
                cursor:"pointer",transition:"transform .2s",
              }} className="shop-card-hover" onClick={me?doMysteryBox:()=>setModal("login")}>
                <div style={{position:"absolute",inset:0,pointerEvents:"none",
                  background:"radial-gradient(ellipse 70% 50% at 50% -10%,rgba(124,58,237,.22) 0%,transparent 65%)"}}/>
                {/* Particle dots */}
                {[{t:"18%",l:"12%",s:3,o:.4},{t:"72%",l:"85%",s:5,o:.3},{t:"40%",l:"92%",s:2,o:.5}].map((p,pi)=>(
                  <div key={pi} style={{position:"absolute",top:p.t,left:p.l,
                    width:p.s,height:p.s,borderRadius:"50%",
                    background:"rgba(167,139,250,.6)",opacity:p.o,pointerEvents:"none"}}/>
                ))}
                <div style={{display:"flex",alignItems:"center",gap:18,position:"relative"}}>
                  {/* Animated box icon */}
                  <div style={{
                    width:68,height:68,borderRadius:18,flexShrink:0,
                    background:"rgba(124,58,237,.15)",border:"1.5px solid rgba(167,139,250,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    boxShadow:"0 0 24px rgba(124,58,237,.2)",
                    animation:"mysteryFloat 2.8s ease-in-out infinite",
                  }}>
                    <IconBox size={42} color={S.purple}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div style={{fontSize:17,fontWeight:900,color:"#fff"}}>Mystery Box</div>
                      <div style={{background:"rgba(167,139,250,.15)",border:"1px solid rgba(167,139,250,.3)",
                        borderRadius:6,padding:"2px 7px",fontSize:9,fontWeight:800,
                        letterSpacing:".1em",color:S.purple}}>EPIC</div>
                    </div>
                    <div style={{fontSize:11,color:S.muted,lineHeight:1.5,marginBottom:10}}>
                      Open for a surprise reward. Every box is different.
                    </div>
                    {/* Loot tags */}
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
                      {["+50–100 💎","Rare Badge","Exclusive Perk"].map(tag=>(
                        <div key={tag} style={{
                          background:"rgba(167,139,250,.1)",border:"1px solid rgba(167,139,250,.2)",
                          borderRadius:20,padding:"3px 9px",fontSize:9,fontWeight:700,color:S.purple,
                        }}>{tag}</div>
                      ))}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <DiamondIcon size={18} color={S.purple}/>
                        <span style={{fontSize:18,fontWeight:900,color:S.purple}}>100</span>
                        <span style={{fontSize:11,color:S.muted}}><DiamondIcon size={18} color={"currentColor"}/></span>
                      </div>
                      <button style={{
                        flex:1,padding:"9px 14px",borderRadius:12,border:"none",
                        background:"linear-gradient(135deg,#7c3aed,#5b21b6)",
                        color:"#fff",fontSize:13,fontWeight:800,
                        cursor:"pointer",fontFamily:"inherit",
                        boxShadow:"0 5px 18px rgba(124,58,237,.45)",transition:"all .18s",
                      }} className="shop-btn-press">Open!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          // ── Mystery reveal overlay ─────────────────────────────────────────────

          // ── Redeem success overlay ────────────────────────────────────────────

          // ── Limited Reward Card ───────────────────────────────────────────────
          const LimitedRewardCard = ({r, idx}) => {
            const rr = RARITY[r.rarity] || RARITY.common;
            const canAfford = canAffordFn(r.cost);
            const hoursLeft = 48 - (idx * 11); // staggered urgency
            return (
              <div style={{
                background:S.card,
                border:`1px solid ${S.bord}`,
                borderLeft:`3px solid ${rr.color}`,
                borderRadius:18,padding:"14px 16px",
                display:"flex",alignItems:"center",gap:12,
                transition:"all .2s",position:"relative",overflow:"hidden",
              }} className="shop-card-hover">
                {/* Urgency glow on left border */}
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,
                  background:rr.color,boxShadow:`0 0 12px ${rr.color}`,borderRadius:"3px 0 0 3px"}}/>
                {/* Icon */}
                <div style={{
                  width:50,height:50,borderRadius:14,flexShrink:0,
                  background:rr.bg,border:`1px solid ${rr.bord}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <RewardIcon iconKey={r.icon} size={24} color={rr.color}/>
                </div>
                {/* Info */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                    <div style={{fontWeight:800,fontSize:13,color:S.text,overflow:"hidden",
                      textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</div>
                    <div style={{background:rr.bg,border:`1px solid ${rr.bord}`,
                      borderRadius:5,padding:"1px 6px",fontSize:8,fontWeight:800,
                      letterSpacing:".08em",color:rr.color,flexShrink:0}}>{rr.label}</div>
                  </div>
                  <div style={{fontSize:11,color:S.muted,marginBottom:6,
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.desc}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,
                      fontSize:10,fontWeight:700,color:S.red,
                      animation:"limitedUrgency 2s ease-in-out infinite"}}>
                      <IconClock size={11} color={S.red}/>
                      {hoursLeft}h left
                    </div>
                    <div style={{background:"rgba(245,158,11,.12)",border:"1px solid rgba(245,158,11,.25)",
                      borderRadius:20,padding:"2px 7px",fontSize:10,fontWeight:700,color:S.gold}}>
                      {r.stock} left
                    </div>
                  </div>
                </div>
                {/* Price + CTA */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:7,flexShrink:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <DiamondIcon size={16} color={canAfford?S.green:S.muted}/>
                    <span style={{fontSize:15,fontWeight:900,color:canAfford?S.green:S.muted}}>{r.cost.toLocaleString()}</span>
                  </div>
                  {me ? (
                    <button onClick={()=>{
                      if(!canAfford){notify("Not enough Diamonds");return;}
                      doRedeem(r);setShopRedeemed(r);
                    }} style={{
                      padding:"8px 14px",borderRadius:11,border:`1px solid ${rr.bord}`,
                      cursor:canAfford?"pointer":"not-allowed",fontFamily:"inherit",
                      fontSize:11,fontWeight:800,background:canAfford?rr.bg:"rgba(255,255,255,.03)",
                      color:canAfford?rr.color:S.muted,transition:"all .18s",
                    }} className="shop-btn-press">
                      {r.stock===0?"Sold Out":canAfford?"Redeem":"Need Diamonds"}
                    </button>
                  ) : (
                    <button onClick={()=>setModal("login")} style={{
                      padding:"8px 14px",borderRadius:11,border:`1px solid ${S.bord2}`,
                      cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:800,
                      background:"rgba(255,255,255,.04)",color:S.muted,
                    }} className="shop-btn-press">Sign In</button>
                  )}
                </div>
              </div>
            );
          };

          // ── Reward Grid Card ──────────────────────────────────────────────────
          const RewardCard = ({r}) => {
            const rr = RARITY[r.rarity] || RARITY.common;
            const canAfford = canAffordFn(r.cost);
            return (
              <div style={{
                background:S.card,border:`1px solid ${S.bord}`,borderRadius:20,
                padding:"16px 14px",display:"flex",flexDirection:"column",
                position:"relative",overflow:"hidden",
                transition:"all .22s cubic-bezier(.22,1,.36,1)",
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px) scale(1.01)";e.currentTarget.style.borderColor=rr.bord;e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,0,0,.5), 0 0 24px ${rr.color}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=S.bord;e.currentTarget.style.boxShadow="";}}>
                {/* Rarity top accent */}
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${rr.color}44,${rr.color},${rr.color}44)`}}/>
                {/* Icon */}
                <div style={{
                  width:52,height:52,borderRadius:16,marginBottom:12,
                  background:rr.bg,border:`1px solid ${rr.bord}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <RewardIcon iconKey={r.icon} size={26} color={rr.color}/>
                </div>
                {/* Name + rarity */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                  <div style={{fontWeight:800,fontSize:13,color:S.text,flex:1,paddingRight:6,lineHeight:1.2}}>{r.title}</div>
                  <div style={{background:rr.bg,border:`1px solid ${rr.bord}`,borderRadius:6,
                    padding:"2px 6px",fontSize:8,fontWeight:800,letterSpacing:".08em",
                    color:rr.color,flexShrink:0}}>{rr.label}</div>
                </div>
                {/* Desc */}
                <div style={{fontSize:10,color:S.muted,lineHeight:1.45,marginBottom:12,flex:1}}>{r.desc}</div>
                {/* Footer */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <DiamondIcon size={16} color={canAfford?S.green:S.muted}/>
                    <span style={{fontSize:15,fontWeight:900,color:canAfford?S.green:S.muted}}>{r.cost.toLocaleString()}</span>
                  </div>
                  {me ? (
                    <button onClick={()=>{
                      if(!canAfford){notify("Not enough Diamonds");return;}
                      if(r.stock===0){notify("Out of stock");return;}
                      doRedeem(r);setShopRedeemed(r);
                    }} style={{
                      padding:"8px 13px",borderRadius:11,border:`1px solid ${rr.bord}`,
                      cursor:canAfford&&r.stock>0?"pointer":"not-allowed",fontFamily:"inherit",
                      fontSize:11,fontWeight:800,transition:"all .18s",
                      background:canAfford&&r.stock>0?rr.bg:"rgba(255,255,255,.03)",
                      color:canAfford&&r.stock>0?rr.color:S.muted,
                    }} className="shop-btn-press">
                      {r.stock===0?"Sold Out":canAfford?"Redeem":"Need Diamonds"}
                    </button>
                  ) : (
                    <button onClick={()=>setModal("login")} style={{
                      padding:"8px 13px",borderRadius:11,border:`1px solid ${S.bord2}`,
                      cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:800,
                      background:"rgba(255,255,255,.04)",color:S.muted,
                    }} className="shop-btn-press">Sign In</button>
                  )}
                </div>
                {r.stock<=5&&r.stock>0&&(
                  <div style={{display:"flex",alignItems:"center",gap:4,
                    marginTop:8,fontSize:9,fontWeight:700,color:S.red}}>
                    <IconLock size={10} color={S.red}/>Only {r.stock} left
                  </div>
                )}
              </div>
            );
          };

          // ── Daily Shop Card ───────────────────────────────────────────────────
          const DailyCard = ({r,discounted=false}) => {
            const rr = RARITY[r.rarity]||RARITY.common;
            const finalCost = discounted ? Math.round(r.cost*.8) : r.cost;
            const canAfford = canAffordFn(finalCost);
            return (
              <div style={{
                background:S.card,border:`1px solid ${S.bord}`,borderRadius:16,
                padding:"14px 12px",textAlign:"center",position:"relative",
                overflow:"hidden",cursor:"pointer",transition:"all .2s",
              }} className="shop-card-hover"
              onClick={()=>{
                if(!me){setModal("login");return;}
                if(!canAfford){notify("Not enough Diamonds");return;}
                doRedeem({...r,cost:finalCost});setShopRedeemed({...r,cost:finalCost});
              }}>
                {discounted&&(
                  <div style={{position:"absolute",top:8,right:8,
                    background:S.red,borderRadius:6,padding:"2px 6px",
                    fontSize:8,fontWeight:800,color:"#fff"}}>−20%</div>
                )}
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${rr.color}44,${rr.color},${rr.color}44)`}}/>
                <div style={{width:38,height:38,borderRadius:12,margin:"0 auto 8px",
                  background:rr.bg,border:`1px solid ${rr.bord}`,
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <RewardIcon iconKey={r.icon} size={20} color={rr.color}/>
                </div>
                <div style={{fontSize:10,fontWeight:700,color:S.text,marginBottom:4,lineHeight:1.2}}>{r.title}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                  <DiamondIcon size={14} color={canAfford?S.green:S.muted}/>
                  <span style={{fontSize:12,fontWeight:900,color:canAfford?S.green:S.muted}}>{finalCost}</span>
                </div>
              </div>
            );
          };

          // ── Section header ────────────────────────────────────────────────────
          const SectionHead = ({title,sub,right}) => (
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
              padding:"14px 16px 8px"}}>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:S.text,letterSpacing:"-.2px"}}>{title}</div>
                {sub&&<div style={{fontSize:11,color:S.muted,marginTop:2}}>{sub}</div>}
              </div>
              {right&&<div>{right}</div>}
            </div>
          );

          // ── Daily reset countdown ─────────────────────────────────────────────
          const resetTime = (()=>{const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);const ms=m-n;return `${Math.floor(ms/3600000)}h ${Math.floor((ms%3600000)/60000)}m`;})();

          // ════════════════════════════════════════════════════════════════════
          return (
            <div style={{paddingBottom:8,background:S.bg,minHeight:"100vh"}}>
              <style>{shopCss}</style>


              {/* Diamond Header */}
              <XPHeader/>

              {/* Category Tabs */}
              <CategoryTabs/>
              {shopCat==="featured"&&(
                <div className="shop-tab-content">
                  <FeaturedCard/>
                  {/* Mystery Box */}
                  <MysteryBoxCard/>
                  {/* Limited */}
                  {limitedRws.length>0&&(
                    <>
                      <SectionHead
                        title="🔥 Limited Rewards"
                        sub="Scarcity is real — grab them before they're gone"
                        right={<div style={{fontSize:10,fontWeight:700,color:S.red,
                          display:"flex",alignItems:"center",gap:5,
                          animation:"limitedUrgency 1.5s ease-in-out infinite"}}>
                          <div style={{width:6,height:6,borderRadius:"50%",background:S.red,
                            boxShadow:`0 0 6px ${S.red}`}}/>
                          LIVE
                        </div>}
                      />
                      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:8}}>
                        {limitedRws.map((r,idx)=><LimitedRewardCard key={r.id} r={r} idx={idx}/>)}
                      </div>
                    </>
                  )}
                  {/* Full grid */}
                  <SectionHead
                    title="All Rewards"
                    sub={`${rewards.filter(r=>!r.isMystery).length} items available`}
                  />
                  <div style={{padding:"0 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {rewards.filter(r=>!r.isMystery).map(r=><RewardCard key={r.id} r={r}/>)}
                  </div>
                  <div style={{height:16}}/>
                </div>
              )}
              {shopCat==="daily"&&(
                <div className="shop-tab-content">
                  <div style={{padding:"8px 16px 4px"}}>
                    <div style={{
                      background:"linear-gradient(135deg,#0a1a10,#06120a)",
                      border:"1.5px solid rgba(52,211,153,.25)",borderRadius:18,
                      padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:8,height:8,borderRadius:"50%",background:S.green,
                          boxShadow:`0 0 8px ${S.green}`,animation:"limitedUrgency 1.4s ease-in-out infinite"}}/>
                        <div>
                          <div style={{fontSize:13,fontWeight:800,color:S.text}}>Today's Deals</div>
                          <div style={{fontSize:10,color:S.muted}}>3 rewards · 20% off · today only</div>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:14,fontWeight:800,color:S.accent}}>{resetTime}</div>
                        <div style={{fontSize:9,color:S.muted,marginTop:1}}>until reset</div>
                      </div>
                    </div>
                  </div>
                  <div style={{padding:"4px 16px 0",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                    {DAILY_REWARDS.map(r=><DailyCard key={r.id} r={r} discounted/>)}
                  </div>
                  <div style={{height:16}}/>
                </div>
              )}
              {!["featured","daily"].includes(shopCat)&&(
                <div className="shop-tab-content">
                  {filteredRws.length>0 ? (
                    <>
                      <SectionHead
                        title={CATS.find(c=>c.id===shopCat)?.label||shopCat}
                        sub={`${filteredRws.length} item${filteredRws.length!==1?"s":""} available`}
                      />
                      <div style={{padding:"0 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        {filteredRws.map(r=><RewardCard key={r.id} r={r}/>)}
                      </div>
                    </>
                  ) : (
                    <div style={{textAlign:"center",padding:"60px 20px",color:S.muted}}>
                      <div style={{marginBottom:8}}>
                        <IconLock size={32} color={S.muted}/>
                      </div>
                      <div style={{fontSize:14,fontWeight:700}}>Nothing here yet</div>
                      <div style={{fontSize:12,marginTop:4}}>Check back soon for new rewards</div>
                    </div>
                  )}
                  <div style={{height:16}}/>
                </div>
              )}
            </div>
          );
        })()}

      </div>

      <div style={{
        position:"fixed",bottom:0,left:0,right:0,
        background:"rgba(3,9,18,.96)",
        borderTop:"1px solid rgba(255,255,255,.06)",
        backdropFilter:"blur(28px)",zIndex:50,
        boxShadow:"0 -1px 24px rgba(0,0,0,.5)",
        paddingBottom:"env(safe-area-inset-bottom)",
      }}>
        <div style={{display:"flex",maxWidth:640,margin:"0 auto"}}>
          {[
            {id:"home",   label:"Home",   icon:I.home},
            {id:"feed",   label:"Feed",   icon:I.feed},
            {id:"quests", label:"Quests", icon:I.quests},
            {id:"events", label:"Events", icon:I.events},
            {id:"shop",   label:"Shop",   icon:I.shop},
          ].map(t=>{
            const active=tab===t.id;
            return(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                flex:1,padding:"10px 4px 12px",border:"none",background:"none",
                cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                position:"relative",minHeight:56,
              }}>
                {active&&(
                  <div style={{
                    position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
                    width:28,height:2,borderRadius:"0 0 2px 2px",
                    background:ACCENT,boxShadow:`0 0 12px ${ACCENT}`,
                  }}/>
                )}
                <span style={{
                  opacity:active?1:.38,
                  transition:"opacity .2s",
                  display:"flex",alignItems:"center",
                  filter:active?`drop-shadow(0 0 6px ${ACCENT})`:"none",
                }}>
                  {typeof t.icon==="function"?t.icon({size:22,color:active?ACCENT:MUTED}):t.icon}
                </span>
                <span style={{
                  fontSize:9,fontWeight:active?800:500,
                  color:active?ACCENT:MUTED,letterSpacing:".02em",
                  transition:"color .2s",
                }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LOGIN */}
      {modal==="login"&&(
        <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"16px 16px calc(16px + env(safe-area-inset-bottom))",paddingTop:"max(16px, env(safe-area-inset-top))",backdropFilter:"blur(20px)",background:"rgba(2,6,18,.92)",animation:"fadeIn .22s ease",overflowY:"auto"}}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:"100%",maxWidth:380,borderRadius:28,overflow:"hidden",marginTop:"auto",marginBottom:"auto",
            background:"linear-gradient(170deg,#0b1728 0%,#060e1d 60%,#080e22 100%)",
            border:"1.5px solid rgba(255,255,255,.07)",
            boxShadow:"0 40px 100px rgba(0,0,0,.85), 0 0 0 1px rgba(59,158,255,.06), inset 0 1px 0 rgba(255,255,255,.07)",
            animation:"scaleIn .28s cubic-bezier(.22,1,.36,1)",
          }}>

            {/* Top visual section */}
            <div style={{
              padding:"36px 32px 28px",textAlign:"center",position:"relative",overflow:"hidden",
              background:"linear-gradient(180deg,rgba(59,158,255,.07) 0%,transparent 100%)",
              borderBottom:"1px solid rgba(255,255,255,.05)",
            }}>
              {/* Ambient orbs */}
              <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",width:200,height:140,background:"radial-gradient(ellipse,rgba(59,158,255,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
              <div style={{position:"absolute",bottom:0,left:20,width:80,height:80,background:"radial-gradient(circle,rgba(167,139,250,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
              <div style={{position:"absolute",bottom:0,right:20,width:80,height:80,background:"radial-gradient(circle,rgba(52,211,153,.1) 0%,transparent 70%)",pointerEvents:"none"}}/>

              {/* Logo mark */}
              <div style={{
                width:56,height:56,borderRadius:18,margin:"0 auto 16px",
                background:"linear-gradient(135deg,#1a3a6a,#0f2052)",
                border:"1.5px solid rgba(59,158,255,.35)",
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:"0 8px 32px rgba(59,158,255,.25), inset 0 1px 0 rgba(59,158,255,.2)",
              }}>
                {I.trophy({size:26,color:"#3b9eff"})}
              </div>

              <div style={{fontSize:22,fontWeight:900,letterSpacing:"-0.7px",color:"#fff",marginBottom:6}}>
                Welcome back
              </div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.38)",lineHeight:1.5}}>
                Sign in to track your Diamonds and climb the leaderboard
              </div>
            </div>

            {/* Member avatars row */}
            <div style={{padding:"18px 32px 14px",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.28)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>
                Members
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:8}}>
                {members.slice(0,6).map((m,mi)=>{
                  const isSelected = loginName && m.name.toLowerCase().startsWith(loginName.toLowerCase().trim());
                  return(
                    <div key={m.id} onClick={()=>{setLoginName(m.name.split(" ")[0].toLowerCase());setLoginPass(m.name.split(" ")[0].toLowerCase());setLoginErr("");}}
                      style={{
                        width:42,height:42,borderRadius:14,cursor:"pointer",
                        border:`2px solid ${isSelected?"#3b9eff":m.photo?"transparent":"rgba(255,255,255,.08)"}`,
                        overflow:"hidden",flexShrink:0,position:"relative",
                        background:m.photo?"none":"linear-gradient(135deg,#1a2a4a,#0d1830)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"all .18s",
                        boxShadow:isSelected?"0 0 0 4px rgba(59,158,255,.2), 0 4px 16px rgba(59,158,255,.3)":"0 2px 8px rgba(0,0,0,.4)",
                        transform:isSelected?"scale(1.1)":"scale(1)",
                      }}>
                      {m.photo
                        ?<img src={m.photo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                        :<span style={{fontSize:15,fontWeight:800,color:isSelected?"#3b9eff":"rgba(255,255,255,.5)"}}>{m.name[0].toUpperCase()}</span>
                      }
                      {isSelected&&(
                        <div style={{position:"absolute",inset:0,background:"rgba(59,158,255,.12)",borderRadius:12}}/>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div style={{padding:"22px 28px 28px"}}>

              {/* Name field */}
              <div style={{marginBottom:12}}>
                <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.32)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:7}}>Your Name</div>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.5}}>
                    {I.user({size:15,color:"#4a6880"})}
                  </div>
                  <input
                    autoFocus
                    className="input-field"
                    placeholder="e.g. Sofia"
                    value={loginName}
                    onChange={e=>{setLoginName(e.target.value);setLoginErr("");}}
                    onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                    style={{paddingLeft:36}}
                  />
                </div>
              </div>

              {/* Password field */}
              <div style={{marginBottom:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                  <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.32)",letterSpacing:".12em",textTransform:"uppercase"}}>Password</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.22)"}}>Default: your first name</div>
                </div>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.5}}>
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#4a6880" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={loginPass}
                    onChange={e=>{setLoginPass(e.target.value);setLoginErr("");}}
                    onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                    style={{paddingLeft:36}}
                  />
                </div>
              </div>

              {/* Error */}
              {loginErr&&(
                <div style={{
                  display:"flex",alignItems:"center",gap:8,
                  background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.2)",
                  borderRadius:12,padding:"10px 14px",marginBottom:16,
                  fontSize:12,color:"#f87171",fontWeight:600,
                }}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(248,113,113,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0}}>!</div>
                  {loginErr}
                </div>
              )}

              {/* Submit */}
              <button onClick={handleLogin} style={{
                width:"100%",padding:"14px",borderRadius:16,border:"none",cursor:"pointer",
                background:"linear-gradient(135deg,#1e4d9e,#1a3a7a,#2a5abf)",
                color:"#fff",fontSize:14,fontWeight:800,fontFamily:"inherit",
                boxShadow:"0 8px 28px rgba(59,158,255,.35), inset 0 1px 0 rgba(255,255,255,.15)",
                letterSpacing:"-.1px",transition:"all .18s",
                position:"relative",overflow:"hidden",
              }} className="btn-press"
              onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,#2454a8,#1e4080,#3060c8)";e.currentTarget.style.boxShadow="0 10px 36px rgba(59,158,255,.45)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,#1e4d9e,#1a3a7a,#2a5abf)";e.currentTarget.style.boxShadow="0 8px 28px rgba(59,158,255,.35)"}}>
                Sign In →
              </button>

              {/* Dismiss */}
              <button onClick={()=>{setModal(null);setLoginName("");setLoginPass("");setLoginErr("");}} style={{
                width:"100%",padding:"11px",marginTop:8,
                background:"none",border:"none",cursor:"pointer",
                fontSize:12,color:"rgba(255,255,255,.25)",fontFamily:"inherit",
                transition:"color .15s",
              }} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.5)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.25)"}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADMIN LOGIN */}
      {modal==="adminLogin"&&(
        <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"16px",paddingTop:"max(16px,env(safe-area-inset-top))",paddingBottom:"calc(16px + env(safe-area-inset-bottom))",backdropFilter:"blur(20px)",background:"rgba(2,6,18,.92)",animation:"fadeIn .22s ease",overflowY:"auto"}}
          onClick={e=>{if(e.target===e.currentTarget){setModal(null);setAdminPin("");setPinErr(false);}}}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:"100%",maxWidth:340,borderRadius:28,overflow:"hidden",marginTop:"auto",marginBottom:"auto",
            background:"linear-gradient(170deg,#0b1728 0%,#060e1d 60%,#080e22 100%)",
            border:"1.5px solid rgba(255,255,255,.07)",
            boxShadow:"0 40px 100px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.07)",
            animation:"scaleIn .28s cubic-bezier(.22,1,.36,1)",
          }}>
            {/* Top visual */}
            <div style={{
              padding:"32px 28px 24px",textAlign:"center",
              background:"linear-gradient(180deg,rgba(59,158,255,.06) 0%,transparent 100%)",
              borderBottom:"1px solid rgba(255,255,255,.05)",
              position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",width:200,height:150,background:"radial-gradient(ellipse,rgba(59,158,255,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
              {/* Shield icon */}
              <div style={{
                width:56,height:56,borderRadius:18,margin:"0 auto 16px",
                background:"rgba(59,158,255,.1)",border:"1.5px solid rgba(59,158,255,.35)",
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:"0 8px 28px rgba(59,158,255,.2)",
              }}>
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#3b9eff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(59,158,255,.15)"/>
                </svg>
              </div>
              <div style={{fontSize:20,fontWeight:900,letterSpacing:"-.5px",color:"#fff",marginBottom:4}}>Board Access</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.35)"}}>Enter your board PIN to continue</div>
            </div>

            {/* Form */}
            <div style={{padding:"22px 28px 28px"}}>
              <div style={{marginBottom:20}}>
                <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:7}}>Board PIN</div>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.5}}>
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#4a6880" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" fill="rgba(74,104,128,.1)"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    autoFocus
                    type="password"
                    className="input-field"
                    placeholder="Enter PIN"
                    value={adminPin}
                    onChange={e=>{setAdminPin(e.target.value);setPinErr(false);}}
                    onKeyDown={e=>{if(e.key==="Enter"){if(adminPin==="1234"){setIsAdmin(true);storeSet(KEY+"admin",true);setModal(null);setAdminPin("");}else setPinErr(true);}}}
                    style={{paddingLeft:36,letterSpacing:"0.25em"}}
                  />
                </div>
              </div>

              {pinErr&&(
                <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.2)",borderRadius:12,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#f87171",fontWeight:600}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(248,113,113,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0}}>!</div>
                  Wrong PIN — try again
                </div>
              )}

              <button onClick={()=>{
                if(adminPin==="1234"){setIsAdmin(true);storeSet(KEY+"admin",true);setModal(null);setAdminPin("");}
                else setPinErr(true);
              }} style={{
                width:"100%",padding:"13px",borderRadius:16,border:"none",cursor:"pointer",
                background:"linear-gradient(135deg,#1e4d9e,#1a3a7a,#2a5abf)",
                color:"#fff",fontSize:14,fontWeight:800,fontFamily:"inherit",
                boxShadow:"0 8px 28px rgba(59,158,255,.35),inset 0 1px 0 rgba(255,255,255,.15)",
                marginBottom:10,transition:"all .18s",
              }} className="btn-press"
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 10px 36px rgba(59,158,255,.45)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="0 8px 28px rgba(59,158,255,.35)"}>
                Unlock Board →
              </button>

              <button onClick={()=>{setModal(null);setAdminPin("");setPinErr(false);}} style={{
                width:"100%",padding:"10px",background:"none",border:"none",cursor:"pointer",
                fontSize:12,color:"rgba(255,255,255,.22)",fontFamily:"inherit",transition:"color .15s",
              }} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.5)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.22)"}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {modal==="profile"&&me&&(()=>{
        const lv_=getLv(me.allTimeXP||0);
        const nxt_=getNext(me.allTimeXP||0);
        const rankPct_=nxt_?Math.min(99,Math.round(((me.allTimeXP||0)-lv_.xp)/(nxt_.xp-lv_.xp)*100)):99;
        const todayDone_=(me.dailyDone?.[todayStr()]||[]).length;
        const spentXP_=me.spentXP||0;
        const loginStrk_=me.loginStreak||0;

        return(
          <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(20px)",background:"rgba(2,6,18,.88)",animation:"fadeIn .22s ease"}}
            onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>

            <div style={{
              width:"100%",maxWidth:480,
              background:"linear-gradient(170deg,#0b1728 0%,#060e1d 55%,#080e22 100%)",
              border:"1.5px solid rgba(255,255,255,.07)",
              borderRadius:"28px 28px 0 0",paddingBottom:"env(safe-area-inset-bottom)",
              boxShadow:"0 -24px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(59,158,255,.05), inset 0 1px 0 rgba(255,255,255,.07)",
              animation:"slideUp .32s cubic-bezier(.22,1,.36,1)",
              maxHeight:"92dvh",overflowY:"auto",scrollbarWidth:"none",
            }}>

              {/* Drag handle */}
              <div style={{display:"flex",justifyContent:"center",paddingTop:14,paddingBottom:4}}>
                <div style={{width:40,height:4,borderRadius:4,background:"rgba(255,255,255,.12)"}}/>
              </div>

              {/* Hero section */}
              <div style={{
                padding:"20px 28px 24px",textAlign:"center",
                position:"relative",overflow:"hidden",
                borderBottom:"1px solid rgba(255,255,255,.05)",
              }}>
                {/* Ambient glow */}
                <div style={{position:"absolute",top:-30,left:"50%",transform:"translateX(-50%)",
                  width:220,height:140,
                  background:`radial-gradient(ellipse,${lv_.color}20 0%,transparent 70%)`,
                  pointerEvents:"none"}}/>

                {/* Avatar with rank ring */}
                <div style={{position:"relative",display:"inline-block",marginBottom:14,cursor:"pointer"}}
                  onClick={()=>fileRef.current?.click()}>
                  {/* Rank ring */}
                  <div style={{
                    width:90,height:90,borderRadius:"50%",
                    background:`conic-gradient(${lv_.color} 0% ${rankPct_}%, rgba(255,255,255,.05) ${rankPct_}% 100%)`,
                    padding:4,display:"flex",alignItems:"center",justifyContent:"center",
                    boxShadow:`0 0 28px ${lv_.color}30`,
                  }}>
                    <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"#060e1c",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Pfp member={me} size={74} ring={lv_.color}/>
                    </div>
                  </div>
                  {/* Rank badge */}
                  <div style={{position:"absolute",bottom:-2,right:-4}}>
                    <RankBadgeFromXP xp={me.allTimeXP||0} size={26} glow/>
                  </div>
                  {/* Camera overlay */}
                  <div style={{
                    position:"absolute",inset:4,borderRadius:"50%",
                    background:"rgba(0,0,0,.0)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    transition:"background .2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,0,0,.5)";e.currentTarget.querySelector?.("svg")&&(e.currentTarget.querySelector("svg").style.opacity="1")}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,0,0,.0)"}}>
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" style={{opacity:0,transition:"opacity .2s"}}>
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                </div>

                <div style={{fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-.6px",marginBottom:4}}>{me.name}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,
                  background:`${lv_.color}18`,border:`1px solid ${lv_.color}35`,
                  borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:800,color:lv_.color,marginBottom:14}}>
                  {lv_.name} · #{myRank} Season
                </div>

                {/* Diamond progress bar */}
                <div style={{maxWidth:280,margin:"0 auto"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.5)"}}>{(me.allTimeXP||0).toLocaleString()} <DiamondIcon size={20} color={"#34d399"}/></span>
                    {nxt_&&<span style={{fontSize:11,color:"rgba(255,255,255,.2)"}}>{nxt_.xp.toLocaleString()} to {nxt_.name}</span>}
                  </div>
                  <div style={{height:5,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden"}}>
                    <div style={{
                      width:`${rankPct_}%`,height:"100%",borderRadius:4,
                      background:`linear-gradient(90deg,${lv_.color},${lv_.color}cc)`,
                      boxShadow:`0 0 8px ${lv_.color}66`,transition:"width .8s ease",
                    }}/>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:"rgba(255,255,255,.05)",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                {[
                  {l:"All-Time 💎",v:(me.allTimeXP||0).toLocaleString(),c:"#3b9eff"},
                  {l:"Season 💎", v:(me.monthlyXP||0).toLocaleString(),c:"#34d399"},
                  {l:"Quests",    v:(me.questsDone||[]).length,          c:"#a78bfa"},
                  {l:"Streak",   v:`${loginStrk_}d`,                    c:"#fb923c"},
                ].map((s,si)=>(
                  <div key={s.l} style={{background:"#0b1728",padding:"12px 8px",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:900,color:s.c,letterSpacing:"-.5px",lineHeight:1}}>{s.v}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginTop:4,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em"}}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Edit section */}
              <div style={{padding:"22px 28px 28px"}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.28)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:14}}>
                  Edit Profile
                </div>

                {/* Name */}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:7}}>Display Name</div>
                  <div style={{position:"relative"}}>
                    <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.5}}>
                      {I.user({size:15,color:"#4a6880"})}
                    </div>
                    <input className="input-field" placeholder={me.name} value={editName}
                      onChange={e=>setEditName(e.target.value)} style={{paddingLeft:36}}/>
                  </div>
                </div>

                {/* Passwords in row */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:7}}>Current PW</div>
                    <div style={{position:"relative"}}>
                      <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.5}}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#4a6880" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <input type="password" className="input-field" placeholder="Current" value={editPw}
                        onChange={e=>setEditPw(e.target.value)} style={{paddingLeft:34,fontSize:12}}/>
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:7}}>New PW</div>
                    <div style={{position:"relative"}}>
                      <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.5}}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#4a6880" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <input type="password" className="input-field" placeholder="Optional" value={editPwNew||""}
                        onChange={e=>setEditPwNew&&setEditPwNew(e.target.value)} style={{paddingLeft:34,fontSize:12}}/>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {editErr&&(
                  <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.2)",borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:12,color:"#f87171",fontWeight:600}}>
                    <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(248,113,113,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0}}>!</div>
                    {editErr}
                  </div>
                )}

                {/* Save button */}
                <button onClick={saveProfile} style={{
                  width:"100%",padding:"13px",borderRadius:16,border:"none",cursor:"pointer",
                  background:"linear-gradient(135deg,#1e4d9e,#1a3a7a,#2a5abf)",
                  color:"#fff",fontSize:13,fontWeight:800,fontFamily:"inherit",
                  boxShadow:"0 8px 28px rgba(59,158,255,.3), inset 0 1px 0 rgba(255,255,255,.15)",
                  marginBottom:10,transition:"all .18s",
                }} className="btn-press"
                onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 10px 36px rgba(59,158,255,.45)"}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 8px 28px rgba(59,158,255,.3)"}}>
                  Save Changes
                </button>

                {/* Secondary actions */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:12}}>
                  {[
                    {l:"My Stats",  fn:()=>{setDetailM(me);setModal(null);}},
                    {l:"Diamond History",fn:()=>{setHistoryM(me);setModal(null);}},
                    {l:"Badges",    fn:()=>setModal("badges")},
                  ].map(b=>(
                    <button key={b.l} onClick={b.fn} style={{
                      padding:"10px 6px",borderRadius:12,cursor:"pointer",
                      background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.5)",
                      border:"1px solid rgba(255,255,255,.08)",
                      fontSize:11,fontWeight:700,fontFamily:"inherit",transition:"all .15s",
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="rgba(255,255,255,.8)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.color="rgba(255,255,255,.5)"}}>
                      {b.l}
                    </button>
                  ))}
                </div>

                {/* Sign out */}
                <button onClick={()=>{setUserId(null);storeSet(KEY+"userId",null);setIsAdmin(false);storeSet(KEY+"admin",false);setModal(null);}} style={{
                  width:"100%",padding:"11px",borderRadius:12,cursor:"pointer",
                  background:"rgba(248,113,113,.06)",color:"rgba(248,113,113,.6)",
                  border:"1px solid rgba(248,113,113,.15)",
                  fontSize:12,fontWeight:700,fontFamily:"inherit",transition:"all .15s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(248,113,113,.12)";e.currentTarget.style.color="#f87171"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(248,113,113,.06)";e.currentTarget.style.color="rgba(248,113,113,.6)"}}>
                  Sign Out
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* NOTIFICATIONS */}
      {modal==="notifs"&&(
        <Modal title="Notifications" onClose={()=>{
          saveNo((notifs||[]).map(n=>n.userId===userId?{...n,read:true}:n));
          setModal(null);
        }}>
          {(notifs||[]).filter(n=>n.userId===userId).length===0
            ?<div style={{textAlign:"center",padding:24,color:MUTED}}>No notifications yet</div>
            :(notifs||[]).filter(n=>n.userId===userId).slice(0,20).map(n=>(
              <div key={n.id} style={{
                display:"flex",gap:10,alignItems:"flex-start",
                padding:"10px 0",borderBottom:`1px solid ${BORD}`,
                opacity:n.read?.65:1,
              }}>
                <div style={{
                  width:32,height:32,borderRadius:8,flexShrink:0,
                  background:n.read?"rgba(255,255,255,.04)":ACCL,
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>{I.sparkle({size:16,color:n.read?MUTED:ACCENT})}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:n.read?MUTED:TEXT,fontWeight:n.read?400:600,lineHeight:1.4}}>{n.msg}</div>
                  <div style={{fontSize:10,color:MUTED,marginTop:2}}>{timeAgo(n.ts)}</div>
                </div>
                {!n.read&&<div style={{width:6,height:6,borderRadius:"50%",background:ACCENT,flexShrink:0,marginTop:4}}/>}
              </div>
            ))
          }
        </Modal>
      )}

      {/* LEADERBOARD */}
      {/* RANKS TIERS */}
      {modal==="ranks"&&<RanksModal byMonth={byMonth} members={members} userId={userId} me={me} setModal={setModal} setDetailM={setDetailM}/>}

      {/* BADGES */}
      {modal==="badges"&&me&&(()=>{
        const earned = (me.badges||[]);
        const total  = BADGES.length;
        const pct    = Math.round((earned.length / total) * 100);

        // Group by rarity
        const RARITY_ORDER = ["common","rare","epic","legendary"];
        const RARITY_LABELS = {
          common:    {label:"Common",    color:"#7a92b0", bg:"rgba(122,146,176,.1)",  bord:"rgba(122,146,176,.2)"},
          rare:      {label:"Rare",      color:"#5b8fd4", bg:"rgba(91,143,212,.1)",   bord:"rgba(91,143,212,.25)"},
          epic:      {label:"Epic",      color:"#a07ce0", bg:"rgba(160,124,224,.1)",  bord:"rgba(160,124,224,.25)"},
          legendary: {label:"Legendary", color:"#d4a017", bg:"rgba(212,160,23,.1)",   bord:"rgba(212,160,23,.3)"},
        };
        const grouped = RARITY_ORDER.reduce((acc,r)=>({...acc,[r]:BADGES.filter(b=>b.rarity===r)}),{});

        return(
          <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(20px)",background:"rgba(2,6,18,.9)",animation:"fadeIn .22s ease"}}
            onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
            <div onClick={e=>e.stopPropagation()} style={{
              width:"100%",maxWidth:420,
              background:"linear-gradient(160deg,#0b1728 0%,#060e1d 55%,#080e22 100%)",
              border:"1.5px solid rgba(255,255,255,.07)",
              borderRadius:"28px 28px 0 0",
              paddingBottom:"env(safe-area-inset-bottom)",
              boxShadow:"0 -20px 80px rgba(0,0,0,.85), 0 0 0 1px rgba(167,139,250,.05), inset 0 1px 0 rgba(255,255,255,.06)",
              animation:"slideUp .32s cubic-bezier(.22,1,.36,1)",
              maxHeight:"88dvh",display:"flex",flexDirection:"column",overflow:"hidden",
            }}>

              {/* Header */}
              <div style={{
                padding:"24px 24px 20px",
                borderBottom:"1px solid rgba(255,255,255,.05)",
                position:"relative",overflow:"hidden",
                background:"linear-gradient(180deg,rgba(167,139,250,.07) 0%,transparent 100%)",
                textAlign:"center",flexShrink:0,
              }}>
                {/* Ambient glow */}
                <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",width:220,height:160,background:"radial-gradient(ellipse,rgba(167,139,250,.2) 0%,transparent 70%)",pointerEvents:"none"}}/>

                {/* Close */}
                <button onClick={()=>setModal(null)} style={{position:"absolute",top:16,right:16,width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.05)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.35)",fontSize:14}} className="btn-ghost">✕</button>

                {/* Icon */}
                <div style={{
                  width:56,height:56,borderRadius:18,margin:"0 auto 14px",
                  background:"rgba(167,139,250,.12)",border:"1.5px solid rgba(167,139,250,.3)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  boxShadow:"0 8px 28px rgba(167,139,250,.2)",
                }}>
                  {I.badge({size:26,color:"#a78bfa"})}
                </div>

                <div style={{fontSize:20,fontWeight:900,letterSpacing:"-.5px",color:"#fff",marginBottom:4}}>Badge Collection</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginBottom:16}}>
                  {earned.length} of {total} badges earned
                </div>

                {/* Progress bar */}
                <div style={{maxWidth:240,margin:"0 auto"}}>
                  <div style={{height:5,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden",marginBottom:6}}>
                    <div style={{
                      height:"100%",borderRadius:4,
                      background:"linear-gradient(90deg,#a78bfa,#c084fc)",
                      boxShadow:"0 0 8px rgba(167,139,250,.5)",
                      width:`${pct}%`,transition:"width .8s ease",
                    }}/>
                  </div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.25)",fontWeight:600}}>{pct}% complete</div>
                </div>
              </div>

              {/* Scrollable badge content */}
              <div style={{overflowY:"auto",scrollbarWidth:"none",padding:"20px 20px 24px"}}>
                {RARITY_ORDER.map(rarity=>{
                  const rGroup = grouped[rarity];
                  const rl = RARITY_LABELS[rarity];
                  const earnedInGroup = rGroup.filter(b=>earned.includes(b.id)).length;
                  return(
                    <div key={rarity} style={{marginBottom:24}}>
                      {/* Rarity section header */}
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:14}}>
                        <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${rl.bord})`}}/>
                        <div style={{
                          display:"inline-flex",alignItems:"center",gap:5,
                          background:rl.bg,border:`1px solid ${rl.bord}`,
                          borderRadius:20,padding:"4px 12px",
                          fontSize:9,fontWeight:800,color:rl.color,letterSpacing:".12em",textTransform:"uppercase",
                        }}>
                          {rarity==="legendary"&&"⭐ "}{rl.label} · {earnedInGroup}/{rGroup.length}
                        </div>
                        <div style={{flex:1,height:1,background:`linear-gradient(90deg,${rl.bord},transparent)`}}/>
                      </div>

                      {/* Badge cards grid */}
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                        {rGroup.map(b=>{
                          const have = earned.includes(b.id);
                          const rr   = RARITY_LABELS[b.rarity]||RARITY_LABELS.common;
                          return(
                            <div key={b.id} style={{
                              textAlign:"center",borderRadius:20,padding:"16px 10px 14px",
                              background: have
                                ? `linear-gradient(160deg,${rr.bg},rgba(0,0,0,.1))`
                                : "rgba(255,255,255,.025)",
                              border:`1.5px solid ${have ? rr.bord : "rgba(255,255,255,.06)"}`,
                              opacity: have ? 1 : .45,
                              boxShadow: have ? `0 4px 20px ${rr.color}15` : "none",
                              transition:"all .2s",
                              position:"relative",overflow:"hidden",
                            }}>
                              {/* Glow background on earned */}
                              {have&&(
                                <div style={{position:"absolute",top:-20,left:"50%",transform:"translateX(-50%)",
                                  width:100,height:70,
                                  background:`radial-gradient(ellipse,${rr.color}20 0%,transparent 70%)`,
                                  pointerEvents:"none"}}/>
                              )}

                              {/* Badge icon */}
                              <div style={{display:"flex",justifyContent:"center",marginBottom:10,position:"relative"}}>
                                <BadgeIcon id={b.id} size={52} unlocked={have}/>
                                {/* Lock overlay */}
                                {!have&&(
                                  <div style={{
                                    position:"absolute",bottom:-3,right:"50%",transform:"translateX(50%)",
                                    width:18,height:18,borderRadius:6,
                                    background:"#0b1728",border:"1px solid rgba(255,255,255,.1)",
                                    display:"flex",alignItems:"center",justifyContent:"center",
                                  }}>
                                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2.5" strokeLinecap="round">
                                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                  </div>
                                )}
                                {/* Earned checkmark */}
                                {have&&(
                                  <div style={{
                                    position:"absolute",bottom:-3,right:"50%",transform:"translateX(50%)",
                                    width:18,height:18,borderRadius:6,
                                    background:`${rr.color}25`,border:`1px solid ${rr.color}55`,
                                    display:"flex",alignItems:"center",justifyContent:"center",
                                  }}>
                                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={rr.color} strokeWidth="2.5" strokeLinecap="round">
                                      <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                  </div>
                                )}
                              </div>

                              {/* Badge name */}
                              <div style={{
                                fontSize:11,fontWeight:800,
                                color: have ? "#fff" : "rgba(255,255,255,.4)",
                                marginBottom:4,lineHeight:1.2,
                              }}>{b.name}</div>

                              {/* Desc or hint */}
                              <div style={{fontSize:9,color:"rgba(255,255,255,.25)",lineHeight:1.4}}>
                                {have ? b.desc : b.hint||b.desc}
                              </div>

                              {/* Rarity tag on earned */}
                              {have&&(
                                <div style={{
                                  display:"inline-flex",alignItems:"center",marginTop:8,
                                  background:rr.bg,border:`1px solid ${rr.bord}`,
                                  borderRadius:20,padding:"2px 8px",
                                  fontSize:8,fontWeight:800,color:rr.color,letterSpacing:".08em",textTransform:"uppercase",
                                }}>{rr.label}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        );
      })()}

      {/* MEMBER DETAIL */}
      {detailM&&(
        <Modal title={detailM.name.split(" ")[0]+"'s Profile"} onClose={()=>setDetailM(null)}>
          {(()=>{
            const lv2=getLv(detailM.allTimeXP||0);
            const nxt2=getNext(detailM.allTimeXP||0);
            const rk=byMonth.findIndex(m=>m.id===detailM.id)+1;
            return(
              <div>
                <div style={{textAlign:"center",marginBottom:18}}>
                  <Pfp member={detailM} size={72}/>
                  <div style={{fontWeight:900,fontSize:18,marginTop:8,color:TEXT}}>{detailM.name}</div>
                  <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:6}}>
                    <span style={{fontSize:11,color:lv2.color,fontWeight:700}}>{lv2.name}</span>
                    <span style={{fontSize:11,color:MUTED}}>· #{rk} this season</span>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
                  {[
                    {l:"Total Diamonds",v:(detailM.allTimeXP||0).toLocaleString(),c:GREEN},
                    {l:"Season Diamonds",v:(detailM.monthlyXP||0).toLocaleString(),c:ACCENT},
                    {l:"Day Streak",v:detailM.loginStreak||0,c:ORANGE},
                    {l:"Badges",v:(detailM.badges||[]).length,c:"#c084fc"},
                  ].map(s=>(
                    <div key={s.l} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"12px",textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:900,color:s.c}}>{s.v}</div>
                      <div style={{fontSize:9,color:MUTED,textTransform:"uppercase",letterSpacing:".06em",marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {(detailM.badges||[]).length>0&&(
                  <div>
                    <div style={{fontSize:10,color:MUTED,marginBottom:8,letterSpacing:".08em",textTransform:"uppercase"}}>Badges</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {(detailM.badges||[]).map(id=>(
                        <BadgeIcon key={id} id={id} size={36}/>
                      ))}
                    </div>
                  </div>
                )}
                {detailM.id===userId&&<button className="btn-secondary" style={{width:"100%",marginTop:14}} onClick={()=>{setHistoryM(detailM);setDetailM(null);}}>View Diamond History</button>}
              </div>
            );
          })()}
        </Modal>
      )}

      {/* DIAMOND HISTORY */}
      {historyM&&(
        <Modal title={`Diamond History — ${historyM.name.split(" ")[0]}`} onClose={()=>setHistoryM(null)}>
          {(historyM.xpHistory||[]).length===0
            ?<div style={{textAlign:"center",padding:24,color:MUTED}}>No Diamond history yet</div>
            :(historyM.xpHistory||[]).slice(0,30).map((h,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${BORD}`}}>
                <div style={{width:32,height:32,borderRadius:8,background:ACCL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.xp({size:16,color:GREEN})}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:TEXT,fontWeight:600}}>{h.reason}</div>
                  <div style={{fontSize:10,color:MUTED,marginTop:1}}>{timeAgo(h.ts)}</div>
                </div>
                {h.amount>0&&<div style={{fontSize:13,fontWeight:800,color:GREEN,flexShrink:0}}>+{h.amount}</div>}
              </div>
            ))
          }
        </Modal>
      )}

      {/* ADVANCED ADMIN PANEL */}
      {isAdmin&&modal==="admin"&&(()=>{
        const sorted=[...members].sort((a,b)=>b.allTimeXP-a.allTimeXP);
        const totalDiamonds=members.reduce((s,m)=>s+(m.allTimeXP||0),0);
        const totalMonthly=members.reduce((s,m)=>s+(m.monthlyXP||0),0);
        const avgXP=members.length?Math.round(totalDiamonds/members.length):0;
        const activeMembers=members.filter(m=>(m.allTimeXP||0)>0).length;
        const topEarner=sorted[0];
        const totalQuestsDone=members.reduce((s,m)=>s+(m.questsDone||[]).length,0);
        const totalDailyDone=members.reduce((s,m)=>s+Object.values(m.dailyDone||{}).flat().length,0);
        const ATABS=[
          {id:"analytics",label:"📊 Analytics"},
          {id:"members",  label:"👥 Members"},
          {id:"tasks",    label:"📋 Tasks"},
          {id:"content",  label:"🗂 Content"},
          {id:"auto",     label:"🤖 Auto-Assign"},
          {id:"season",   label:"🏆 Season"},
        ];
        const abtn=(id)=>({
          padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",
          fontFamily:"inherit",fontSize:11,fontWeight:700,transition:"all .15s",
          background:adminTab===id?ACCENT:"rgba(255,255,255,.05)",
          color:adminTab===id?"#fff":MUTED,
        });
        const secHead=(t)=><div style={{fontSize:9,fontWeight:800,color:"rgba(59,158,255,.5)",letterSpacing:".16em",textTransform:"uppercase",marginBottom:10,marginTop:4}}>{t}</div>;
        const card=(children,extra={})=>(
          <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"12px 14px",marginBottom:8,...extra}}>{children}</div>
        );
        const statBox=(label,val,color=ACCENT,sub="")=>(
          <div style={{background:`${color}0d`,border:`1px solid ${color}22`,borderRadius:12,padding:"12px 14px",flex:1,minWidth:0}}>
            <div style={{fontSize:11,color:MUTED,marginBottom:4,fontWeight:600}}>{label}</div>
            <div style={{fontSize:22,fontWeight:900,color,letterSpacing:"-1px"}}>{val}</div>
            {sub&&<div style={{fontSize:10,color:MUTED,marginTop:2}}>{sub}</div>}
          </div>
        );
        return(
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(2,6,18,.94)",backdropFilter:"blur(24px)",display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .22s ease"}}
          onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:"100%",maxWidth:520,
            height:"92dvh",
            background:"linear-gradient(160deg,#0c1a2e 0%,#060e1d 60%,#080e22 100%)",
            border:"1.5px solid rgba(59,158,255,.15)",borderRadius:"28px 28px 0 0",
            boxShadow:"0 -20px 80px rgba(0,0,0,.9),0 0 0 1px rgba(59,158,255,.06),inset 0 1px 0 rgba(59,158,255,.08)",
            animation:"slideUp .32s cubic-bezier(.22,1,.36,1)",
            display:"flex",flexDirection:"column",overflow:"hidden",
            paddingBottom:"env(safe-area-inset-bottom)",
          }}>
            {/* Drag handle */}
            <div style={{display:"flex",justifyContent:"center",paddingTop:10,paddingBottom:2,flexShrink:0}}>
              <div style={{width:40,height:4,borderRadius:4,background:"rgba(255,255,255,.15)"}}/>
            </div>
            {/* Header */}
            <div style={{padding:"10px 20px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0,
              background:"linear-gradient(180deg,rgba(59,158,255,.08) 0%,transparent 100%)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:34,height:34,borderRadius:10,background:"rgba(59,158,255,.15)",border:"1px solid rgba(59,158,255,.35)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {I.gear({size:16,color:ACCENT})}
                  </div>
                  <div>
                    <div style={{fontSize:15,fontWeight:900,color:"#fff",letterSpacing:"-.4px"}}>Board Admin</div>
                    <div style={{fontSize:10,color:MUTED}}>{members.length} members · {quests.filter(q=>q.active).length} active quests</div>
                  </div>
                </div>
                <button onClick={()=>setModal(null)} style={{width:30,height:30,borderRadius:9,background:"rgba(255,255,255,.05)",border:"none",cursor:"pointer",color:MUTED,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
              {/* Tab bar */}
              <div style={{display:"flex",gap:6,flexWrap:"wrap",paddingBottom:2}}>
                {ATABS.map(t=>(
                  <button key={t.id} style={abtn(t.id)} onClick={()=>setAdminTab(t.id)}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{overflowY:"auto",scrollbarWidth:"none",padding:"16px 18px 24px",flex:1}}>

              {/* ── ANALYTICS ── */}
              {adminTab==="analytics"&&(
                <>
                  {secHead("Club Overview")}
                  <div style={{display:"flex",gap:8,marginBottom:8}}>
                    {statBox("Total Diamonds",totalDiamonds.toLocaleString(),ACCENT,"all-time")}
                    {statBox("This Month",totalMonthly.toLocaleString(),"#34d399",`avg ${Math.round(totalMonthly/(members.length||1))}/member`)}
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:16}}>
                    {statBox("Active Members",activeMembers,"#c084fc",`${members.length} total`)}
                    {statBox("Quests Done",totalQuestsDone,"#f59e0b",`${totalDailyDone} daily tasks`)}
                  </div>

                  {secHead("Leaderboard")}
                  {sorted.map((m,i)=>{
                    const bar=topEarner?(m.allTimeXP/topEarner.allTimeXP)*100:0;
                    const lv=getLv(m.allTimeXP||0);
                    const rankColors=["#fbbf24","#94a3b8","#cd7c3a"];
                    return(
                      <div key={m.id} style={{marginBottom:7}}>
                        {card(
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:22,fontWeight:900,fontSize:13,color:rankColors[i]||MUTED,textAlign:"center",flexShrink:0}}>
                              {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
                            </div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                                <div style={{fontSize:12,fontWeight:700,color:TEXT}}>{m.name}</div>
                                <div style={{fontSize:11,fontWeight:800,color:lv.color}}>{m.allTimeXP||0}💎</div>
                              </div>
                              <div style={{height:4,background:"rgba(255,255,255,.06)",borderRadius:4}}>
                                <div style={{height:"100%",width:`${bar}%`,background:`linear-gradient(90deg,${lv.color},${lv.gem})`,borderRadius:4,transition:"width .5s"}}/>
                              </div>
                              <div style={{fontSize:10,color:MUTED,marginTop:3}}>{lv.name} · streak {m.streak||0}🔥 · {(m.questsDone||[]).length} quests</div>
                            </div>
                          </div>
                        ,{padding:"10px 12px",marginBottom:0})}
                      </div>
                    );
                  })}

                  {secHead("Activity Flags")}
                  {members.filter(m=>(m.allTimeXP||0)===0).length>0&&card(
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{fontSize:20}}>⚠️</div>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:"#fbbf24"}}>Inactive Members</div>
                        <div style={{fontSize:11,color:MUTED}}>{members.filter(m=>(m.allTimeXP||0)===0).map(m=>m.name.split(" ")[0]).join(", ")} — 0 Diamonds earned</div>
                      </div>
                    </div>
                  )}
                  {members.filter(m=>(m.streak||0)===0&&(m.allTimeXP||0)>0).length>0&&card(
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{fontSize:20}}>❄️</div>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:"#60b4ff"}}>Streak Lost</div>
                        <div style={{fontSize:11,color:MUTED}}>{members.filter(m=>(m.streak||0)===0&&(m.allTimeXP||0)>0).map(m=>m.name.split(" ")[0]).join(", ")} — lost their streak</div>
                      </div>
                    </div>
                  )}
                  {members.filter(m=>(m.allTimeXP||0)>=500&&!(m.badges||[]).includes("top3")).length>0&&card(
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{fontSize:20}}>🚀</div>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:GREEN}}>Rising Members</div>
                        <div style={{fontSize:11,color:MUTED}}>{members.filter(m=>(m.allTimeXP||0)>=500).map(m=>m.name.split(" ")[0]).join(", ")} — 500+ 💎</div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ── MEMBERS ── */}
              {adminTab==="members"&&(
                <>
                  {secHead("Add Member")}
                  {card(<>
                    <input className="input-field" placeholder="Full name" value={newName} onChange={e=>setNewName(e.target.value)} style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8}}>
                      <input className="input-field" placeholder="Password" value={newPw} onChange={e=>setNewPw(e.target.value)} style={{flex:1}}/>
                      <button className="btn-primary" style={{flex:1}} onClick={()=>{if(!newName.trim()||!newPw.trim())return;const nm={id:"m"+Date.now(),name:newName.trim(),password:newPw.trim(),allTimeXP:0,monthlyXP:0,badges:[],questsDone:[],dailyDone:{},loginStreak:0,spentXP:0,xpHistory:[],joinDate:new Date().toISOString().slice(0,10)};saveM(fin([...members,nm]));setNewName("");setNewPw("");notify("Member added!");}}>Add</button>
                    </div>
                  </>)}

                  {secHead("Award Diamonds")}
                  {card(<>
                    <select className="input-field" value={xpTarget} onChange={e=>setXpTarget(e.target.value)} style={{marginBottom:8}}>
                      <option value="">Select member…</option>
                      {members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                    <div style={{display:"flex",gap:8}}>
                      <input className="input-field" type="number" placeholder="Amount" value={xpAmount} onChange={e=>setXpAmount(Number(e.target.value))} style={{flex:1}}/>
                      <input className="input-field" placeholder="Reason" value={xpReason} onChange={e=>setXpReason(e.target.value)} style={{flex:2}}/>
                    </div>
                    <button className="btn-primary" style={{width:"100%",marginTop:8}} onClick={adminAwardXP}>Award Diamonds</button>
                  </>)}

                  {secHead("Mark Quest Done")}
                  {card(<>
                    <select className="input-field" value={qTarget} onChange={e=>setQTarget(e.target.value)} style={{marginBottom:8}}>
                      <option value="">Select member…</option>
                      {members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                    <select className="input-field" value={selQuest} onChange={e=>setSelQuest(e.target.value)} style={{marginBottom:8}}>
                      <option value="">Select quest…</option>
                      {quests.filter(q=>q.active).map(q=><option key={q.id} value={q.id}>{q.title}</option>)}
                    </select>
                    <button className="btn-primary" style={{width:"100%"}} onClick={adminQuestDone}>Mark Done</button>
                  </>)}

                  {secHead("Mark Challenge Done")}
                  {challenges.filter(c=>c.active).map(ch=>(
                    <div key={ch.id} style={{marginBottom:8,background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"12px 14px"}}>
                      <div style={{fontSize:12,fontWeight:700,color:TEXT,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                        <span style={{flex:1}}>{ch.title} <span style={{color:ACCENT}}>+{ch.xp}</span><DiamondIcon size={12} color={ACCENT}/></span>
                        <button onClick={()=>{saveCh(challenges.filter(x=>x.id!==ch.id));notify("Challenge removed.");}} style={{fontSize:10,padding:"3px 7px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {members.map(m=>(
                          <button key={m.id} onClick={()=>adminChallDone(ch.id,m.id)} style={{background:ch.completedBy.includes(m.id)?"rgba(52,211,153,.15)":"rgba(255,255,255,.05)",border:`1px solid ${ch.completedBy.includes(m.id)?"rgba(52,211,153,.3)":"rgba(255,255,255,.1)"}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",color:ch.completedBy.includes(m.id)?GREEN:TEXT,fontSize:11,fontFamily:"inherit"}}>
                            {m.name.split(" ")[0]}{ch.completedBy.includes(m.id)?" ✓":""}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {secHead("Member Details")}
                  {members.map(m=>(
                    <div key={m.id} style={{marginBottom:7}}>
                      {card(
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:32,height:32,borderRadius:10,background:`${getLv(m.allTimeXP||0).color}22`,border:`1px solid ${getLv(m.allTimeXP||0).color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                            {m.name[0]}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:700,color:TEXT}}>{m.name}</div>
                            <div style={{fontSize:10,color:MUTED}}>{getLv(m.allTimeXP||0).name} · {m.allTimeXP||0}💎 · streak {m.streak||0}🔥</div>
                          </div>
                          <div style={{display:"flex",gap:5}}>
                            <button onClick={()=>{saveM(fin(members.filter(x=>x.id!==m.id)));notify("Member removed");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                          </div>
                        </div>
                      ,{padding:"9px 12px",marginBottom:0})}
                    </div>
                  ))}
                </>
              )}

              {/* ── TASKS ── */}
              {adminTab==="tasks"&&(
                <>
                  {secHead("Daily Tasks")}
                  {card(<>
                    <input className="input-field" placeholder="Title" value={nDt.title} onChange={e=>setNDt(d=>({...d,title:e.target.value}))} style={{marginBottom:8}}/>
                    <input className="input-field" placeholder="Description" value={nDt.desc} onChange={e=>setNDt(d=>({...d,desc:e.target.value}))} style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8}}>
                      <input className="input-field" type="number" placeholder="💎 Diamonds" value={nDt.xp} onChange={e=>setNDt(d=>({...d,xp:Number(e.target.value)}))} style={{flex:1}}/>
                      <button className="btn-primary" style={{flex:1}} onClick={()=>{if(!nDt.title.trim())return;saveDa([...daily,{id:"dt"+Date.now(),title:nDt.title.trim(),desc:nDt.desc.trim(),xp:nDt.xp||10}]);setNDt({title:"",desc:"",xp:15});notify("Task added!");}}>Add</button>
                    </div>
                  </>)}
                  {daily.map(t=>(
                    <div key={t.id} style={{marginBottom:7}}>
                      {card(
                        editDtId===t.id?(
                          <>
                            <input className="input-field" value={editDt.title} onChange={e=>setEditDt(d=>({...d,title:e.target.value}))} style={{marginBottom:6}}/>
                            <input className="input-field" value={editDt.desc} onChange={e=>setEditDt(d=>({...d,desc:e.target.value}))} style={{marginBottom:6}}/>
                            <div style={{display:"flex",gap:6}}>
                              <input className="input-field" type="number" value={editDt.xp} onChange={e=>setEditDt(d=>({...d,xp:Number(e.target.value)}))} style={{flex:1}}/>
                              <button className="btn-primary" style={{flex:1,fontSize:11}} onClick={()=>{saveDa(daily.map(x=>x.id===t.id?{...x,...editDt}:x));setEditDtId(null);notify("Updated!");}}>Save</button>
                              <button className="btn-secondary" style={{flex:1,fontSize:11}} onClick={()=>setEditDtId(null)}>Cancel</button>
                            </div>
                          </>
                        ):(
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:TEXT}}>{t.title}</div><div style={{fontSize:10,color:MUTED}}>{t.desc}</div></div>
                            <div style={{fontSize:12,fontWeight:800,color:ACCENT,flexShrink:0}}>+{t.xp}💎</div>
                            <button onClick={()=>{setEditDtId(t.id);setEditDt({title:t.title,desc:t.desc,xp:t.xp});}} style={{fontSize:11,padding:"4px 8px",background:"rgba(59,158,255,.1)",border:"1px solid rgba(59,158,255,.2)",borderRadius:7,cursor:"pointer",color:ACCENT,fontFamily:"inherit"}}>Edit</button>
                            <button onClick={()=>{saveDa(daily.filter(x=>x.id!==t.id));notify("Removed.");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                          </div>
                        )
                      ,{padding:"10px 12px",marginBottom:0})}
                    </div>
                  ))}

                  <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"14px 0"}}/>
                  {secHead("Quests")}
                  {card(<>
                    <input className="input-field" placeholder="Title" value={nQ.title} onChange={e=>setNQ(d=>({...d,title:e.target.value}))} style={{marginBottom:8}}/>
                    <input className="input-field" placeholder="Description" value={nQ.desc} onChange={e=>setNQ(d=>({...d,desc:e.target.value}))} style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8}}>
                      <input className="input-field" type="number" placeholder="💎" value={nQ.xp} onChange={e=>setNQ(d=>({...d,xp:Number(e.target.value)}))} style={{flex:1}}/>
                      <input className="input-field" placeholder="Category" value={nQ.category} onChange={e=>setNQ(d=>({...d,category:e.target.value}))} style={{flex:2}}/>
                      <button className="btn-primary" style={{flex:1}} onClick={()=>{if(!nQ.title.trim())return;saveQ([{id:"q"+Date.now(),...nQ,active:true},...quests]);setNQ({title:"",desc:"",xp:50,icon:"bolt",category:"General"});notify("Quest added");}}>Add</button>
                    </div>
                  </>)}
                  {quests.map(q=>(
                    <div key={q.id} style={{marginBottom:7}}>
                      {card(
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:q.active?TEXT:MUTED}}>{q.title}</div><div style={{fontSize:10,color:MUTED}}>{q.category} · +{q.xp}💎 · {members.filter(m=>(m.questsDone||[]).includes(q.id)).length} completed</div></div>
                          <button onClick={()=>{saveQ(quests.map(x=>x.id===q.id?{...x,active:!x.active}:x));notify(q.active?"Archived":"Restored");}} style={{fontSize:11,padding:"4px 8px",background:q.active?"rgba(245,158,11,.08)":"rgba(52,211,153,.08)",border:`1px solid ${q.active?"rgba(245,158,11,.25)":"rgba(52,211,153,.25)"}`,borderRadius:7,cursor:"pointer",color:q.active?"#fbbf24":GREEN,fontFamily:"inherit"}}>{q.active?"Archive":"Restore"}</button>
                          <button onClick={()=>{saveQ(quests.filter(x=>x.id!==q.id));notify("Quest removed.");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                        </div>
                      ,{padding:"10px 12px",marginBottom:0})}
                    </div>
                  ))}

                  <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"14px 0"}}/>
                  {secHead("Challenges")}
                  {card(<>
                    <input className="input-field" placeholder="Title" value={nCh.title} onChange={e=>setNCh(d=>({...d,title:e.target.value}))} style={{marginBottom:8}}/>
                    <input className="input-field" placeholder="Description" value={nCh.desc} onChange={e=>setNCh(d=>({...d,desc:e.target.value}))} style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8}}>
                      <input className="input-field" type="number" placeholder="💎" value={nCh.xp} onChange={e=>setNCh(d=>({...d,xp:Number(e.target.value)}))} style={{flex:1}}/>
                      <input className="input-field" type="number" placeholder="Days" value={nCh.days} onChange={e=>setNCh(d=>({...d,days:Number(e.target.value)}))} style={{flex:1}}/>
                      <button className="btn-primary" style={{flex:1}} onClick={()=>{if(!nCh.title.trim())return;const endsAt=Date.now()+nCh.days*86400000;saveCh([{id:"ch"+Date.now(),...nCh,active:true,endsAt,completedBy:[]},...challenges]);setNCh({title:"",desc:"",xp:100,icon:"target",days:7});notify("Challenge added");}}>Add</button>
                    </div>
                  </>)}
                  {challenges.map(ch=>(
                    <div key={ch.id} style={{marginBottom:7}}>
                      {card(
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:ch.active?TEXT:MUTED}}>{ch.title}</div><div style={{fontSize:10,color:MUTED}}>+{ch.xp}💎 · {ch.active?countdown(ch.endsAt):"inactive"} · {ch.completedBy.length} done</div></div>
                          <button onClick={()=>{saveCh(challenges.map(x=>x.id===ch.id?{...x,active:!x.active}:x));notify(ch.active?"Archived":"Restored");}} style={{fontSize:11,padding:"4px 8px",background:ch.active?"rgba(245,158,11,.08)":"rgba(52,211,153,.08)",border:`1px solid ${ch.active?"rgba(245,158,11,.25)":"rgba(52,211,153,.25)"}`,borderRadius:7,cursor:"pointer",color:ch.active?"#fbbf24":GREEN,fontFamily:"inherit"}}>{ch.active?"Archive":"Restore"}</button>
                          <button onClick={()=>{saveCh(challenges.filter(x=>x.id!==ch.id));notify("Challenge removed.");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                        </div>
                      ,{padding:"10px 12px",marginBottom:0})}
                    </div>
                  ))}
                </>
              )}

              {/* ── CONTENT ── */}
              {adminTab==="content"&&(
                <>
                  {secHead("Add Poll")}
                  {card(<>
                    <input className="input-field" placeholder="Question" value={nPo.question} onChange={e=>setNPo(d=>({...d,question:e.target.value}))} style={{marginBottom:8}}/>
                    {nPo.options.map((o,oi)=>(
                      <input key={oi} className="input-field" placeholder={`Option ${oi+1}`} value={o} onChange={e=>setNPo(d=>({...d,options:d.options.map((x,j)=>j===oi?e.target.value:x)}))} style={{marginBottom:8}}/>
                    ))}
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn-secondary" style={{flex:1}} onClick={()=>setNPo(d=>({...d,options:[...d.options,""]}))}>+ Option</button>
                      <button className="btn-primary" style={{flex:1}} onClick={()=>{if(!nPo.question.trim())return;const opts=nPo.options.filter(o=>o.trim()).map((text,i)=>({id:"o"+i,text,votes:[]}));savePo([{id:"po"+Date.now(),question:nPo.question,options:opts,active:true,endsAt:Date.now()+7*86400000},...polls]);setNPo({question:"",options:["",""]});notify("Poll added");}}>Add Poll</button>
                    </div>
                  </>)}

                  {secHead("Active Polls")}
                  {polls.filter(p=>p.active).map(p=>(
                    <div key={p.id} style={{marginBottom:7}}>
                      {card(
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:TEXT}}>{p.question}</div><div style={{fontSize:10,color:MUTED}}>{p.options.reduce((s,o)=>s+o.votes.length,0)} votes · {p.options.length} options</div></div>
                          <button onClick={()=>{savePo(polls.map(x=>x.id===p.id?{...x,active:false}:x));notify("Poll closed");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:7,cursor:"pointer",color:"#fbbf24",fontFamily:"inherit"}}>Close</button>
                          <button onClick={()=>{savePo(polls.filter(x=>x.id!==p.id));notify("Poll removed");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                        </div>
                      ,{padding:"10px 12px",marginBottom:0})}
                    </div>
                  ))}

                  <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"14px 0"}}/>
                  {secHead("Add Event")}
                  {card(<>
                    <input className="input-field" placeholder="Event title" value={nEv.title} onChange={e=>setNEv(d=>({...d,title:e.target.value}))} style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8,marginBottom:8}}>
                      <input className="input-field" type="date" value={nEv.date} onChange={e=>setNEv(d=>({...d,date:e.target.value}))} style={{flex:1}}/>
                      <input className="input-field" type="time" value={nEv.time} onChange={e=>setNEv(d=>({...d,time:e.target.value}))} style={{flex:1}}/>
                    </div>
                    <input className="input-field" placeholder="Location" value={nEv.location} onChange={e=>setNEv(d=>({...d,location:e.target.value}))} style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8}}>
                      <input className="input-field" placeholder="Description" value={nEv.desc} onChange={e=>setNEv(d=>({...d,desc:e.target.value}))} style={{flex:2}}/>
                      <button className="btn-primary" style={{flex:1}} onClick={()=>{if(!nEv.title.trim()||!nEv.date)return;saveEv([...events,{id:"e"+Date.now(),...nEv,rsvp:[]}]);setNEv({title:"",date:"",time:"",location:"",desc:"",icon:"calendar"});notify("Event added!");}}>Add</button>
                    </div>
                  </>)}

                  {secHead("Upcoming Events")}
                  {events.map(ev=>(
                    <div key={ev.id} style={{marginBottom:7}}>
                      {card(
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:TEXT}}>{ev.title}</div><div style={{fontSize:10,color:MUTED}}>{ev.date} {ev.time} · {ev.location} · {(ev.rsvp||[]).length} RSVPs</div></div>
                          <button onClick={()=>{saveEv(events.filter(x=>x.id!==ev.id));notify("Event removed");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit"}}>✕</button>
                        </div>
                      ,{padding:"10px 12px",marginBottom:0})}
                    </div>
                  ))}
                </>
              )}

              {/* ── AUTO-ASSIGN ── */}
              {adminTab==="auto"&&(
                <>
                  <div style={{background:"rgba(192,132,252,.06)",border:"1px solid rgba(192,132,252,.15)",borderRadius:14,padding:"14px 14px 10px",marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#c084fc",marginBottom:4}}>🤖 How Auto-Assign Works</div>
                    <div style={{fontSize:11,color:MUTED,lineHeight:1.6}}>Create rules that automatically notify members when they qualify for a quest — based on their XP, streak, badges, or monthly performance. Hit "Run Rules" to push notifications instantly.</div>
                  </div>

                  {secHead("New Rule")}
                  {card(<>
                    <select className="input-field" value={nRule.questId} onChange={e=>setNRule(d=>({...d,questId:e.target.value}))} style={{marginBottom:8}}>
                      <option value="">Select quest to assign…</option>
                      {quests.filter(q=>q.active).map(q=><option key={q.id} value={q.id}>{q.title} (+{q.xp}💎)</option>)}
                    </select>
                    <div style={{display:"flex",gap:8,marginBottom:8}}>
                      <select className="input-field" value={nRule.trigger} onChange={e=>setNRule(d=>({...d,trigger:e.target.value}))} style={{flex:2}}>
                        <option value="xp_gte">All-time XP ≥</option>
                        <option value="monthly_gte">Monthly XP ≥</option>
                        <option value="streak_gte">Streak ≥</option>
                        <option value="badges_gte">Badges earned ≥</option>
                      </select>
                      <input className="input-field" type="number" placeholder="Value" value={nRule.value} onChange={e=>setNRule(d=>({...d,value:e.target.value}))} style={{flex:1}}/>
                    </div>
                    <input className="input-field" placeholder="Notification message (e.g. You earned this quest!)" value={nRule.label} onChange={e=>setNRule(d=>({...d,label:e.target.value}))} style={{marginBottom:8}}/>
                    <button className="btn-primary" style={{width:"100%"}} onClick={()=>{
                      if(!nRule.questId||!nRule.value)return;
                      saveAR([...autoRules,{id:"ar"+Date.now(),...nRule}]);
                      setNRule({questId:"",trigger:"xp_gte",value:100,label:""});
                      notify("Rule added!");
                    }}>Add Rule</button>
                  </>)}

                  {secHead("Active Rules")}
                  {autoRules.length===0&&<div style={{fontSize:12,color:MUTED,textAlign:"center",padding:"12px 0"}}>No rules yet. Add one above.</div>}
                  {autoRules.map(r=>{
                    const q=quests.find(x=>x.id===r.questId);
                    const triggerLabel={"xp_gte":"All-time XP ≥","monthly_gte":"Monthly XP ≥","streak_gte":"Streak ≥","badges_gte":"Badges ≥"}[r.trigger]||r.trigger;
                    const qualifiedCount=members.filter(m=>{
                      if(r.trigger==="xp_gte")return(m.allTimeXP||0)>=Number(r.value);
                      if(r.trigger==="streak_gte")return(m.streak||0)>=Number(r.value);
                      if(r.trigger==="badges_gte")return(m.badges||[]).length>=Number(r.value);
                      if(r.trigger==="monthly_gte")return(m.monthlyXP||0)>=Number(r.value);
                      return false;
                    }).length;
                    return(
                      <div key={r.id} style={{marginBottom:8}}>
                        {card(
                          <div>
                            <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
                              <div style={{flex:1}}>
                                <div style={{fontSize:12,fontWeight:700,color:TEXT,marginBottom:2}}>{q?q.title:<span style={{color:"#f87171"}}>Quest removed</span>}</div>
                                <div style={{fontSize:11,color:MUTED}}>{triggerLabel} {r.value} · <span style={{color:GREEN}}>{qualifiedCount} member{qualifiedCount!==1?"s":""} qualify</span></div>
                              </div>
                              <button onClick={()=>{saveAR(autoRules.filter(x=>x.id!==r.id));notify("Rule removed");}} style={{fontSize:11,padding:"4px 8px",background:"rgba(224,92,75,.08)",border:"1px solid rgba(224,92,75,.2)",borderRadius:7,cursor:"pointer",color:"#f87171",fontFamily:"inherit",flexShrink:0}}>✕</button>
                            </div>
                            {r.label&&<div style={{fontSize:10,color:MUTED,fontStyle:"italic"}}>"{r.label}"</div>}
                            <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                              {members.filter(m=>{
                                if(r.trigger==="xp_gte")return(m.allTimeXP||0)>=Number(r.value);
                                if(r.trigger==="streak_gte")return(m.streak||0)>=Number(r.value);
                                if(r.trigger==="badges_gte")return(m.badges||[]).length>=Number(r.value);
                                if(r.trigger==="monthly_gte")return(m.monthlyXP||0)>=Number(r.value);
                                return false;
                              }).map(m=>(
                                <span key={m.id} style={{fontSize:10,padding:"3px 8px",background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.2)",borderRadius:20,color:GREEN}}>{m.name.split(" ")[0]}</span>
                              ))}
                            </div>
                          </div>
                        ,{padding:"11px 13px",marginBottom:0})}
                      </div>
                    );
                  })}

                  {autoRules.length>0&&(
                    <button className="btn-primary" style={{width:"100%",marginTop:8,background:"linear-gradient(135deg,#7c3aed,#3b9eff)"}} onClick={runAutoAssign}>
                      🤖 Run All Rules Now
                    </button>
                  )}
                </>
              )}

              {/* ── SEASON ── */}
              {adminTab==="season"&&(
                <>
                  {secHead("Current Season")}
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    {statBox("Season Leader",topEarner?topEarner.name.split(" ")[0]:"—","#fbbf24",`${topEarner?.monthlyXP||0}💎 this month`)}
                    {statBox("Season Total",totalMonthly.toLocaleString()+"💎",GREEN,`${members.length} members`)}
                  </div>

                  {secHead("Monthly Standings")}
                  {[...members].sort((a,b)=>b.monthlyXP-a.monthlyXP).map((m,i)=>(
                    <div key={m.id} style={{marginBottom:6}}>
                      {card(
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:20,fontWeight:800,fontSize:12,color:i===0?"#fbbf24":i===1?"#94a3b8":i===2?"#cd7c3a":MUTED,textAlign:"center"}}>{i+1}</div>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:TEXT}}>{m.name}</div></div>
                          <div style={{fontSize:13,fontWeight:900,color:ACCENT}}>{m.monthlyXP||0}💎</div>
                        </div>
                      ,{padding:"9px 12px",marginBottom:0})}
                    </div>
                  ))}

                  {seasons.length>0&&(
                    <>
                      <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"14px 0"}}/>
                      {secHead("Past Seasons")}
                      {seasons.map((s,si)=>(
                        <div key={si} style={{marginBottom:7}}>
                          {card(
                            <div>
                              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                                <div style={{fontSize:12,fontWeight:700,color:TEXT}}>{s.label}</div>
                                <div style={{fontSize:11,color:MUTED}}>{s.totalXP}💎 total</div>
                              </div>
                              <div style={{display:"flex",gap:6}}>
                                {(s.top3||[]).map((p,pi)=>(
                                  <span key={pi} style={{fontSize:10,padding:"2px 8px",background:"rgba(251,191,36,.08)",border:"1px solid rgba(251,191,36,.15)",borderRadius:20,color:"#fbbf24"}}>
                                    {pi===0?"🥇":pi===1?"🥈":"🥉"} {p.name.split(" ")[0]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ,{padding:"10px 13px",marginBottom:0})}
                        </div>
                      ))}
                    </>
                  )}

                  <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"14px 0"}}/>
                  {secHead("End Season")}
                  {card(
                    <>
                      <div style={{fontSize:12,color:MUTED,marginBottom:10,lineHeight:1.6}}>Archives this month's standings, resets monthly diamonds, awards the Season Champion badge to the leader, and posts an announcement to the feed.</div>
                      <button className="btn-secondary" style={{width:"100%",color:"#f87171",borderColor:"rgba(248,113,113,.2)"}} onClick={doSeasonReset}>🏆 Archive Season & Reset</button>
                    </>
                  ,{background:"rgba(248,113,113,.04)",border:"1px solid rgba(248,113,113,.12)"})}
                </>
              )}

            </div>
          </div>
        </div>
        );
      })()}

      {/* DIAMOND POP ANIMATION */}
      {xpPop&&(
        <div style={{
          position:"fixed",top:"30%",left:"50%",transform:"translateX(-50%)",
          fontSize:28,fontWeight:900,color:GREEN,
          textShadow:"0 0 20px #34d39988",
          animation:"xpPop .8s ease-out forwards",
          pointerEvents:"none",zIndex:999,
          letterSpacing:"-1px",
        }} onAnimationEnd={()=>setXpPop(null)}>
          +{xpPop} <DiamondIcon size={24} color={"#34d399"}/>  
        </div>
      )}

      {/* LEVEL UP MODAL */}
      {lvlUp&&<LevelUpModal level={lvlUp} onDone={()=>setLvlUp(null)}/>}

      {/* BADGE UNLOCK */}
      {badgeUnlock&&<BadgeUnlockModal badge={badgeUnlock} onDone={()=>setBadgeUnlock(null)}/>}

      {/* ALL TASKS DONE */}
      {allTasksDone&&<AllTasksDoneModal onDone={()=>setAllTasksDone(false)}/>}

      {/* TOAST */}
      {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}

      {/* MYSTERY BOX OVERLAY */}
      {mysteryOpen&&(()=>{
        const PHASE = mysteryResult ? "reveal" : "opening";
        const particles = [
          {px:"80px",py:"-90px",c:"#a78bfa"},{px:"-70px",py:"-80px",c:"#38d4f5"},
          {px:"60px",py:"-100px",c:"#fbbf24"},{px:"-90px",py:"-60px",c:"#f87171"},
          {px:"100px",py:"-40px",c:"#34d399"},{px:"-60px",py:"-110px",c:"#c084fc"},
          {px:"40px",py:"-120px",c:"#60b4ff"},{px:"-110px",py:"-30px",c:"#fb923c"},
        ];
        return(
          <div onClick={()=>{if(mysteryResult){setMysteryOpen(false);setMysteryResult(null);}}}
            style={{position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"center",
              justifyContent:"center",backdropFilter:"blur(20px)",
              padding:"max(20px,env(safe-area-inset-top)) 20px max(20px,env(safe-area-inset-bottom))",
              background:"rgba(2,4,14,.94)",animation:"fadeIn .2s ease"}}>
            <style>{`
              .mbox-particle{animation:particleFly .9s ease forwards}
              .mbox-ring{animation:ringExpand 1s ease forwards}
              .mbox-prize{animation:prizeFloat .7s cubic-bezier(.22,1,.36,1) forwards}
              .mbox-shine::after{content:'';position:absolute;top:0;bottom:0;width:40%;
                background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
                animation:shimmerSlide 2s ease-in-out infinite;left:-80%;pointer-events:none}
            `}</style>
            <div style={{position:"relative",display:"flex",flexDirection:"column",
              alignItems:"center",maxWidth:320,width:"100%",padding:"0 24px"}}>

              {/* Ambient background glow */}
              <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",
                background:mysteryResult
                  ?"radial-gradient(circle,rgba(167,139,250,.35) 0%,transparent 70%)"
                  :"radial-gradient(circle,rgba(124,58,237,.25) 0%,transparent 70%)",
                animation:"glowPulse 1.8s ease-in-out infinite",pointerEvents:"none"}}/>

              {PHASE==="opening"&&(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
                  {/* Box with shake animation */}
                  <div style={{position:"relative",width:120,height:120,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {/* Expanding rings behind box */}
                    {[0,1,2].map(ri=>(
                      <div key={ri} className="mbox-ring" style={{
                        position:"absolute",width:100,height:100,borderRadius:"50%",
                        border:"2px solid rgba(167,139,250,.5)",
                        animationDelay:`${ri*.3}s`,animationDuration:"1.2s",
                      }}/>
                    ))}
                    <div style={{
                      animation:"boxFloat 1.4s ease-in-out infinite, boxShake 0s ease none",
                      filter:"drop-shadow(0 0 24px rgba(167,139,250,.7))",
                    }}>
                      <svg width={96} height={96} viewBox="0 0 48 48" fill="none">
                        <defs>
                          <linearGradient id="mx1" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#c084fc"/>
                            <stop offset="100%" stopColor="#7c3aed"/>
                          </linearGradient>
                          <linearGradient id="mx2" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7"/>
                            <stop offset="100%" stopColor="#4c1d95"/>
                          </linearGradient>
                        </defs>
                        {/* Box body */}
                        <path d="M6 18L24 8l18 10v18L24 46 6 36z" fill="url(#mx1)" fillOpacity=".25" stroke="#a78bfa" strokeWidth="1.2"/>
                        {/* Lid */}
                        <path d="M6 18l18 10 18-10" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round"/>
                        {/* Ribbon vertical */}
                        <line x1="24" y1="8" x2="24" y2="46" stroke="#e879f9" strokeWidth="1.2" strokeDasharray="2 2"/>
                        {/* Ribbon horizontal */}
                        <path d="M6 18l18 10 18-10" stroke="#e879f9" strokeWidth=".8" strokeDasharray="2 2"/>
                        {/* Shine on top face */}
                        <path d="M24 8l6 3.5-6 3.5-6-3.5z" fill="white" fillOpacity=".25"/>
                        {/* Sparkles */}
                        <circle cx="10" cy="12" r="1.2" fill="#e879f9" fillOpacity=".8"/>
                        <circle cx="38" cy="14" r="1" fill="#c084fc" fillOpacity=".9"/>
                        <circle cx="28" cy="5" r=".8" fill="white" fillOpacity=".7"/>
                        <path d="M5 28l1.5 1.5M5 30l1.5-1.5" stroke="#e879f9" strokeWidth=".8" strokeLinecap="round"/>
                        <path d="M41 22l1.5 1.5M41 24l1.5-1.5" stroke="#c084fc" strokeWidth=".8" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:11,fontWeight:800,letterSpacing:".2em",textTransform:"uppercase",
                      color:"rgba(167,139,250,.6)",marginBottom:8}}>Opening your box</div>
                    {/* Animated dots */}
                    <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                      {[0,1,2].map(di=>(
                        <div key={di} style={{width:7,height:7,borderRadius:"50%",
                          background:"#a78bfa",animation:`glowPulse 1s ease-in-out infinite`,
                          animationDelay:`${di*.2}s`}}/>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {PHASE==="reveal"&&(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,
                  width:"100%",position:"relative"}}>
                  {/* Particles burst */}
                  <div style={{position:"absolute",top:"20%",left:"50%",pointerEvents:"none"}}>
                    {particles.map((p,pi)=>(
                      <div key={pi} className="mbox-particle" style={{
                        position:"absolute",width:10,height:10,borderRadius:"50%",
                        background:p.c,boxShadow:`0 0 8px ${p.c}`,
                        "--px":p.px,"--py":p.py,
                        animationDelay:`${pi*.04}s`,
                      }}/>
                    ))}
                  </div>

                  {/* Prize card */}
                  <div className="mbox-prize mbox-shine" style={{
                    background:"linear-gradient(160deg,#130926,#0a0618,#0f0d22)",
                    border:"2px solid rgba(167,139,250,.45)",
                    borderRadius:28,padding:"32px 28px 28px",
                    width:"100%",textAlign:"center",
                    boxShadow:"0 0 60px rgba(167,139,250,.25), 0 32px 64px rgba(0,0,0,.8), inset 0 1px 0 rgba(167,139,250,.15)",
                    position:"relative",overflow:"hidden",
                  }}>
                    {/* Radial glow */}
                    <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",
                      width:240,height:180,
                      background:"radial-gradient(ellipse,rgba(167,139,250,.3) 0%,transparent 70%)",
                      pointerEvents:"none"}}/>

                    {/* Prize icon */}
                    <div style={{
                      width:80,height:80,borderRadius:24,margin:"0 auto 16px",
                      background:"rgba(167,139,250,.12)",border:"2px solid rgba(167,139,250,.35)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:"0 0 32px rgba(167,139,250,.3)",
                      animation:"crackIn .6s cubic-bezier(.34,1.56,.64,1)",
                    }}>
                      {mysteryResult.xp>0
                        ?<DiamondIcon size={40} color={"#a78bfa"}/>
                        :<svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#a78bfa" fillOpacity=".2"/></svg>
                      }
                    </div>

                    {/* YOU GOT label */}
                    <div style={{fontSize:9,fontWeight:800,color:"rgba(167,139,250,.55)",
                      letterSpacing:".2em",textTransform:"uppercase",marginBottom:10}}>You got</div>

                    {/* Prize title */}
                    <div style={{fontSize:26,fontWeight:900,color:"#fff",
                      letterSpacing:"-.6px",lineHeight:1.1,marginBottom:6}}>
                      {mysteryResult.xp>0
                        ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                            +{mysteryResult.xp} <DiamondIcon size={26} color={"#c084fc"}/>
                          </span>
                        :mysteryResult.title
                      }
                    </div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.38)",marginBottom:28,lineHeight:1.5}}>
                      {mysteryResult.sub}
                    </div>

                    {/* CTA */}
                    <button onClick={()=>{setMysteryOpen(false);setMysteryResult(null);}}
                      style={{width:"100%",padding:"14px",borderRadius:16,border:"none",cursor:"pointer",
                        background:"linear-gradient(135deg,#7c3aed,#5b21b6,#4c1d95)",
                        color:"#fff",fontSize:14,fontWeight:800,fontFamily:"inherit",
                        boxShadow:"0 8px 28px rgba(124,58,237,.5), inset 0 1px 0 rgba(255,255,255,.15)",
                        letterSpacing:"-.1px",
                      }} className="btn-press">
                      Claim Reward! ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* DAILY LOGIN REWARD */}
      {showLoginReward&&me&&<DailyLoginModal member={me} onClaim={handleLoginRewardClaim} onClose={()=>setShowLoginReward(false)}/>}

      {/* GEMCRUSH */}
      {showGemCrush&&me&&<GemCrushGame member={me} onReward={handleGemCrushReward} onClose={()=>setShowGemCrush(false)}/>}

      {/* ADMIN FLOATING BUTTON */}
      {isAdmin&&modal!=="admin"&&(
        <button onClick={()=>setModal("admin")} style={{
          position:"fixed",bottom:"calc(88px + env(safe-area-inset-bottom))",right:16,
          width:44,height:44,borderRadius:"50%",
          background:`linear-gradient(135deg,${ACCENT},#7c3aed)`,
          border:"none",cursor:"pointer",
          color:"#fff",fontSize:18,
          boxShadow:"0 4px 16px rgba(59,158,255,.4)",
          zIndex:49,display:"flex",alignItems:"center",justifyContent:"center",
        }}>{I.gear({size:18,color:"#fff"})}</button>
      )}

    </div>
  );
}
