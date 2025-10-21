// src/components/TopRatedMovies.js
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

export default function TopRatedMovies({ movies = [], loading = false }) {
  const navigation = useNavigation();

  const handleDetails = id => {
    if (!id) {
      console.warn('Movie id undefined!');
      return;
    }
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
    <LinearGradient
      colors={['#eef1f3ff', '#4ea5c2ff', '#2c5364']}
      style={styles.container}
    >
      <Text style={styles.headerTitle}>⭐ En Yüksek Puan Alan Filmler</Text>

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
          <Text style={styles.emptyText}>Henüz film bulunamadı 🎥</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#FFD166',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  list: {
    paddingBottom: 60,
  },
  cardWrapper: {
    marginBottom: 16,
    width: width * 0.92,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: '#bbb',
    fontSize: 16,
    textAlign: 'center',
  },
});
