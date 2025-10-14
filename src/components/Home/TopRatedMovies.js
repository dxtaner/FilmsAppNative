import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MovieCard from '../Common/MovieCard';
import { useNavigation } from '@react-navigation/native';

export default function TopRatedMovies({ movies = [] }) {
  const navigation = useNavigation();

  const handleDetails = id => {
    if (!id) {
      console.warn('Movie id undefined!');
      return;
    }
    console.log('Navigating to movie id:', id);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  list: {
    paddingTop: 6,
  },
  cardWrapper: {},
});
