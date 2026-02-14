export interface AudioTrack {
  id: string;
  title: string;
  description: string;
  duration: number; // seconds
  audioUrl: string;
  imageUrl?: string;
  category: string;
}

export interface Essay extends AudioTrack {
  author: string;
  topics: string[];
}

export interface Meditation extends AudioTrack {
  type: 'guided' | 'unguided';
  targetPart?: string; // IFS part being addressed (e.g., "inner critic", "exile")
  intention?: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  trackId: string;
  trackType: 'essay' | 'meditation';
  startedAt: Date;
  completedAt?: Date;
  durationListened: number; // seconds
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  totalSessions: number;
  totalMinutes: number;
  streak: number;
  lastSessionDate?: Date;
}

export type RootTabParamList = {
  Learn: undefined;
  Meditate: undefined;
  Profile: undefined;
};

export type LearnStackParamList = {
  EssayList: undefined;
  EssayPlayer: {essay: Essay};
};

export type MeditateStackParamList = {
  MeditationList: undefined;
  MeditationPlayer: {meditation: Meditation};
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
