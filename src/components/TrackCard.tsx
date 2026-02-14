import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, spacing, borderRadius, typography} from '../utils/theme';
import {formatMinutes} from '../utils/formatTime';

interface TrackCardProps {
  title: string;
  description: string;
  duration: number;
  category: string;
  subtitle?: string;
  onPress: () => void;
}

export function TrackCard({
  title,
  description,
  duration,
  category,
  subtitle,
  onPress,
}: TrackCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.duration}>{formatMinutes(duration)}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  duration: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  title: {
    ...typography.h3,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.primary,
    marginBottom: 4,
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
