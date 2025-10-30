import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function PersonInfoSection({
  detail,
  externalIds,
  moviesCount,
}) {
  if (!detail) return null;

  const genderMap = { 1: 'Kadın', 2: 'Erkek', 0: 'Bilinmiyor' };

  const socialLinks = [
    {
      id: 'imdb_id',
      label: 'IMDb',
      icon: 'imdb',
      color: '#f5c518',
      prefix: 'https://www.imdb.com/name/',
    },
    {
      id: 'facebook_id',
      label: 'Facebook',
      icon: 'facebook',
      color: '#1877F2',
      prefix: 'https://www.facebook.com/',
    },
    {
      id: 'instagram_id',
      label: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
      prefix: 'https://www.instagram.com/',
    },
    {
      id: 'twitter_id',
      label: 'Twitter',
      icon: 'twitter',
      color: '#1DA1F2',
      prefix: 'https://twitter.com/',
    },
    {
      id: 'tiktok_id',
      label: 'TikTok',
      icon: 'music-note',
      color: '#010101',
      prefix: 'https://www.tiktok.com/@',
    },
    {
      id: 'youtube_id',
      label: 'YouTube',
      icon: 'youtube',
      color: '#FF0000',
      prefix: 'https://www.youtube.com/channel/',
    },
    {
      id: 'wikidata_id',
      label: 'Wikipedia',
      icon: 'wikipedia',
      color: '#636e72',
      prefix: 'https://www.wikidata.org/wiki/',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Üst Profil Kartı */}
      <LinearGradient colors={['#1a1a1a', '#0d0d0d']} style={styles.card}>
        <Image
          source={
            detail.profile_path
              ? { uri: IMAGE_BASE_URL + detail.profile_path }
              : { uri: 'https://via.placeholder.com/140x210?text=No+Image' }
          }
          style={styles.profileImage}
        />

        <Text style={styles.name}>{detail.name}</Text>
        <Text style={styles.department}>{detail.known_for_department}</Text>

        <View style={styles.infoGroup}>
          <View style={styles.infoItem}>
            <Icon name="calendar" size={18} color="#ccc" />
            <Text style={styles.infoText}>{detail.birthday || '-'}</Text>
          </View>

          {detail.deathday && (
            <View style={styles.infoItem}>
              <Icon name="cross" size={18} color="#ccc" />
              <Text style={styles.infoText}>{detail.deathday}</Text>
            </View>
          )}

          <View style={styles.infoItem}>
            <Icon name="map-marker" size={18} color="#ccc" />
            <Text style={styles.infoText}>{detail.place_of_birth || '-'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="account" size={18} color="#ccc" />
            <Text style={styles.infoText}>{genderMap[detail.gender]}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="star" size={18} color="#FFD166" />
            <Text style={[styles.infoText, { color: '#FFD166' }]}>
              {detail.popularity?.toFixed(1)}
            </Text>
          </View>
        </View>

        {moviesCount !== undefined && (
          <Text style={styles.moviesCount}>
            🎬 Rol Aldığı Film Sayısı: {moviesCount}
          </Text>
        )}
      </LinearGradient>

      {/* Takma İsimler */}
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

      {/* Biyografi */}
      {detail.biography && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Biyografi</Text>
          <Text style={styles.bioText}>{detail.biography}</Text>
        </View>
      )}

      {/* Sosyal Medya Linkleri */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sosyal Medya </Text>
        <View style={styles.socialRow}>
          {socialLinks.map(link => {
            const value = externalIds?.[link.id];
            if (!value) return null;
            return (
              <TouchableOpacity
                key={link.id}
                style={[
                  styles.socialButton,
                  { backgroundColor: `${link.color}22` },
                ]}
                onPress={() => Linking.openURL(link.prefix + value)}
              >
                <Icon name={link.icon} size={24} color={link.color} />
                <Text style={[styles.socialText, { color: link.color }]}>
                  {link.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 14,
  },

  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 8,
  },

  profileImage: {
    width: 160,
    height: 230,
    borderRadius: 14,
    alignSelf: 'center',
    marginBottom: 12,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#01b4e4',
    textAlign: 'center',
    marginTop: 6,
  },

  department: {
    color: '#aaa',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },

  infoGroup: {
    marginTop: 8,
    alignItems: 'center',
    gap: 8,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  infoText: {
    color: '#ccc',
    fontSize: 14,
  },

  moviesCount: {
    marginTop: 12,
    color: '#06d6a0',
    fontWeight: '600',
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01b4e4',
    marginBottom: 8,
  },

  aliasText: {
    color: '#bbb',
    fontSize: 14,
    marginVertical: 2,
  },

  bioText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },

  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  socialText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
