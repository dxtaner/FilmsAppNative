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

export default function CastTab({ credits }) {
  const navigation = useNavigation();
  const { cast = [], crew = [] } = credits || {};

  const people = [
    ...cast.map(person => ({ ...person, type: 'cast' })),
    ...crew.map(person => ({ ...person, type: 'crew' })),
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PersonDetail', { id: item.id })}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: item.profile_path
            ? IMAGE_BASE_URL + item.profile_path
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.role} numberOfLines={1}>
        {item.type === 'cast'
          ? `🎭 ${item.character || 'Bilinmiyor'}`
          : `🎬 ${item.job || item.department}`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Kadro & Yapım Ekibi</Text>
      {people.length > 0 ? (
        <FlatList
          data={people}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCard}
          numColumns={2} // 1 satırda 2 kart
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>Bilgi bulunamadı.</Text>
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
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    width: CARD_WIDTH,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  role: { color: '#ccc', fontSize: 12, textAlign: 'center', marginTop: 2 },
  emptyText: { color: '#aaa', textAlign: 'center', marginTop: 20 },
});
