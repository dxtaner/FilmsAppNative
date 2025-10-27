import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchMovieThunk,
  clearMovies,
} from '../../store/searchMovie/searchMovieSlice';

const SearchMovieBar = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(state => state.searchMovie);

  const handleSearch = text => {
    setQuery(text);
    if (text.length < 2) {
      dispatch(clearMovies());
      return;
    }
    dispatch(searchMovieThunk(text));
  };

  const handleSelect = id => {
    setQuery('');
    dispatch(clearMovies());
    navigation.navigate('MovieDetail', { id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={handleSearch}
        style={styles.input}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#01b4e4" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}
      {movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item.id)}
              style={styles.item}
              activeOpacity={0.7}
            >
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.releaseDate}>{item.release_date}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {query.length > 1 && !loading && movies.length === 0 && (
        <Text style={styles.noResult}>No movies found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#0d1117',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  list: {
    marginTop: 10,
    maxHeight: 250,
  },
  item: {
    padding: 12,
    backgroundColor: '#1b1b1b',
    borderRadius: 8,
    marginBottom: 6,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  releaseDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  noResult: {
    color: '#888',
    textAlign: 'center',
    marginTop: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loadingText: {
    color: '#01b4e4',
    marginLeft: 6,
  },
});

export default SearchMovieBar;
