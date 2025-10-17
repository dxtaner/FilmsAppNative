import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const { width } = Dimensions.get('window');

export default function MovieCreditsSection({ movieCredits }) {
  const navigation = useNavigation();

  if (!movieCredits) return null;

  const showDetails = movieId => {
    navigation.navigate('MovieDetail', { id: movieId });
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => showDetails(item.id)}
    >
      <Image
        source={
          item.poster_path
            ? { uri: IMAGE_BASE_URL + item.poster_path }
            : { uri: 'https://via.placeholder.com/120x180?text=No+Image' }
        }
        style={styles.poster}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title || item.name}
        </Text>
        {item.character && (
          <Text style={styles.subtitle}>🎭 {item.character}</Text>
        )}
        {item.job && <Text style={styles.subtitle}>🛠 {item.job}</Text>}
        {item.release_date && (
          <Text style={styles.infoText}>📅 {item.release_date}</Text>
        )}
        {item.vote_average != null && (
          <Text style={styles.infoText}>
            ⭐ {item.vote_average} ({item.vote_count})
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {movieCredits.cast?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>🎬 Film Kredileri (Oyuncu)</Text>
          <FlatList
            horizontal
            data={movieCredits.cast}
            keyExtractor={item => item.credit_id || item.id.toString()}
            renderItem={renderCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </>
      )}

      {movieCredits.crew?.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            🎬 Film Kredileri (Ekip)
          </Text>
          <FlatList
            horizontal
            data={movieCredits.crew}
            keyExtractor={item => item.credit_id || item.id.toString()}
            renderItem={renderCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', paddingVertical: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01b4e4',
    marginLeft: 16,
    marginBottom: 8,
  },
  card: {
    width: width * 0.4,
    marginRight: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  poster: {
    width: '100%',
    height: 200,
    backgroundColor: '#2a2a2a',
  },
  cardContent: { padding: 8 },
  title: {
    color: '#FFD166',
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  infoText: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
});
