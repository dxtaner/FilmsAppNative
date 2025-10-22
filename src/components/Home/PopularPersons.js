import React, { useEffect, useRef, useState } from 'react';
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
import { fetchPopularPersonsThunk } from '../../store/popularPerson/personThunk.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.round(width / 3.4);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

export default function PopularPersons({ navigation }) {
  const dispatch = useDispatch();
  const { popularPersons, loading, error } = useSelector(state => state.person);
  const [searchText, setSearchText] = useState('');
  const scales = useRef({}).current;

  useEffect(() => {
    dispatch(fetchPopularPersonsThunk());
  }, [dispatch]);

  const filteredPersons = popularPersons.filter(person =>
    person.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderPerson = ({ item }) => {
    const profileUri = item.profile_path
      ? `${IMAGE_BASE_URL}${item.profile_path}`
      : null;

    if (!scales[item.id]) scales[item.id] = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scales[item.id], {
        toValue: 0.93,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scales[item.id], {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={{ transform: [{ scale: scales[item.id] }], margin: 10 }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('PersonDetail', { id: item.id })}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.card}
        >
          {profileUri ? (
            <Image source={{ uri: profileUri }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Ionicons name="person" size={48} color="#777" />
            </View>
          )}

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
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
      {/* Başlık */}
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#000']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🎬 Popüler Oyuncular</Text>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchPerson')}
        >
          <Ionicons name="person-search-outline" size={20} color="#fff" />
          <Text style={styles.searchButtonText}>Kişi Ara</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Arama Kutusu */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Oyuncu ara..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Oyuncu Listesi */}
      <FlatList
        data={filteredPersons}
        renderItem={renderPerson}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aradığınız oyuncu bulunamadı 🎭</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },

  header: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#01b4e4',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(1,180,228,0.2)',
    borderColor: '#01b4e4',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 14,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    marginHorizontal: 12,
    marginVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: '#01b4e4',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
  },

  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
    shadowColor: '#01b4e4',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.55,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  department: {
    color: '#FFD166',
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    color: '#bbb',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});
