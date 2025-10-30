import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default function ReviewsTab({ reviews }) {
  const results = reviews || [];

  const openReview = url => {
    if (url) Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openReview(item.url)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.author}>{item.author || 'Bilinmeyen'}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.content} numberOfLines={6}>
        {item.content || 'İçerik bulunamadı.'}
      </Text>
      <Text style={styles.readMore}>🔗 Devamını oku</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.emptyText}>📝 Review bulunamadı.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1F2F',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  author: { color: '#FFD166', fontWeight: 'bold', fontSize: 14 },
  date: { color: '#ccc', fontSize: 12 },
  content: { color: '#fff', fontSize: 14, lineHeight: 20 },
  readMore: {
    marginTop: 6,
    color: '#FFD166',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#aaa',
    fontSize: 16,
  },
});
