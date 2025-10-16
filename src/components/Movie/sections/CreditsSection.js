import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SectionTitle from './SectionTitle';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function CreditsSection({ credits }) {
  const navigation = useNavigation();

  if (!credits) return null;

  const { cast, crew } = credits;

  if ((!cast || !cast.length) && (!crew || !crew.length)) return null;

  const getGender = gender => {
    if (gender === 1) return 'Female';
    if (gender === 2) return 'Male';
    return 'Unknown';
  };

  const renderCard = item => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PersonDetail', { id: item.id })}
      style={styles.cardContainer}
    >
      {item.profile_path ? (
        <Image
          source={{ uri: IMAGE_BASE_URL + item.profile_path }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.role} numberOfLines={1}>
        {item.character || item.job}
      </Text>
      <Text style={styles.info}>
        {getGender(item.gender)} | ⭐ {item.popularity?.toFixed(1) || '-'}
      </Text>
    </TouchableOpacity>
  );

  const renderList = (data, title) => (
    <>
      <Text style={styles.subTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item =>
          item.cast_id?.toString() || item.credit_id || item.id.toString()
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        renderItem={({ item }) => renderCard(item)}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <SectionTitle title="Oyuncular ve Ekip" />
      {cast?.length > 0 && renderList(cast, 'Oyuncular')}
      {crew?.length > 0 && renderList(crew, 'Ekip')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  subTitle: {
    color: '#FFD166',
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 8,
  },
  cardContainer: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  noImage: { justifyContent: 'center', alignItems: 'center' },
  noImageText: { color: '#aaa', fontSize: 10, textAlign: 'center' },
  name: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 6,
  },
  role: { color: '#FFD166', fontSize: 11, textAlign: 'center', marginTop: 2 },
  info: { color: '#ccc', fontSize: 10, textAlign: 'center', marginTop: 4 },
});
