import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w154';

export default function ProvidersTab({ watchProviders }) {
  if (!watchProviders) return null;

  const regions = ['US', 'TR'];
  const providers = regions
    .map(region => watchProviders[region]?.flatrate || [])
    .flat();

  if (!providers.length) return null;

  return (
    <FlatList
      horizontal
      data={providers}
      keyExtractor={(item, index) => item.provider_id.toString() + index}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.cardContainer,
            pressed && { transform: [{ scale: 0.95 }] },
          ]}
        >
          <LinearGradient
            colors={['#3C3C5C', '#1B1B2F']}
            style={styles.providerCard}
          >
            {item.logo_path ? (
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.logo_path}` }}
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.placeholderLogo}>
                <Text style={styles.placeholderText}>Logo</Text>
              </View>
            )}
            <Text style={styles.providerText}>{item.provider_name}</Text>
          </LinearGradient>
        </Pressable>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 16 },
  cardContainer: {
    marginRight: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    height: 170,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  providerCard: {
    width: width * 0.28,
    height: 152,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  logo: {
    width: '70%',
    height: 60,
    marginBottom: 10,
  },
  placeholderLogo: {
    width: '70%',
    height: 60,
    marginBottom: 10,
    backgroundColor: '#444466',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#AAA',
    fontSize: 12,
    fontWeight: 'bold',
  },
  providerText: {
    color: '#FFD166',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
