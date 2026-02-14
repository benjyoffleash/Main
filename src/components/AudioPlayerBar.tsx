import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, borderRadius, spacing} from '../utils/theme';
import {formatDuration} from '../utils/formatTime';

interface AudioPlayerBarProps {
  title: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
}

export function AudioPlayerBar({
  title,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeekBackward,
  onSeekForward,
}: AudioPlayerBarProps) {
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.time}>{formatDuration(currentTime)}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
        </View>
        <Text style={styles.time}>{formatDuration(duration)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={onSeekBackward} style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏪</Text>
          <Text style={styles.controlLabel}>15s</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSeekForward} style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏩</Text>
          <Text style={styles.controlLabel}>15s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.playerBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.playerText,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  time: {
    color: colors.playerAccent,
    fontSize: 13,
    fontWeight: '500',
    width: 48,
    textAlign: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.progressTrack,
    borderRadius: 2,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.progressFill,
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
  },
  controlButton: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  controlIcon: {
    fontSize: 24,
  },
  controlLabel: {
    color: colors.playerText,
    fontSize: 11,
    marginTop: 2,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.playerAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 28,
  },
});
