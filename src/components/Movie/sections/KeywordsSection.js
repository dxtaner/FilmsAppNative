import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SectionTitle from './SectionTitle';

export default function KeywordsSection({ keywords }) {
  if (!keywords || !keywords.length) return null;

  const handleKeywordPress = keyword => {
    console.log('Keyword seçildi:', keyword.name);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Anahtar Kelimeler" />

      <View style={styles.keywordsWrapper}>
        {keywords.map(item => (
          <TouchableOpacity
            key={item.id.toString()}
            style={styles.keywordChip}
            activeOpacity={0.7}
            onPress={() => handleKeywordPress(item)}
          >
            <Text style={styles.keywordText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  contentContainer: {},

  keywordsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  keywordChip: {
    backgroundColor: '#303030',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
    marginBottom: 8,

    borderWidth: 1,
    borderColor: '#444',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  keywordText: {
    color: '#F9D342',
    fontSize: 14,
    fontWeight: '700',
  },
});
