import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function KeywordsTab({ keywords }) {
  const results = keywords || [];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {results.length > 0 ? (
        results.map(keyword => (
          <TouchableOpacity
            key={keyword.id}
            activeOpacity={0.7}
            style={styles.keywordCard}
          >
            <Text style={styles.keywordText}>{keyword.name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>🔍 Anahtar kelime bulunamadı.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'center',
  },
  keywordCard: {
    backgroundColor: '#FFD16633', // sarı transparan
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  keywordText: {
    color: '#FFD166',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    width: '100%',
    marginTop: 30,
    fontSize: 16,
  },
});
