import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Yardımcı Fonksiyon: Türü Çevirme
const translateType = type => {
  switch (type) {
    case 'flatrate':
      return 'Abonelik (Stream)';
    case 'rent':
      return 'Kiralama';
    case 'buy':
      return 'Satın Alma';
    default:
      return '';
  }
};

export default function ProvidersSection({ providers }) {
  if (!providers) return null;

  const countries = ['TR', 'US'];

  const openLink = url => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error('Link açılamadı:', err));
  };

  const renderProvider = ({ item, countryData }) => (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() =>
        openLink(`${countryData.link}?provider=${item.provider_id}`)
      }
      activeOpacity={0.8}
    >
      {item.logo_path && (
        <Image
          source={{ uri: IMAGE_BASE_URL + item.logo_path }}
          style={styles.logo}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {countries.map(country => {
        const countryData = providers.results?.[country];
        if (!countryData) return null;

        return (
          <View key={country} style={styles.countryContainer}>
            {/* Ülke Başlığı */}
            <Text style={styles.countryTitle}>
              {country === 'TR'
                ? 'Türkiye'
                : country === 'US'
                ? 'Amerika Birleşik Devletleri'
                : country}
            </Text>

            {['flatrate', 'rent', 'buy'].map(type => {
              const items = countryData[type];
              if (!items?.length) return null;

              return (
                <View key={type} style={styles.sectionContainer}>
                  {/* Tür Başlığı */}
                  <Text style={styles.sectionType}>{translateType(type)}</Text>

                  {/* Sağlayıcı Listesi */}
                  <FlatList
                    horizontal
                    data={items}
                    keyExtractor={item => item.provider_id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) =>
                      renderProvider({ item, countryData })
                    }
                  />
                </View>
              );
            })}

            {/* Linke Git Butonu (Zorunlu Değil, ama faydalı) */}
            <TouchableOpacity
              style={styles.linkButton}
              activeOpacity={0.7}
              onPress={() => openLink(countryData.link)}
            >
              <Text style={styles.linkButtonText}>
                Tüm Sağlayıcılara Gözat 🔗
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  countryContainer: {
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  countryTitle: {
    color: '#E0E0E0',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionType: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingVertical: 4,
  },

  providerCard: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#444',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  providerName: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    width: '100%',
  },

  linkButton: {
    marginTop: 15,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  linkButtonText: {
    color: '#FFD166',
    fontSize: 14,
    fontWeight: '600',
  },
});
