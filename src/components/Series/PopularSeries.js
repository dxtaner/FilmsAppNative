import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularSeries } from '../../store/popularSeries/popularSeriesThunk';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.95;
const CARD_HEIGHT = CARD_WIDTH * 0.93;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function PopularSeries() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { series, loading, error } = useSelector(state => state.popularSeries);

  useEffect(() => {
    dispatch(fetchPopularSeries());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('SeriesDetail', { series_id: item.id })
      }
    >
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}${item.backdrop_path || item.poster_path}`,
        }}
        style={styles.image}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      >
        <View style={styles.infoBox}>
          <Text style={styles.title} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.country}>
            🌍 {item.origin_country?.join(', ') || 'Bilinmiyor'}
          </Text>

          <Text style={styles.overview} numberOfLines={3}>
            {item.overview || 'Açıklama mevcut değil.'}
          </Text>

          <View style={styles.stats}>
            <Text style={styles.rating}>
              ⭐ {item.vote_average?.toFixed(1) || '-'}
            </Text>
            <Text style={styles.voteCount}>👥 {item.vote_count}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Hata: {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={series}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#111',
    shadowColor: '#00bfff',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  infoBox: {
    backgroundColor: 'rgba(10,10,10,0.55)',
    borderRadius: 12,
    padding: 12,
    margin: 10,
  },
  title: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 4,
  },
  country: {
    color: '#b0c4de',
    fontSize: 13,
    marginBottom: 6,
  },
  overview: {
    color: '#e5e5e5',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
    opacity: 0.9,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  voteCount: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
