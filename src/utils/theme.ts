export const colors = {
  // Primary palette — calming, therapeutic tones
  primary: '#5B7B8A',       // Steel blue
  primaryDark: '#3D5A6E',   // Deep teal
  primaryLight: '#8FB3C4',  // Light sky
  accent: '#C4A882',        // Warm gold
  accentLight: '#E8D5B7',   // Soft cream

  // Backgrounds
  background: '#F7F4F0',    // Warm off-white
  surface: '#FFFFFF',
  surfaceElevated: '#FDFBF8',
  card: '#FFFFFF',

  // Text
  text: '#2C3E50',
  textSecondary: '#6B7C8A',
  textLight: '#9BAAB4',
  textOnPrimary: '#FFFFFF',

  // Semantic
  success: '#6BAF7A',
  error: '#D4726A',
  warning: '#E0A84D',

  // Player
  playerBackground: '#1A2E3A',
  playerText: '#E8E0D6',
  playerAccent: '#C4A882',
  progressTrack: '#3D5A6E',
  progressFill: '#C4A882',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    color: colors.text,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
    color: colors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color: colors.text,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: colors.textLight,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    lineHeight: 18,
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
};
