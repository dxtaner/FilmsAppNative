// src/components/UpComingMovies.js
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MovieCard from '../Common/MovieCard';

const { width } = Dimensions.get('window');

export default function UpComingMovies({ movies = [], loading = false }) {
  const navigation = useNavigation();

  const handleDetails = id => {
    if (!id) return console.warn('Movie id undefined!');
    navigation.navigate('MovieDetail', { id });
  };

  const renderItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={handleDetails}
      showRating={true}
      style={styles.cardWrapper}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD166" />
        <Text style={styles.loadingText}>Filmler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#2c3e50', '#4ca1af']} style={styles.container}>
      <Text style={styles.headerTitle}>🎬 Yaklaşan Filmler</Text>

      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Yaklaşan film bulunamadı 😔</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  headerTitle: {
    color: '#FFD166',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  list: {
    paddingBottom: 80,
  },
  cardWrapper: {
    marginBottom: 18,
    width: width * 0.92,
    alignSelf: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
  },
});
