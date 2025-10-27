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

const StarRating = ({ rating }) => {
  const normalizedRating = Math.round((rating / 10) * 5);
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <Text
        key={i}
        style={[
          styles.star,
          i < normalizedRating ? styles.filledStar : styles.emptyStar,
        ]}
      >
        ★
      </Text>
    ));

  return <View style={styles.starRatingContainer}>{stars}</View>;
};

export default function ReviewsSection({ reviews }) {
  if (!reviews || !reviews.length) return null;

  const handlePress = url => {
    if (!url) return;
    Linking.openURL(url).catch(err =>
      console.error('Bağlantı açılamadı:', err),
    );
  };

  const renderReview = ({ item }) => {
    const authorName =
      item.author_details?.name ||
      item.author_details?.username ||
      item.author ||
      'Bilinmeyen Kullanıcı';

    const rating = item.author_details?.rating;
    const date = new Date(item.created_at).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return (
      <View style={styles.reviewCard}>
        <View style={styles.header}>
          <Text style={styles.author} numberOfLines={1}>
            {authorName}
          </Text>
          {rating ? (
            <View style={styles.ratingContainer}>
              <StarRating rating={rating} />
              <Text style={styles.ratingText}>{rating}/10</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.date}>{date}</Text>

        <Text style={styles.content} numberOfLines={5}>
          {item.content}
        </Text>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => handlePress(item.url)}
          activeOpacity={0.8}
        >
          <Text style={styles.linkText}>Tüm Yorumu Gör</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Kullanıcı Yorumları" />

      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={renderReview}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 35,
    marginBottom: 25,
  },
  listContent: {
    paddingTop: 5,
  },
  reviewCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  author: {
    color: '#F2F2F7',
    fontWeight: '800',
    fontSize: 17,
    flexShrink: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#303030',
  },
  ratingText: {
    color: '#FFD166',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 4,
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 15,
    marginHorizontal: 0.5,
  },
  filledStar: {
    color: '#FFD166',
  },
  emptyStar: {
    color: '#4A4A4A',
  },
  date: {
    color: '#9C9C9C',
    fontSize: 12,
    marginBottom: 10,
  },
  content: {
    color: '#E5E5EA',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 15,
  },
  linkButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD166',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 16,
    shadowColor: '#FFD166',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  linkText: {
    color: '#1C1C1E',
    fontSize: 14,
    fontWeight: '700',
  },
});
