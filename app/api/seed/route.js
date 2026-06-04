/**
 * Database Seed API Endpoint
 *
 * This endpoint populates the Supabase database with sample data.
 * Call: POST /api/seed
 *
 * ⚠️ ADMIN ONLY - Verify user is admin before seeding
 */

import { supabase } from '@/lib/supabase';

const QUESTS = [
  {
    id: 'quest-first-steps',
    title: '🎯 First Steps',
    description: 'Complete your first quest and claim your reward!',
    xp_reward: 50,
    icon: 'flag',
    category: 'General',
    is_active: true
  },
  {
    id: 'quest-team-player',
    title: '👥 Team Player',
    description: 'Participate in a team activity or event',
    xp_reward: 75,
    icon: 'users',
    category: 'Social',
    is_active: true
  },
  {
    id: 'quest-knowledge-seeker',
    title: '📚 Knowledge Seeker',
    description: 'Complete a learning task or course',
    xp_reward: 100,
    icon: 'book',
    category: 'Learning',
    is_active: true
  },
  {
    id: 'quest-early-bird',
    title: '🌅 Early Bird',
    description: 'Complete your daily tasks before 9 AM',
    xp_reward: 25,
    icon: 'sunrise',
    category: 'Daily',
    is_active: true
  },
  {
    id: 'quest-creative-genius',
    title: '🎨 Creative Genius',
    description: 'Submit creative work or design',
    xp_reward: 150,
    icon: 'palette',
    category: 'Creative',
    is_active: true
  },
  {
    id: 'quest-problem-solver',
    title: '🔧 Problem Solver',
    description: 'Help solve a team problem or challenge',
    xp_reward: 120,
    icon: 'wrench',
    category: 'General',
    is_active: true
  }
];

const CHALLENGES = [
  {
    id: 'challenge-30-day-streak',
    title: '🔥 30-Day Streak',
    description: 'Complete daily tasks for 30 consecutive days',
    xp_reward: 500,
    duration_days: 30,
    icon: 'fire',
    is_active: true
  },
  {
    id: 'challenge-week-warrior',
    title: '⚔️ Week Warrior',
    description: 'Earn 500 XP in a single week',
    xp_reward: 250,
    duration_days: 7,
    icon: 'sword',
    is_active: true
  },
  {
    id: 'challenge-community-builder',
    title: '🏗️ Community Builder',
    description: 'Invite 5 new members to the platform',
    xp_reward: 300,
    duration_days: 14,
    icon: 'building',
    is_active: true
  },
  {
    id: 'challenge-speed-demon',
    title: '⚡ Speed Demon',
    description: 'Complete 3 quests in a single day',
    xp_reward: 200,
    duration_days: 1,
    icon: 'zap',
    is_active: true
  },
  {
    id: 'challenge-balanced-life',
    title: '⚖️ Balanced Life',
    description: 'Participate in activities from all 5 categories',
    xp_reward: 400,
    duration_days: 14,
    icon: 'scale',
    is_active: true
  }
];

const DAILY_TASKS = [
  {
    id: 'daily-morning-standup',
    title: '☀️ Morning Standup',
    description: 'Attend the morning team standup',
    xp_reward: 15,
    is_active: true
  },
  {
    id: 'daily-hydration',
    title: '💧 Stay Hydrated',
    description: 'Drink 8 glasses of water',
    xp_reward: 10,
    is_active: true
  },
  {
    id: 'daily-exercise',
    title: '🏃 Daily Exercise',
    description: 'Complete a 20-minute workout',
    xp_reward: 25,
    is_active: true
  },
  {
    id: 'daily-learning',
    title: '📖 Learn Something New',
    description: 'Read or watch 30 minutes of educational content',
    xp_reward: 20,
    is_active: true
  },
  {
    id: 'daily-meditation',
    title: '🧘 Meditation',
    description: 'Complete a 10-minute meditation session',
    xp_reward: 15,
    is_active: true
  },
  {
    id: 'daily-productivity',
    title: '📋 Complete Your Goals',
    description: 'Check off at least 3 items on your task list',
    xp_reward: 30,
    is_active: true
  }
];

const EVENTS = [
  {
    id: 'event-quarterly-summit',
    title: '🎯 Quarterly Summit',
    description: 'Company-wide quarterly planning and celebration event',
    event_date: '2026-06-15',
    event_time: '10:00 AM',
    location: 'Main Conference Room',
    icon: 'calendar',
    is_active: true
  },
  {
    id: 'event-team-lunch',
    title: '🍽️ Team Lunch',
    description: 'Casual lunch with the team to build connections',
    event_date: '2026-05-30',
    event_time: '12:00 PM',
    location: 'Downtown Bistro',
    icon: 'utensils',
    is_active: true
  },
  {
    id: 'event-workshop-public-speaking',
    title: '🎤 Public Speaking Workshop',
    description: 'Learn techniques to improve your presentation skills',
    event_date: '2026-06-05',
    event_time: '2:00 PM',
    location: 'Training Center',
    icon: 'microphone',
    is_active: true
  },
  {
    id: 'event-networking-happy-hour',
    title: '🥂 Networking Happy Hour',
    description: 'Connect with colleagues in a relaxed environment',
    event_date: '2026-06-08',
    event_time: '5:00 PM',
    location: 'The Social Lounge',
    icon: 'wine-glass',
    is_active: true
  },
  {
    id: 'event-hackathon',
    title: '💻 Company Hackathon',
    description: '24-hour innovation competition with amazing prizes',
    event_date: '2026-06-20',
    event_time: '9:00 AM',
    location: 'Tech Hub',
    icon: 'laptop',
    is_active: true
  },
  {
    id: 'event-career-fair',
    title: '🌟 Career Development Fair',
    description: 'Explore growth opportunities and mentorship programs',
    event_date: '2026-06-25',
    event_time: '1:00 PM',
    location: 'Building A, Floor 3',
    icon: 'briefcase',
    is_active: true
  }
];

