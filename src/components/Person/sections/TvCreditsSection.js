import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CreditsCard from './CreditsCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;

export default function TvCreditsSection({ tvCredits }) {
  const navigation = useNavigation();
  if (!tvCredits) return null;

  const goToSeriesDetail = id =>
    navigation.navigate('SeriesDetail', { series_id: id });

  const renderCard = ({ item }) => (
    <CreditsCard item={item} onPress={goToSeriesDetail} />
  );

  return (
    <View style={styles.container}>
      {tvCredits.cast?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>📺 Dizi Kredileri (Oyuncu)</Text>
          <FlatList
            data={tvCredits.cast}
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

      {tvCredits.crew?.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            🎬 Dizi Kredileri (Ekip)
          </Text>
          <FlatList
            data={tvCredits.crew}
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
