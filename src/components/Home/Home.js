import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getPopular } from '../../store/popular/popularThunk.js';
import { getTopMovies } from '../../store/topRated/topRatedThunk.js';

import PopularMoviesCarousel from './PopularMoviesCarousel';
import TopRatedMovies from './TopRatedMovies';
import Footer from '../Common/Footer.js';

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const popularState = useSelector(state => state.popular);
  const topRatedState = useSelector(state => state.topRated);

  useEffect(() => {
    dispatch(getPopular());
    dispatch(getTopMovies());
  }, [dispatch]);

  const showDetails = movieId => {
    navigation.navigate('MovieDetails', { id: movieId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Popüler Filmler (Carousel) */}
        <Text style={styles.sectionTitle}>Popüler Filmler</Text>
        {popularState.loading && !popularState.items.length ? (
          <ActivityIndicator
            size="large"
            color="#01b4e4"
            style={{ marginTop: 16 }}
          />
        ) : (
          <>
            <PopularMoviesCarousel movies={popularState.items} />
            {popularState.error && (
              <Text style={styles.errorText}>Hata: {popularState.error}</Text>
            )}
          </>
        )}

        {/* En Çok Puanlanan Filmler (Liste) */}
        <Text style={styles.sectionTitle}>En Çok Puanlanan Filmler</Text>
        {topRatedState.loading && !topRatedState.items.length ? (
          <ActivityIndicator
            size="large"
            color="#01b4e4"
            style={{ marginTop: 16 }}
          />
        ) : (
          <>
            <TopRatedMovies
              movies={topRatedState.items}
              handleDetails={showDetails}
            />
            {topRatedState.error && (
              <Text style={styles.errorText}>Hata: {topRatedState.error}</Text>
            )}
          </>
        )}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { paddingVertical: 10, paddingBottom: 30 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#01b4e4',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },
});
