import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Gradient için
import { useNavigation } from '@react-navigation/native';
import SectionTitle from './SectionTitle';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const CARD_WIDTH = Dimensions.get('window').width * 0.32;

export default function CreditsSection({ credits }) {
  const navigation = useNavigation();

  if (!credits) return null;

  const { cast, crew } = credits;
  if ((!cast || !cast.length) && (!crew || !crew.length)) return null;

  const renderCard = item => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PersonDetail', { id: item.id })}
      style={styles.cardContainer}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        {item.profile_path ? (
          <Image
            source={{ uri: IMAGE_BASE_URL + item.profile_path }}
            style={styles.image}
          />
        ) : (
          <LinearGradient
            colors={['#333', '#222']}
            style={[styles.image, styles.noImage]}
          >
            <Text style={styles.noImageText}>Görsel Yok</Text>
          </LinearGradient>
        )}
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.role} numberOfLines={2}>
          {item.character || item.job || 'Unvan Yok'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderList = (data, title) => (
    <View style={styles.listSection}>
      <Text style={styles.subTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.credit_id || item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => renderCard(item)}
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {cast?.length > 0 && renderList(cast, 'Oyuncular')}
      {crew?.length > 0 && renderList(crew, 'Ekip')}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  listSection: {
    marginBottom: 20,
  },
  subTitle: {
    color: '#FFC107',
    fontWeight: '700',
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    paddingBottom: 8,
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#aaa',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoBlock: {
    marginTop: 8,
    paddingHorizontal: 6,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  role: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 2,
  },
  popularity: {
    color: '#01b4e4',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
