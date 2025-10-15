import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SectionTitle from './SectionTitle';

export default function KeywordsSection({ keywords }) {
  if (!keywords || !keywords.length) return null;

  const handleKeywordPress = keyword => {
    console.log('Keyword seçildi:', keyword.name);
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Anahtar Kelimeler" />

      <FlatList
        data={keywords}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.keywordCard}
            activeOpacity={0.8}
            onPress={() => handleKeywordPress(item)}
          >
            <Text style={styles.keywordText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 15,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  keywordCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#333',
  },
  keywordText: {
    color: '#F9D342',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
});
