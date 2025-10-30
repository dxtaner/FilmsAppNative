import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CreditsCard from './CreditsCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;

export default function MovieCreditsSection({ movieCredits }) {
  const navigation = useNavigation();
  if (!movieCredits) return null;

  const goToMovieDetail = id => navigation.navigate('MovieDetail', { id });

  const renderCard = ({ item }) => (
    <CreditsCard item={item} onPress={goToMovieDetail} />
  );

  return (
    <View style={styles.container}>
      {movieCredits.cast?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>🎬 Film Kredileri (Oyuncu)</Text>
          <FlatList
            data={movieCredits.cast}
            keyExtractor={item => item.credit_id || item.id.toString()}
            renderItem={renderCard}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
            showsVerticalScrollIndicator={false}
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
            data={movieCredits.crew}
            keyExtractor={item => item.credit_id || item.id.toString()}
            renderItem={renderCard}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', paddingVertical: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00bfff',
    marginLeft: 16,
    marginBottom: 10,
  },
});
