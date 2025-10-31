import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getRatingColor = vote => {
  if (vote >= 7) return '#00ff88';
  if (vote >= 4) return '#ffd700';
  return '#ff4c4c';
};

export default function CreditsCard({ item, onPress }) {
  const releaseDate = item.release_date || item.first_air_date || '-';
  const vote = item.vote_average;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item.id)}>
      <LinearGradient colors={['#1a1a1a', '#0d0d0d']} style={styles.card}>
        <Image
          source={
            item.poster_path
              ? { uri: IMAGE_BASE_URL + item.poster_path }
              : { uri: 'https://via.placeholder.com/120x180?text=No+Image' }
          }
          style={styles.poster}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name || item.title}
          </Text>
          {item.character && (
            <Text style={styles.subtitle}>🎭 {item.character}</Text>
          )}
          {item.job && <Text style={styles.subtitle}>🛠 {item.job}</Text>}
          <Text style={styles.info}>📅 {releaseDate}</Text>
          {vote != null && (
            <Text style={[styles.rating, { color: getRatingColor(vote) }]}>
              ⭐ {vote.toFixed(1)} ({item.vote_count})
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#00bfff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  poster: { width: '100%', height: 200, backgroundColor: '#2a2a2a' },
  cardContent: { padding: 8 },
  title: { color: '#FFD166', fontWeight: '700', fontSize: 14, marginBottom: 2 },
  subtitle: { color: '#ccc', fontSize: 12, marginTop: 2 },
  info: { color: '#bbb', fontSize: 12, marginTop: 2 },
  rating: { fontSize: 12.5, marginTop: 4, fontWeight: '600' },
});
