import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AudioPlayerBar} from '../components/AudioPlayerBar';
import {LearnStackParamList} from '../types';
import {colors, spacing, typography, borderRadius} from '../utils/theme';

type Route = RouteProp<LearnStackParamList, 'EssayPlayer'>;

export function EssayPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const {essay} = route.params;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Simulate playback progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTime < essay.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, essay.duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, essay.duration]);

  const handlePlayPause = useCallback(() => setIsPlaying(p => !p), []);
  const handleSeekBackward = useCallback(
    () => setCurrentTime(t => Math.max(0, t - 15)),
    [],
  );
  const handleSeekForward = useCallback(
    () => setCurrentTime(t => Math.min(essay.duration, t + 15)),
    [essay.duration],
  );

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
          <Text style={styles.artworkEmoji}>📖</Text>
        </View>

        <Text style={styles.category}>{essay.category}</Text>
        <Text style={styles.title}>{essay.title}</Text>
        <Text style={styles.author}>by {essay.author}</Text>

        <View style={styles.topicsContainer}>
          {essay.topics.map(topic => (
            <View key={topic} style={styles.topicBadge}>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{essay.description}</Text>
      </ScrollView>

      <AudioPlayerBar
        title={essay.title}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={essay.duration}
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
    marginBottom: spacing.xs,
  },
  author: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  topicBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  topicText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '500',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 26,
  },
});
