import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchPersonThunk } from '../../store/searchPerson/searchPersonThunks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.round(width / 3.6);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

export default function SearchPerson({ navigation }) {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    state => state.searchPerson,
  );
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const scales = React.useRef({}).current;

  const handleSearch = () => {
    if (query.trim().length > 0) {
      dispatch(fetchSearchPersonThunk(query));
      setSearched(true);
    }
  };

  const renderPerson = ({ item }) => {
    const profileUri = item.profile_path
      ? `${IMAGE_BASE_URL}${item.profile_path}`
      : null;

    if (!scales[item.id]) scales[item.id] = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scales[item.id], {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scales[item.id], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={{ transform: [{ scale: scales[item.id] }], margin: 8 }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PersonDetail', { id: item.id })}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.card}
        >
          {profileUri ? (
            <Image source={{ uri: profileUri }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Ionicons name="person" size={50} color="#888" />
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.infoContainer}
          >
            <Text style={styles.name} numberOfLines={1}>
              {item.name || 'İsim yok'}
            </Text>
            {item.known_for_department && (
              <Text style={styles.department} numberOfLines={1}>
                {item.known_for_department}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Arama Alanı */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Oyuncu ara..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* 🔄 Yükleniyor */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#01b4e4" />
        </View>
      )}

      {/* ⚠️ Hata */}
      {error && (
        <View style={styles.center}>
          <Text style={styles.error}>Hata: {error}</Text>
        </View>
      )}

      {/* 🧑‍🎤 Sonuçlar */}
      {!loading && !error && (
        <>
          {searched && searchResults.length === 0 ? (
            <Text style={styles.emptyText}>Aradığınız oyuncu bulunamadı.</Text>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderPerson}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              contentContainerStyle={{ padding: 8, paddingBottom: 24 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
  },
  noImage: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  department: {
    color: '#FFD166',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});
