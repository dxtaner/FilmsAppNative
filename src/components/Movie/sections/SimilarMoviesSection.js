import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SectionTitle from './SectionTitle';

const { width } = Dimensions.get('window');
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function SimilarMoviesSection({ movies }) {
  const navigation = useNavigation();

  if (!movies || movies.length === 0) return null;

  const handlePress = movieId => {
    navigation.push('MovieDetail', { id: movieId });
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Benzer Filmler" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {movies.map(movie => (
          <TouchableOpacity
            key={movie.id}
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => handlePress(movie.id)}
          >
            <Image
              source={{
                uri: movie.poster_path
                  ? `${IMAGE_BASE}${movie.poster_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image',
              }}
              style={styles.poster}
            />
            <View style={styles.infoContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {movie.title}
              </Text>
              <Text style={styles.rating}>
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.33,
    marginRight: 14,
    borderRadius: 14,
    backgroundColor: '#1c1c1c',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  rating: {
    color: '#FFD166',
    fontSize: 12,
    marginTop: 2,
  },
});
