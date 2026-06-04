import { useEffect, useState, useRef } from 'react';
import { supabase } from './supabase';
import { convertSupabaseToMemory } from './fieldConversion';

/**
 * Real-time subscription hook for instant sync across all clients
 * Any admin changes appear immediately for everyone
 */
export function useRealtimeSync() {
  const [quests, setQuests] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [polls, setPolls] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const subscriptionsRef = useRef([]);
  const setupInProgressRef = useRef(false);

  useEffect(() => {
    const setupSubscriptions = async () => {
      // Prevent duplicate subscriptions
      if (setupInProgressRef.current || subscriptionsRef.current.length > 0) {
        return;
      }

      setupInProgressRef.current = true;

      try {
        // Load initial data
        const [questsData, challengesData, tasksData, eventsData, rewardsData, pollsData, membersData] = await Promise.all([
          supabase.from('quests').select('*').eq('is_active', true),
          supabase.from('challenges').select('*').eq('is_active', true),
          supabase.from('daily_tasks').select('*').eq('is_active', true),
          supabase.from('events').select('*').eq('is_active', true),
          supabase.from('rewards').select('*'),
          supabase.from('polls').select('*'),
          supabase.from('members').select('*')
        ]);

        if (questsData.data) setQuests(questsData.data);
        if (challengesData.data) setChallenges(challengesData.data);
        if (tasksData.data) setDailyTasks(tasksData.data);
        if (eventsData.data) setEvents(eventsData.data);
        if (rewardsData.data) setRewards(rewardsData.data);
        if (pollsData.data) setPolls(pollsData.data);

        // Log members data for debugging
        if (membersData.data && membersData.data.length > 0) {
          console.log('[REALTIME-SYNC] Members fetched: ' + membersData.data.length + ' total');
          const firstMember = membersData.data[0];
          console.log('[REALTIME-SYNC] First member ID: ' + firstMember.id + ', auth_id: ' + firstMember.auth_id + ', name: ' + firstMember.name);
          const authIds = membersData.data.map(m => m.auth_id).filter(id => id);
          console.log('[REALTIME-SYNC] Member auth_ids: ' + JSON.stringify(authIds));
        } else {
          console.log('[REALTIME-SYNC] No members found. Error: ' + (membersData.error?.message || 'none'));
        }

        if (membersData.data) {
          setMembers(membersData.data.map(convertSupabaseToMemory));
        } else if (membersData.error) {
          console.error('[REALTIME-SYNC] Error fetching members:', membersData.error);
        }

        // Subscribe to real-time changes
        const questSub = supabase
          .channel('quests-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'quests' },
            (payload) => {
              setQuests(prev => {
                const updated = [...prev];
                if (payload.eventType === 'INSERT') {
                  return [payload.new, ...updated];
                } else if (payload.eventType === 'UPDATE') {
                  return updated.map(q => q.id === payload.new.id ? payload.new : q);
                } else if (payload.eventType === 'DELETE') {
                  return updated.filter(q => q.id !== payload.old.id);
                }
                return updated;
              });
            }
          )
          .subscribe();

        const challengeSub = supabase
          .channel('challenges-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'challenges' },
            (payload) => {
              setChallenges(prev => {
                if (payload.eventType === 'INSERT') {
                  return [payload.new, ...prev];
                } else if (payload.eventType === 'UPDATE') {
                  return prev.map(c => c.id === payload.new.id ? payload.new : c);
                } else if (payload.eventType === 'DELETE') {
                  return prev.filter(c => c.id !== payload.old.id);
                }
                return prev;
              });
            }
          )
          .subscribe();

        const taskSub = supabase
          .channel('daily_tasks-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'daily_tasks' },
            (payload) => {
              setDailyTasks(prev => {
                if (payload.eventType === 'INSERT') {
                  return [payload.new, ...prev];
                } else if (payload.eventType === 'UPDATE') {
                  return prev.map(t => t.id === payload.new.id ? payload.new : t);
                } else if (payload.eventType === 'DELETE') {
                  return prev.filter(t => t.id !== payload.old.id);
                }
                return prev;
              });
            }
          )
          .subscribe();

        const eventSub = supabase
          .channel('events-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'events' },
            (payload) => {
              setEvents(prev => {
                if (payload.eventType === 'INSERT') {
                  return [payload.new, ...prev];
                } else if (payload.eventType === 'UPDATE') {
                  return prev.map(e => e.id === payload.new.id ? payload.new : e);
                } else if (payload.eventType === 'DELETE') {
                  return prev.filter(e => e.id !== payload.old.id);
                }
                return prev;
              });
            }
          )
          .subscribe();

        const memberSub = supabase
          .channel('members-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'members' },
            (payload) => {
              setMembers(prev => {
                if (payload.eventType === 'INSERT') {
                  return [convertSupabaseToMemory(payload.new), ...prev];
                } else if (payload.eventType === 'UPDATE') {
                  return prev.map(m => m.id === payload.new.id ? convertSupabaseToMemory(payload.new) : m);
                } else if (payload.eventType === 'DELETE') {
                  return prev.filter(m => m.id !== payload.old.id);
                }
                return prev;
              });
            }
          )
          .subscribe();

        subscriptionsRef.current = [questSub, challengeSub, taskSub, eventSub, memberSub];

        setIsLoading(false);
        setupInProgressRef.current = false;
      } catch (err) {
        console.error('Failed to setup subscriptions:', err);
        setIsLoading(false);
        setupInProgressRef.current = false;
      }
    };

    setupSubscriptions();

    return () => {
      subscriptionsRef.current.forEach(sub => {
        supabase.removeChannel(sub);
      });
    };
  }, []);

  return {
    quests,
    challenges,
    dailyTasks,
    events,
    rewards,
    polls,
    members,
    isLoading,
    setQuests,
    setChallenges,
    setDailyTasks,
    setEvents,
    setRewards,
    setPolls,
    setMembers
  };
}
