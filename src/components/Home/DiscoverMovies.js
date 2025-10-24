import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscoverMoviesThunk } from '../../store/discoverMovies/discoverMoviesThunk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const { width, height } = require('react-native').Dimensions.get('window');
const CARD_WIDTH = Math.round(width / 2.3);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';
const TMDB_API_KEY = 'd30821539f8d65f6b806f308df58ae07';

const FILTER_FIELDS = [
  { key: 'include_adult', placeholder: 'Yetişkin İçerik', type: 'switch' },
  { key: 'include_video', placeholder: 'Video Dahil', type: 'switch' },
  { key: 'language', placeholder: 'Dil', type: 'text' },
  { key: 'primary_release_year', placeholder: 'Yıl', type: 'text' },
  { key: 'vote_average.gte', placeholder: 'Oy Ortalaması ≥', type: 'float' },
  { key: 'vote_average.lte', placeholder: 'Oy Ortalaması ≤', type: 'float' },
  { key: 'vote_count.gte', placeholder: 'Oy Sayısı ≥', type: 'float' },
  { key: 'vote_count.lte', placeholder: 'Oy Sayısı ≤', type: 'float' },
  { key: 'sort_by', placeholder: 'Sırala', type: 'select' },
  { key: 'with_genres', placeholder: 'Türleri Dahil Et', type: 'multi-select' },
  {
    key: 'without_genres',
    placeholder: 'Türleri Hariç Tut',
    type: 'multi-select',
  },
];

const SORT_OPTIONS = [
  { label: 'Popülerlik (Azalan)', value: 'popularity.desc' },
  { label: 'Popülerlik (Artan)', value: 'popularity.asc' },
  { label: 'Başlık A-Z', value: 'original_title.asc' },
  { label: 'Başlık Z-A', value: 'original_title.desc' },
  { label: 'Gelir (Artan)', value: 'revenue.asc' },
  { label: 'Gelir (Azalan)', value: 'revenue.desc' },
  { label: 'Yayın Tarihi (Eski-Yeni)', value: 'primary_release_date.asc' },
  { label: 'Yayın Tarihi (Yeni-Eski)', value: 'primary_release_date.desc' },
  { label: 'Başlık A-Z', value: 'title.asc' },
  { label: 'Başlık Z-A', value: 'title.desc' },
  { label: 'Oy Ortalaması (Artan)', value: 'vote_average.asc' },
  { label: 'Oy Ortalaması (Azalan)', value: 'vote_average.desc' },
  { label: 'Oy Sayısı (Artan)', value: 'vote_count.asc' },
  { label: 'Oy Sayısı (Azalan)', value: 'vote_count.desc' },
];

