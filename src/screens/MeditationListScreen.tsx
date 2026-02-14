import React, {useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TrackCard} from '../components/TrackCard';
import {CategoryFilter} from '../components/CategoryFilter';
import {sampleMeditations} from '../services/sampleData';
import {Meditation, MeditateStackParamList} from '../types';
import {colors, spacing, typography} from '../utils/theme';

type Nav = NativeStackNavigationProp<MeditateStackParamList, 'MeditationList'>;

export function MeditationListScreen() {
  const navigation = useNavigation<Nav>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(sampleMeditations.map(m => m.category))],
    [],
  );

  const filtered = useMemo(
    () =>
      selectedCategory
        ? sampleMeditations.filter(m => m.category === selectedCategory)
        : sampleMeditations,
    [selectedCategory],
  );

  const renderMeditation = ({item}: {item: Meditation}) => (
    <TrackCard
      title={item.title}
      description={item.description}
      duration={item.duration}
      category={item.category}
      subtitle={item.targetPart ? `Focus: ${item.targetPart}` : undefined}
      onPress={() =>
        navigation.navigate('MeditationPlayer', {meditation: item})
      }
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Meditate</Text>
        <Text style={styles.subtitle}>
          Guided meditations for your inner world
        </Text>
      </View>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderMeditation}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: 4,
  },
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
});
