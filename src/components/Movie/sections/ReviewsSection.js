import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import SectionTitle from './SectionTitle';

export default function ReviewsSection({ reviews }) {
  if (!reviews || !reviews.length) return null;

  const handlePress = url => {
    if (!url) return;
    Linking.openURL(url).catch(err =>
      console.error('Bağlantı açılamadı:', err),
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Yorumlar" />

      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const authorName =
            item.author_details?.name ||
            item.author_details?.username ||
            item.author ||
            'Bilinmeyen Kullanıcı';

          const rating = item.author_details?.rating;
          const date = new Date(item.created_at).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          });

          return (
            <View style={styles.reviewCard}>
              <View style={styles.header}>
                <Text style={styles.author}>{authorName}</Text>
                {rating ? (
                  <Text style={styles.rating}>⭐ {rating}/10</Text>
                ) : null}
              </View>

              <Text style={styles.date}>{date}</Text>

              <Text style={styles.content} numberOfLines={6}>
                {item.content}
              </Text>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => handlePress(item.url)}
                activeOpacity={0.7}
              >
                <Text style={styles.linkText}>Devamını Oku</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#1b1b1b',
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: '#FFD166',
    fontWeight: '700',
    fontSize: 15,
  },
  rating: {
    color: '#F9D342',
    fontWeight: '600',
    fontSize: 13,
  },
  date: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 3,
    marginBottom: 6,
  },
  content: {
    color: '#f2f2f2',
    fontSize: 14,
    lineHeight: 20,
  },
  linkButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#FFD16622',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FFD16655',
  },
  linkText: {
    color: '#FFD166',
    fontSize: 13,
    fontWeight: '600',
  },
});
