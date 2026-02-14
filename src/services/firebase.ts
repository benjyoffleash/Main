import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {SessionRecord, UserProfile} from '../types';

// ── Auth ──

export async function signIn(email: string, password: string) {
  return auth().signInWithEmailAndPassword(email, password);
}

export async function signUp(email: string, password: string, displayName: string) {
  const credential = await auth().createUserWithEmailAndPassword(email, password);
  await credential.user.updateProfile({displayName});
  await createUserProfile(credential.user, displayName);
  return credential;
}

export async function signOut() {
  return auth().signOut();
}

export function onAuthStateChanged(
  callback: (user: FirebaseAuthTypes.User | null) => void,
) {
  return auth().onAuthStateChanged(callback);
}

// ── User Profile ──

async function createUserProfile(
  user: FirebaseAuthTypes.User,
  displayName: string,
) {
  const profile: Omit<UserProfile, 'id'> = {
    email: user.email!,
    displayName,
    createdAt: new Date(),
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
  };
  await firestore().collection('users').doc(user.uid).set(profile);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const doc = await firestore().collection('users').doc(userId).get();
  if (!doc.exists) return null;
  return {id: doc.id, ...doc.data()} as UserProfile;
}

export async function updateUserStats(
  userId: string,
  durationListened: number,
) {
  const userRef = firestore().collection('users').doc(userId);
  await firestore().runTransaction(async transaction => {
    const userDoc = await transaction.get(userRef);
    if (!userDoc.exists) return;

    const data = userDoc.data()!;
    const today = new Date().toDateString();
    const lastSession = data.lastSessionDate?.toDate?.()?.toDateString?.();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let streak = data.streak || 0;
    if (lastSession === yesterday) {
      streak += 1;
    } else if (lastSession !== today) {
      streak = 1;
    }

    transaction.update(userRef, {
      totalSessions: (data.totalSessions || 0) + 1,
      totalMinutes: (data.totalMinutes || 0) + Math.round(durationListened / 60),
      streak,
      lastSessionDate: new Date(),
    });
  });
}

// ── Sessions ──

export async function saveSession(session: Omit<SessionRecord, 'id'>) {
  return firestore().collection('sessions').add(session);
}

export async function getUserSessions(userId: string): Promise<SessionRecord[]> {
  const snapshot = await firestore()
    .collection('sessions')
    .where('userId', '==', userId)
    .orderBy('startedAt', 'desc')
    .limit(50)
    .get();

  return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as SessionRecord));
}

// ── Content ──

export async function getAudioUrl(path: string): Promise<string> {
  return storage().ref(path).getDownloadURL();
}
