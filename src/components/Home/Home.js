import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getTopMovies } from '../../store/topRated/topRatedThunk.js';
import TopRatedMovies from './TopRatedMovies';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const topRatedState = useSelector(state => state.topRated);

  useEffect(() => {
    dispatch(getTopMovies());
  }, [dispatch]);

  const showDetails = movieId => {
    if (!movieId) return console.warn('Movie id undefined!');
    navigation.navigate('MovieDetail', { id: movieId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {topRatedState.loading && !topRatedState.items.length ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#01b4e4" />
          <Text style={styles.loadingText}>Filmler yükleniyor...</Text>
        </View>
      ) : (
        <TopRatedMovies
          movies={topRatedState.items}
          loading={topRatedState.loading}
          handleDetails={showDetails}
        />
      )}

      {topRatedState.error && (
        <Text style={styles.errorText}>Hata: {topRatedState.error}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
  },
});
