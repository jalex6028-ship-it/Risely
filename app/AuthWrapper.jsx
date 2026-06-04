"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useRealtimeSync } from '@/lib/useRealtimeSync';
import { supabase } from '@/lib/supabase';

/**
 * Auth wrapper with login/signup screens
 * Manages authentication and passes auth state to the app
 */
export default function AuthWrapper({ children: InteractApp }) {
  const { user, userRole, isAdmin, isLoading, signUp, signIn, signOut, hasRole } = useAuth();
  const { quests, challenges, dailyTasks, events, rewards, members } = useRealtimeSync();

  const [authTab, setAuthTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      if (!email || !password || !name) {
        setAuthError('Please fill in all fields');
        return;
      }
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters');
        return;
      }

      await signUp(email, password, name);
      setEmail('');
      setPassword('');
      setName('');
      setAuthTab('login');
      setAuthError('✓ Account created! Please sign in.');
    } catch (err) {
      setAuthError(err.message || 'Sign up failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      if (!email || !password) {
        setAuthError('Please fill in all fields');
        return;
      }

      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setAuthError(err.message || 'Sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#e8eef5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3b9eff, #7c3aed)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '24px'
          }}>
            Interact
          </h1>
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid rgba(59, 158, 255, 0.2)',
            borderTop: '2px solid #3b9eff',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 0.8s linear infinite',
          }}>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated - show login/signup
  if (!user) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#e8eef5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(59, 158, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px 30px',
          backdropFilter: 'blur(10px)',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #3b9eff, #7c3aed)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '30px',
          }}>
            Interact
          </h1>

          {/* Tab Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button
              onClick={() => setAuthTab('login')}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '12px',
                background: authTab === 'login' ? 'linear-gradient(135deg, #3b9eff, #7c3aed)' : 'rgba(59, 158, 255, 0.1)',
                color: authTab === 'login' ? '#fff' : '#7f8fa3',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthTab('signup')}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '12px',
                background: authTab === 'signup' ? 'linear-gradient(135deg, #3b9eff, #7c3aed)' : 'rgba(59, 158, 255, 0.1)',
                color: authTab === 'signup' ? '#fff' : '#7f8fa3',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {authError && (
            <div style={{
              padding: '12px',
              background: authError.includes('✓') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${authError.includes('✓') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '8px',
              color: authError.includes('✓') ? '#22c55e' : '#ef4444',
              fontSize: '13px',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={authTab === 'login' ? handleSignIn : handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {authTab === 'signup' && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '12px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(59, 158, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e8eef5',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(59, 158, 255, 0.2)',
                borderRadius: '8px',
                color: '#e8eef5',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '12px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(59, 158, 255, 0.2)',
                borderRadius: '8px',
                color: '#e8eef5',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #3b9eff, #7c3aed)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: '600',
                fontSize: '14px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                marginTop: '8px',
              }}
            >
              {isSubmitting ? 'Loading...' : authTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#7f8fa3',
            marginTop: '20px',
          }}>
            {authTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => setAuthTab(authTab === 'login' ? 'signup' : 'login')}
              style={{ color: '#3b9eff', cursor: 'pointer', fontWeight: '600' }}
            >
              {authTab === 'login' ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Authenticated - show app with real-time data and role-based admin
  return (
    <InteractApp
      user={user}
      userRole={userRole}
      isAdmin={isAdmin}
      hasRole={hasRole}
      onLogout={signOut}
      realtimeData={{
        quests,
        challenges,
        dailyTasks,
        events,
        rewards,
        members,
      }}
    />
  );
}
