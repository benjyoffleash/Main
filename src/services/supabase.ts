import {Session, User} from '@supabase/supabase-js';
import {supabase} from './supabaseClient';
import {SessionRecord, UserProfile} from '../types';

export type SupabaseUser = User | null;

const AUDIO_BUCKET = 'audio';

// ── Auth ──

export async function signIn(email: string, password: string) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(
  email: string,
  password: string,
  displayName: string,
) {
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {data: {display_name: displayName}},
  });
  if (error) throw error;

  if (data.user) {
    await createUserProfile(data.user.id, email, displayName);
  }
  return data;
}

export async function signOut() {
  const {error} = await supabase.auth.signOut();
  if (error) throw error;
}

export function onAuthStateChanged(callback: (user: SupabaseUser) => void) {
  // Supabase onAuthStateChange does NOT fire on subscribe,
  // so we manually get the current session first
  supabase.auth.getSession().then(({data: {session}}) => {
    callback(session?.user ?? null);
  });

  const {
    data: {subscription},
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}

// ── User Profile ──

async function createUserProfile(
  userId: string,
  email: string,
  displayName: string,
) {
  const {error} = await supabase.from('profiles').insert({
    id: userId,
    email,
    display_name: displayName,
  });
  if (error) throw error;
}

export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  const {data, error} = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return {
    id: data.id,
    email: data.email,
    displayName: data.display_name,
    createdAt: new Date(data.created_at),
    totalSessions: data.total_sessions,
    totalMinutes: data.total_minutes,
    streak: data.streak,
    lastSessionDate: data.last_session_date
      ? new Date(data.last_session_date)
      : undefined,
  };
}

export async function updateUserStats(
  userId: string,
  durationListened: number,
) {
  const {error} = await supabase.rpc('update_user_stats', {
    p_user_id: userId,
    p_duration: Math.round(durationListened),
  });
  if (error) throw error;
}

// ── Sessions ──

export async function saveSession(session: Omit<SessionRecord, 'id'>) {
  const {error} = await supabase.from('sessions').insert({
    user_id: session.userId,
    track_id: session.trackId,
    track_type: session.trackType,
    started_at: session.startedAt.toISOString(),
    completed_at: session.completedAt?.toISOString(),
    duration_listened: session.durationListened,
  });
  if (error) throw error;
}

export async function getUserSessions(
  userId: string,
): Promise<SessionRecord[]> {
  const {data, error} = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', {ascending: false})
    .limit(50);

  if (error) throw error;
  return (data || []).map(row => ({
    id: row.id,
    userId: row.user_id,
    trackId: row.track_id,
    trackType: row.track_type,
    startedAt: new Date(row.started_at),
    completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
    durationListened: row.duration_listened,
  }));
}

// ── Audio Storage ──

export function getAudioUrl(path: string): string {
  const {data} = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
