import React, { useRef } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = Math.round(width * 0.85);
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

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], marginBottom: 16 }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress?.(movie?.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.95)']}
              style={styles.gradient}
            >
              <View style={styles.row}>
                <Text style={styles.title} numberOfLines={2}>
                  {movie?.title ?? movie?.name ?? 'İsim yok'}
                </Text>
                {showRating && (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStar}>⭐</Text>
                    <Text style={styles.ratingText}>
                      {movie?.vote_average
                        ? movie.vote_average.toFixed(1)
                        : '-'}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.year}>
                {movie?.release_date ? movie.release_date.slice(0, 4) : '—'}
              </Text>
              {movie?.origin_country && (
                <Text style={styles.country}>
                  {movie.origin_country.join(', ')}
                </Text>
              )}
              {movie?.overview && (
                <Text style={styles.overview} numberOfLines={3}>
                  {movie.overview}
                </Text>
              )}
            </LinearGradient>
          </ImageBackground>
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#121212',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: CARD_HEIGHT,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 14,
  },
  gradient: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd16633',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingStar: {
    color: '#FFD166',
    marginRight: 2,
    fontSize: 14,
  },
  ratingText: {
    color: '#FFD166',
    fontWeight: '700',
    fontSize: 13,
  },
  year: {
    color: '#d0d0d0',
    marginTop: 4,
    fontSize: 13,
  },
  country: {
    color: '#ffd166',
    fontSize: 12,
    marginTop: 2,
  },
  overview: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  noImage: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#888',
    fontSize: 14,
  },
});