export default function DiscoverMovies({ navigation }) {
  const dispatch = useDispatch();
  const { moviesData, loading, error } = useSelector(
    state => state.discoverMovies,
  );

  const [filters, setFilters] = useState(
    FILTER_FIELDS.reduce(
      (acc, field) => {
        if (field.type === 'switch') acc[field.key] = false;
        else if (field.type === 'multi-select') acc[field.key] = [];
        else acc[field.key] = '';
        return acc;
      },
      { sort_by: 'popularity.desc' },
    ),
  );

  const [genres, setGenres] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // TMDB Genre çek
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=tr-TR`,
        );
        setGenres(res.data.genres);
      } catch (err) {
        console.log('Genre fetch error:', err);
      }
    };
    fetchGenres();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleGenreSelection = (key, id) => {
    setFilters(prev => {
      const selected = prev[key];
      if (selected.includes(id)) {
        return { ...prev, [key]: selected.filter(item => item !== id) };
      } else {
        return { ...prev, [key]: [...selected, id] };
      }
    });
  };

  const renderMovie = ({ item }) => {
    const posterUri = item.poster_path
      ? `${IMAGE_BASE_URL}${item.poster_path}`
      : null;

    const releaseYear = item.release_date
      ? item.release_date.split('-')[0]
      : '—';

    const getPopularityColor = vote => {
      const v = Math.min(Math.max(vote, 0), 10);
      const red = Math.round(255 - v * 25.5);
      const green = Math.round(v * 25.5);
      return `rgb(${red}, ${green}, 0)`;
    };

    const popularityColor = getPopularityColor(item.vote_average);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
        style={[
          styles.card,
          {
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          },
        ]}
      >
        {posterUri ? (
          <Image source={{ uri: posterUri }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Ionicons name="film-outline" size={50} color="#888" />
          </View>
        )}

        {/* Film bilgileri */}
        <View style={styles.cardFooter}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.vote, { color: popularityColor }]}>
            {item.vote_average.toFixed(2) || '-'}
          </Text>
        </View>

        {/* Ek bilgiler */}
        <View style={styles.extraInfo}>
          <Text style={styles.releaseYear}>{releaseYear}</Text>
          {item.genre_ids?.slice(0, 2).map(genreId => {
            const genre = genres.find(g => g.id === genreId);
            return genre ? (
              <View key={genre.id} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ) : null;
          })}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#01b4e4" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Hata: {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.filterHeader}>
        <Text style={styles.headerTitle}>Discover Movies</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="options-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={moviesData?.results || []}
        renderItem={renderMovie}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
      />

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtreler</Text>
            <ScrollView>
              {FILTER_FIELDS.map(field => (
                <View key={field.key} style={styles.filterRow}>
                  {(field.type === 'text' || field.type === 'float') && (
                    <TextInput
                      style={styles.filterInput}
                      placeholder={field.placeholder}
                      placeholderTextColor="#aaa"
                      keyboardType={
                        field.type === 'float' ? 'numeric' : 'default'
                      }
                      value={filters[field.key]?.toString()}
                      onChangeText={text => handleFilterChange(field.key, text)}
                    />
                  )}
                  {field.type === 'switch' && (
                    <View style={styles.switchContainer}>
                      <Text style={styles.switchText}>{field.placeholder}</Text>
                      <Switch
                        value={filters[field.key]}
                        onValueChange={val =>
                          handleFilterChange(field.key, val)
                        }
                        thumbColor={filters[field.key] ? '#01b4e4' : '#f4f3f4'}
                        trackColor={{ false: '#555', true: '#81b0ff' }}
                      />
                    </View>
                  )}
                  {field.type === 'select' && (
                    <View style={styles.selectContainer}>
                      <Text style={styles.selectLabel}>
                        {field.placeholder}
                      </Text>
                      <Picker
                        selectedValue={filters.sort_by}
                        onValueChange={value =>
                          handleFilterChange('sort_by', value)
                        }
                        style={styles.picker}
                        dropdownIconColor="#fff"
                      >
                        {SORT_OPTIONS.map(option => (
                          <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                  {field.type === 'multi-select' && (
                    <View style={styles.multiSelectContainer}>
                      <Text style={styles.selectLabel}>
                        {field.placeholder}
                      </Text>
                      <View style={styles.genresContainer}>
                        {genres.map(genre => {
                          const selected = filters[field.key].includes(
                            genre.id,
                          );
                          return (
                            <TouchableOpacity
                              key={genre.id}
                              style={[
                                styles.genreButton,
                                selected && styles.genreSelected,
                              ]}
                              onPress={() =>
                                toggleGenreSelection(field.key, genre.id)
                              }
                            >
                              <Text
                                style={[
                                  styles.genreText,
                                  selected && styles.genreTextSelected,
                                ]}
                              >
                                {genre.name}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setFilterModalVisible(false);
                  dispatch(fetchDiscoverMoviesThunk(filters));
                }}
              >
                <Text style={styles.applyText}>Uygula</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 8,
  },
  cardFooter: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraInfo: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  releaseYear: {
    color: '#fff',
    fontSize: 12,
    marginRight: 6,
    backgroundColor: '#333',
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  genreChip: {
    backgroundColor: '#01b4e4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
    marginTop: 2,
  },
  genreText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  image: { width: '100%', height: CARD_WIDTH * 1.5 },
  noImage: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 14, flex: 1 },
  vote: { color: '#ffd700', fontWeight: '700' },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  filterButton: { padding: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: height * 0.85,
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  filterRow: { marginBottom: 12 },
  filterInput: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchText: { color: '#fff', fontSize: 14 },
  selectContainer: { marginTop: 6 },
  selectLabel: { color: '#fff', marginBottom: 4 },
  picker: { backgroundColor: '#2a2a2a', color: '#fff', borderRadius: 12 },
  multiSelectContainer: { marginTop: 6 },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  genreButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    margin: 4,
  },
  genreSelected: { backgroundColor: '#01b4e4' },
  genreTextSelected: { color: '#fff', fontWeight: '700' },
  applyButton: {
    marginTop: 12,
    backgroundColor: '#01b4e4',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  applyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
