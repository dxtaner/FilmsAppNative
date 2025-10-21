import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UpComingMovies from './UpComingMovies';
import { fetchUpcomingMovies } from '../../store/upComing/upComingThunk';

export default function UpComingMoviesScreen() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(state => state.upComing);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  if (loading && movies.length === 0)
    return (
      <ActivityIndicator
        size="large"
        color="#FFD166"
        style={{ marginTop: 50 }}
      />
    );

  if (error)
    return (
      <Text style={{ marginTop: 50, color: 'red', textAlign: 'center' }}>
        Error: {error}
      </Text>
    );

  return (
    <View style={styles.container}>
      <UpComingMovies movies={movies} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 10 },
});
