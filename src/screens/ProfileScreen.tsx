import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../hooks/useAuth';
import {signIn, signUp, signOut} from '../services/supabase';
import {colors, spacing, typography, borderRadius} from '../utils/theme';

export function ProfileScreen() {
  const {user, loading} = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Signed-in view ──
  if (user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.profileContent}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(user.user_metadata?.display_name || user.email || '?')[0].toUpperCase()}
            </Text>
          </View>

          <Text style={styles.nameText}>
            {user.user_metadata?.display_name || 'Meditator'}
          </Text>
          <Text style={styles.emailText}>{user.email}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => signOut()}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Auth form ──
  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (isSignUp && !displayName.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(email.trim(), password, displayName.trim());
      } else {
        await signIn(email.trim(), password);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.authContent}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.authTitle}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Text>
          <Text style={styles.authSubtitle}>
            {isSignUp
              ? 'Start your IFS meditation journey'
              : 'Sign in to track your progress'}
          </Text>

          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor={colors.textLight}
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={submitting}>
            <Text style={styles.submitText}>
              {submitting
                ? 'Please wait...'
                : isSignUp
                ? 'Create Account'
                : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsSignUp(s => !s)}
            style={styles.toggleButton}>
            <Text style={styles.toggleText}>
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },

  // Profile
  profileContent: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  nameText: {
    ...typography.h2,
    marginBottom: 4,
  },
  emailText: {
    ...typography.bodySmall,
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    ...typography.h1,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    marginTop: 4,
  },
  signOutButton: {
    paddingVertical: spacing.sm,
  },
  signOutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '500',
  },

  // Auth
  authContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
  },
  authTitle: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  authSubtitle: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E0D8CF',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  toggleText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '500',
  },
});
