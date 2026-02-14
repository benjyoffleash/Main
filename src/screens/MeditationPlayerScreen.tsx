import React, {useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AudioPlayerBar} from '../components/AudioPlayerBar';
import {useTrackPlayer} from '../hooks/useTrackPlayer';
import {MeditateStackParamList} from '../types';
import {colors, spacing, typography, borderRadius} from '../utils/theme';

type Route = RouteProp<MeditateStackParamList, 'MeditationPlayer'>;

export function MeditationPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const {meditation} = route.params;

  const {isPlaying, position, duration, playTrack, togglePlayPause, seekBy} =
    useTrackPlayer();

  useEffect(() => {
    playTrack(meditation);
  }, [meditation, playTrack]);

  const handlePlayPause = useCallback(() => togglePlayPause(), [togglePlayPause]);
  const handleSeekBackward = useCallback(() => seekBy(-15), [seekBy]);
  const handleSeekForward = useCallback(() => seekBy(15), [seekBy]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}>
        <View style={styles.artworkPlaceholder}>
          <Text style={styles.artworkEmoji}>🧘</Text>
        </View>

        <Text style={styles.category}>{meditation.category}</Text>
        <Text style={styles.title}>{meditation.title}</Text>

        {meditation.targetPart && (
          <View style={styles.partBadge}>
            <Text style={styles.partText}>
              Focus: {meditation.targetPart}
            </Text>
          </View>
        )}

        {meditation.intention && (
          <View style={styles.intentionContainer}>
            <Text style={styles.intentionLabel}>Intention</Text>
            <Text style={styles.intentionText}>{meditation.intention}</Text>
          </View>
        )}

        <Text style={styles.description}>{meditation.description}</Text>
      </ScrollView>

      <AudioPlayerBar
        title={meditation.title}
        isPlaying={isPlaying}
        currentTime={position}
        duration={duration || meditation.duration}
        onPlayPause={handlePlayPause}
        onSeekBackward={handleSeekBackward}
        onSeekForward={handleSeekForward}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  artworkPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  artworkEmoji: {
    fontSize: 64,
  },
  category: {
    ...typography.label,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  partBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  partText: {
    ...typography.bodySmall,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  intentionContainer: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  intentionLabel: {
    ...typography.label,
    color: colors.accent,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  intentionText: {
    ...typography.body,
    color: colors.text,
    fontStyle: 'italic',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 26,
  },
});