const REWARDS = [
  {
    id: 'reward-coffee-voucher',
    title: '☕ Coffee Voucher',
    description: 'Free coffee at the office café',
    cost: 50,
    icon: 'coffee',
    stock: 100,
    is_active: true
  },
  {
    id: 'reward-parking-pass',
    title: '🅿️ Premium Parking Pass',
    description: '1 week of premium parking spot',
    cost: 150,
    icon: 'parking',
    stock: 50,
    is_active: true
  },
  {
    id: 'reward-early-leave',
    title: '🏃 Early Leave Pass',
    description: 'Leave 2 hours early one day',
    cost: 200,
    icon: 'clock',
    stock: 25,
    is_active: true
  },
  {
    id: 'reward-pizza-party',
    title: '🍕 Team Pizza Party',
    description: 'Sponsor a pizza party for your team',
    cost: 300,
    icon: 'pizza',
    stock: 15,
    is_active: true
  },
  {
    id: 'reward-amazon-gift-card',
    title: '🎁 Amazon Gift Card ($25)',
    description: '$25 Amazon gift card',
    cost: 500,
    icon: 'gift',
    stock: 10,
    is_active: true
  },
  {
    id: 'reward-gym-membership',
    title: '💪 1-Month Gym Membership',
    description: 'Free gym membership for one month',
    cost: 400,
    icon: 'dumbbell',
    stock: 20,
    is_active: true
  },
  {
    id: 'reward-remote-day',
    title: '🏠 Remote Work Day',
    description: 'One day to work from home with no meetings',
    cost: 250,
    icon: 'home',
    stock: 30,
    is_active: true
  },
  {
    id: 'reward-professional-course',
    title: '📚 Professional Course',
    description: 'Enroll in a professional development course',
    cost: 800,
    icon: 'graduation-cap',
    stock: 5,
    is_active: true
  }
];

const POLLS = [
  {
    id: 'poll-office-lunch',
    question: '🍽️ What should we have for team lunch?',
    options: ['Italian', 'Mexican', 'Asian Fusion', 'Vegetarian'],
    is_active: true
  },
  {
    id: 'poll-meeting-time',
    question: '⏰ Best time for weekly team meetings?',
    options: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
    is_active: true
  },
  {
    id: 'poll-next-retreat',
    question: '🏖️ Where should our team retreat be?',
    options: ['Mountain Resort', 'Beach Paradise', 'City Escape', 'Spa Resort'],
    is_active: true
  },
  {
    id: 'poll-game-night',
    question: '🎮 What games should we play at game night?',
    options: ['Board Games', 'Trivia', 'Card Games', 'Video Games'],
    is_active: true
  },
  {
    id: 'poll-improvement-area',
    question: '🎯 What area needs the most improvement?',
    options: ['Communication', 'Processes', 'Tools', 'Training'],
    is_active: true
  }
];

export async function POST(req) {
  try {
    console.log('[SEED] Starting database seeding via API...');

    // Seed Quests
    const { error: questError } = await supabase
      .from('quests')
      .upsert(QUESTS, { onConflict: 'id' });
    if (questError) throw new Error(`Quests: ${questError.message}`);
    console.log(`[SEED] ✅ Seeded ${QUESTS.length} quests`);

    // Seed Challenges
    const { error: challengeError } = await supabase
      .from('challenges')
      .upsert(CHALLENGES, { onConflict: 'id' });
    if (challengeError) throw new Error(`Challenges: ${challengeError.message}`);
    console.log(`[SEED] ✅ Seeded ${CHALLENGES.length} challenges`);

    // Seed Daily Tasks
    const { error: dailyTaskError } = await supabase
      .from('daily_tasks')
      .upsert(DAILY_TASKS, { onConflict: 'id' });
    if (dailyTaskError) throw new Error(`Daily Tasks: ${dailyTaskError.message}`);
    console.log(`[SEED] ✅ Seeded ${DAILY_TASKS.length} daily tasks`);

    // Seed Events
    const { error: eventError } = await supabase
      .from('events')
      .upsert(EVENTS, { onConflict: 'id' });
    if (eventError) throw new Error(`Events: ${eventError.message}`);
    console.log(`[SEED] ✅ Seeded ${EVENTS.length} events`);

    // Seed Rewards
    const { error: rewardError } = await supabase
      .from('rewards')
      .upsert(REWARDS, { onConflict: 'id' });
    if (rewardError) throw new Error(`Rewards: ${rewardError.message}`);
    console.log(`[SEED] ✅ Seeded ${REWARDS.length} rewards`);

    // Seed Polls
    const { error: pollError } = await supabase
      .from('polls')
      .upsert(POLLS, { onConflict: 'id' });
    if (pollError) throw new Error(`Polls: ${pollError.message}`);
    console.log(`[SEED] ✅ Seeded ${POLLS.length} polls`);

    return Response.json({
      success: true,
      message: 'Database seeding completed successfully!',
      summary: {
        quests: QUESTS.length,
        challenges: CHALLENGES.length,
        daily_tasks: DAILY_TASKS.length,
        events: EVENTS.length,
        rewards: REWARDS.length,
        polls: POLLS.length
      }
    });

  } catch (error) {
    console.error('[SEED] Error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
