import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = Math.round(width * 0.55);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({
  movie,
  onPress,
  showRating = true,
  style,
}) {
  const posterUri = movie?.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(movie?.id)}
      style={[styles.card, style]}
    >
      {posterUri ? (
        <ImageBackground
          source={{ uri: posterUri }}
          style={styles.image}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.gradient}
          >
            <View style={styles.row}>
              <Text style={styles.title} numberOfLines={2}>
                {movie?.title ?? movie?.name ?? 'İsim yok'}
              </Text>
              {showRating && (
                <Text style={styles.rating}>
                  ⭐ {movie?.vote_average ? movie.vote_average.toFixed(1) : '-'}
                </Text>
              )}
            </View>
            <Text style={styles.year}>
              {movie?.release_date ? movie.release_date.slice(0, 4) : '—'}
            </Text>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: '#000',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: CARD_HEIGHT,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  gradient: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  rating: {
    color: '#ffd166',
    fontSize: 14,
    fontWeight: '700',
  },
  year: {
    color: '#d0d0d0',
    marginTop: 6,
    fontSize: 13,
  },
  noImage: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#555',
    fontSize: 14,
  },
});
