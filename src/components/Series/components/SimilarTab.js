import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

function getVoteColor(vote) {
  if (vote >= 7) return '#4CAF50';
  if (vote >= 4) return '#FFEB3B';
  return '#F44336';
}

export default function SimilarTab({ similar }) {
  const navigation = useNavigation();

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('SeriesDetail', { series_id: item.id })
      }
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: item.poster_path
            ? IMAGE_BASE_URL + item.poster_path
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.date}>
          {item.first_air_date ? item.first_air_date : 'Bilinmiyor'}
        </Text>
        <Text style={[styles.vote, { color: getVoteColor(item.vote_average) }]}>
          ⭐ {item.vote_average} ({item.vote_count})
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Benzer Diziler</Text>
      {similar && similar.length > 0 ? (
        <FlatList
          data={similar}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCard}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>Benzer dizi bilgisi bulunamadı.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b', paddingVertical: 10 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD166',
    marginBottom: 12,
    marginLeft: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: { width: '100%', height: 240, resizeMode: 'cover' },
  info: { padding: 8 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  date: { color: '#ccc', fontSize: 12, marginBottom: 2 },
  vote: { fontSize: 12, fontWeight: 'bold' },
  emptyText: { color: '#aaa', textAlign: 'center', marginTop: 20 },
});
