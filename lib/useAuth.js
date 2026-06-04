import { useEffect, useState } from 'react';
import { supabase } from './supabase';

/**
 * Authentication hook with role-based access control
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('[AUTH] Initial session check:', session?.user?.id ? `User ${session.user.id}` : 'No session');

        if (session?.user) {
          setUser(session.user);

          // Get user role from database
          const { data, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (roleError && roleError.code !== 'PGRST116') {
            throw roleError;
          }

          const role = data?.role || 'member';
          setUserRole(role);
          setIsAdmin(role === 'admin' || role === 'moderator');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AUTH] State change event:', event, 'Session:', session?.user?.id ? `User ${session.user.id}` : 'No session');

        if (session?.user) {
          console.log('[AUTH] Setting user:', session.user.id);
          setUser(session.user);
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
          const role = data?.role || 'member';
          setUserRole(role);
          setIsAdmin(role === 'admin' || role === 'moderator');
        } else {
          console.log('[AUTH] Clearing user state');
          setUser(null);
          setUserRole(null);
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  /**
   * Sign up new user
   */
  const signUp = async (email, password, name) => {
    try {
      console.log('[AUTH] Starting signup for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        console.error('Supabase signup error details:', {
          code: error.code,
          message: error.message,
          status: error.status,
          fullError: error
        });
        throw new Error(error.message || 'Failed to create account');
      }

      console.log('[AUTH] Auth user created:', { id: data.user?.id, email: data.user?.email });

      // Create member profile with ALL required fields
      if (data.user) {
        console.log('[AUTH] Creating member profile for auth_id:', data.user.id);
        const { error: memberError, data: memberData } = await supabase.from('members').insert({
          auth_id: data.user.id,
          name: name || email.split('@')[0],
          email: email,
          total_xp: 0,
          monthly_xp: 0,
          all_time_xp: 0,
          login_streak: 0,
          last_login_date: null,
          login_history: [],
          badges: [],
          xp_history: [],
          quests_done: [],
          challenges_done: [],
          daily_completions: {},
          gem_hi_score: 0
        }).select();

        if (memberError) {
          console.error('Member creation error:', memberError);
          throw new Error(`Failed to create member: ${memberError.message}`);
        }

        console.log('[AUTH] Member created successfully:', memberData);

        // Set default role
        const { error: roleError } = await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: 'member'
        });

        if (roleError) {
          console.error('Role creation error:', roleError);
          // Role creation optional - member was created successfully
        }

        // Set user state for signup (user will need to sign in after)
        // Note: signUp doesn't automatically log the user in, they need to sign in next
        setUserRole('member');
        setIsAdmin(false);
      }

      return data;
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      throw err;
    }
  };

  /**
   * Sign in user
   */
  const signIn = async (email, password) => {
    try {
      console.log('[AUTH] Starting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('[AUTH] Sign in failed:', {
          code: error.code,
          message: error.message,
          status: error.status,
          fullError: error
        });
        throw new Error(error.message || 'Failed to sign in');
      }

      console.log('[AUTH] Sign in successful, data:', {
        user: data.session?.user?.id,
        hasSession: !!data.session
      });

      // Explicitly update user state immediately after successful sign in
      if (data.session?.user) {
        const userId = data.session.user.id;
        console.log('[AUTH] Setting user state for:', userId);
        setUser(data.session.user);

        // Link member to auth user if needed
        // This handles the case where a member was created without an auth_id
        const { data: existingMember } = await supabase
          .from('members')
          .select('id, auth_id')
          .eq('email', email)
          .single();

        if (existingMember && !existingMember.auth_id) {
          console.log('[AUTH] Linking member to auth user:', { memberId: existingMember.id, userId });
          await supabase
            .from('members')
            .update({ auth_id: userId })
            .eq('id', existingMember.id);
        }

        // Get user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .single();

        const role = roleData?.role || 'member';
        console.log('[AUTH] User role:', role);
        setUserRole(role);
        setIsAdmin(role === 'admin' || role === 'moderator');
      } else {
        console.warn('[AUTH] Sign in returned but no user in session');
      }

      return data;
    } catch (err) {
      console.error('[AUTH] Sign in error:', err.message);
      setError(err.message);
      throw err;
    }
  };

  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole(null);
      setIsAdmin(false);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role) => {
    if (!userRole) return false;
    if (userRole === 'admin') return true;
    return userRole === role;
  };

  return {
    user,
    userRole,
    isAdmin,
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    hasRole
  };
}
