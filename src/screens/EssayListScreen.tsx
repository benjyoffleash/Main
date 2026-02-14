import React, {useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TrackCard} from '../components/TrackCard';
import {CategoryFilter} from '../components/CategoryFilter';
import {sampleEssays} from '../services/sampleData';
import {Essay, LearnStackParamList} from '../types';
import {colors, spacing, typography} from '../utils/theme';

type Nav = NativeStackNavigationProp<LearnStackParamList, 'EssayList'>;

export function EssayListScreen() {
  const navigation = useNavigation<Nav>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(sampleEssays.map(e => e.category))],
    [],
  );

  const filtered = useMemo(
    () =>
      selectedCategory
        ? sampleEssays.filter(e => e.category === selectedCategory)
        : sampleEssays,
    [selectedCategory],
  );

  const renderEssay = ({item}: {item: Essay}) => (
    <TrackCard
      title={item.title}
      description={item.description}
      duration={item.duration}
      category={item.category}
      subtitle={item.topics.join(' · ')}
      onPress={() => navigation.navigate('EssayPlayer', {essay: item})}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Learn IFS</Text>
        <Text style={styles.subtitle}>
          Audio essays to deepen your understanding
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
        renderItem={renderEssay}
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
