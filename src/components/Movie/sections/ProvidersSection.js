// src/components/movie/sections/ProvidersSection.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function ProvidersSection({ providers }) {
  if (!providers) return null;

  const countries = ['TR', 'US'];

  const openLink = url => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error('Link açılamadı:', err));
  };

  return (
    <View style={styles.container}>
      {countries.map(country => {
        const countryData = providers.results?.[country];
        if (!countryData) return null;

        return (
          <View key={country} style={{ marginBottom: 20 }}>
            <Text style={styles.countryTitle}>{country}</Text>

            {['flatrate', 'rent', 'buy'].map(type => {
              const items = countryData[type];
              if (!items?.length) return null;

              return (
                <View key={type} style={{ marginTop: 10 }}>
                  <Text style={styles.sectionType}>
                    {type === 'flatrate'
                      ? 'Abonelik'
                      : type === 'rent'
                      ? 'Kiralama'
                      : 'Satın Alma'}
                  </Text>
                  <FlatList
                    horizontal
                    data={items}
                    keyExtractor={item => item.provider_id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                          openLink(
                            `${countryData.link}?provider=${item.provider_id}`,
                          )
                        }
                        activeOpacity={0.7}
                      >
                        {item.logo_path && (
                          <Image
                            source={{ uri: IMAGE_BASE_URL + item.logo_path }}
                            style={styles.logo}
                          />
                        )}
                        <Text style={styles.name}>{item.provider_name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  countryTitle: {
    color: '#FFD166',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionType: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
  },
  card: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 8,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  name: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});
