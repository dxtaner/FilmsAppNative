// src/components/Common/MovieCard.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

export default function MovieCard({ movie, onPress, genres = [] }) {
  const [showInfo, setShowInfo] = useState(false);

  const posterUri = movie?.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const getPopularityColor = vote => {
    const v = Math.min(Math.max(vote, 0), 10);
    const red = Math.round(255 - v * 25.5);
    const green = Math.round(v * 25.5);
    return `rgb(${red}, ${green}, 0)`;
  };

  const popularityColor = getPopularityColor(movie?.vote_average || 0);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress && onPress(movie?.id)}
      onPressIn={() => setShowInfo(true)}
      onPressOut={() => setShowInfo(false)}
    >
      {posterUri ? (
        <Image source={{ uri: posterUri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Ionicons name="film-outline" size={50} color="#888" />
        </View>
      )}

      {/* Sağ üst: Oy puanı */}
      <View style={[styles.voteContainer, { zIndex: 10 }]}>
        <Ionicons name="star" size={14} color={popularityColor} />
        <Text style={[styles.vote, { color: popularityColor }]}>
          {movie?.vote_average?.toFixed(1) || '-'}
        </Text>
      </View>

      {/* Gradient overlay sadece alt için */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradientOverlay}
      >
        {/* Sol alt: Başlık ve yıl */}
        <View style={styles.bottomContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {movie?.title || '—'}
          </Text>
          <Text style={styles.releaseYear}>
            {movie?.release_date ? movie.release_date.split('-')[0] : '—'}
          </Text>
        </View>
      </LinearGradient>

      {/* Info overlay (basılı tutulunca göster) */}
      {showInfo && (
        <View style={styles.infoOverlay}>
          <Text style={styles.overview} numberOfLines={4}>
            {movie?.overview || 'Bilgi yok.'}
          </Text>
          <View style={styles.genreRow}>
            {movie?.genre_ids?.map(id => {
              const genre = genres.find(g => g.id === id);
              return genre ? (
                <View key={genre.id} style={styles.genreChip}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ) : null;
            })}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 0.55,
    resizeMode: 'cover',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
  },
  voteContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  vote: {
    marginLeft: 4,
    fontWeight: '700',
    color: '#fff',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  releaseYear: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  infoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 12,
    justifyContent: 'center',
  },
  overview: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreChip: {
    backgroundColor: '#01b4e4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
});
