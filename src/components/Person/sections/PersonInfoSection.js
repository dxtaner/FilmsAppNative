import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function PersonInfoSection({ detail, externalIds }) {
  if (!detail) return null;

  const genderMap = { 1: 'Kadın', 2: 'Erkek', 0: 'Bilinmiyor' };

  const socialLinks = [
    { id: 'imdb_id', label: 'IMDb', prefix: 'https://www.imdb.com/name/' },
    {
      id: 'facebook_id',
      label: 'Facebook',
      prefix: 'https://www.facebook.com/',
    },
    {
      id: 'instagram_id',
      label: 'Instagram',
      prefix: 'https://www.instagram.com/',
    },
    { id: 'twitter_id', label: 'Twitter', prefix: 'https://twitter.com/' },
    { id: 'tiktok_id', label: 'TikTok', prefix: 'https://www.tiktok.com/@' },
    {
      id: 'youtube_id',
      label: 'YouTube',
      prefix: 'https://www.youtube.com/channel/',
    },
    {
      id: 'wikidata_id',
      label: 'Wikipedia',
      prefix: 'https://www.wikidata.org/wiki/',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={
            detail.profile_path
              ? { uri: IMAGE_BASE_URL + detail.profile_path }
              : { uri: 'https://via.placeholder.com/140x210?text=No+Image' }
          }
          style={styles.profileImage}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{detail.name}</Text>
          <Text style={styles.infoText}>🎂 {detail.birthday || '-'}</Text>
          {detail.deathday && (
            <Text style={styles.infoText}>✝ {detail.deathday}</Text>
          )}
          <Text style={styles.infoText}>📍 {detail.place_of_birth || '-'}</Text>
          <Text style={styles.infoText}>💼 {detail.known_for_department}</Text>
          <Text style={styles.infoText}>👤 {genderMap[detail.gender]}</Text>
          <Text style={styles.infoText}>
            ⭐ Popularity: {detail.popularity}
          </Text>
        </View>
      </View>

      {detail.also_known_as?.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Takma İsimler</Text>
          {detail.also_known_as.map((name, idx) => (
            <Text key={idx} style={styles.aliasText}>
              • {name}
            </Text>
          ))}
        </View>
      )}

      {detail.biography && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Biyografi</Text>
          <Text style={styles.bioText}>{detail.biography}</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Sosyal Medya & Eksternal Linkler
        </Text>
        {socialLinks.map(link => {
          const value = externalIds?.[link.id];
          if (!value) return null;
          return (
            <Text
              key={link.id}
              style={styles.link}
              onPress={() => Linking.openURL(link.prefix + value)}
            >
              {link.label}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', padding: 16 },

  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  profileImage: {
    width: 140,
    height: 210,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 12,
    backgroundColor: '#2a2a2a',
  },
  infoContainer: { alignItems: 'center' },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD166',
    textAlign: 'center',
  },
  infoText: { color: '#ccc', fontSize: 14, marginTop: 4, textAlign: 'center' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01b4e4',
    marginBottom: 6,
  },
  aliasText: { color: '#bbb', fontSize: 13, marginTop: 2 },

  bioText: { color: '#ccc', fontSize: 14, lineHeight: 20 },

  link: {
    color: '#01b4e4',
    fontSize: 14,
    marginVertical: 2,
  },
});
