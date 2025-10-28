import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DetailsTab({ details }) {
  if (!details) {
    return (
      <View style={styles.center}>
        <Text style={styles.placeholder}>Detay bilgisi bulunamadı.</Text>
      </View>
    );
  }

  const imageUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Poster */}
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.poster} />
        </View>
      )}

      {/* Başlık */}
      <Text style={styles.title}>{details.name || details.original_name}</Text>

      {/* Tagline */}
      {details.tagline ? (
        <Text style={styles.tagline}>"{details.tagline}"</Text>
      ) : null}

      {/* Açıklama */}
      <Text style={styles.sectionTitle}>Konu</Text>
      <Text style={styles.text}>
        {details.overview ? details.overview : 'Açıklama bulunamadı.'}
      </Text>

      {/* Bilgi Tablosu */}
      <View style={styles.infoGrid}>
        <InfoRow label="Durum" value={details.status} />
        <InfoRow label="Tür" value={details.type} />
        <InfoRow
          label="İlk Yayın Tarihi"
          value={details.first_air_date || '—'}
        />
        <InfoRow
          label="Bölüm Sayısı"
          value={details.number_of_episodes?.toString() || '0'}
        />
        <InfoRow
          label="Sezon Sayısı"
          value={details.number_of_seasons?.toString() || '0'}
        />
        <InfoRow
          label="Bölüm Süresi"
          value={
            details.episode_run_time?.[0]
              ? `${details.episode_run_time[0]} dk`
              : '—'
          }
        />
        <InfoRow
          label="Orijinal Dil"
          value={details.original_language?.toUpperCase() || '—'}
        />
        <InfoRow
          label="Ülke"
          value={details.origin_country?.join(', ') || '—'}
        />
        <InfoRow
          label="Popülerlik"
          value={details.popularity?.toFixed(2) || '0'}
        />
        <InfoRow
          label="Oy Ortalaması"
          value={details.vote_average?.toFixed(1) || '0'}
        />
      </View>

      {/* Türler */}
      {details.genres?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Türler</Text>
          <View style={styles.genreContainer}>
            {details.genres.map(genre => (
              <View key={genre.id} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Homepage */}
      {details.homepage ? (
        <TouchableOpacity
          onPress={() => Linking.openURL(details.homepage)}
          style={styles.linkContainer}
        >
          <Icon name="link-outline" size={18} color="#FFD166" />
          <Text style={styles.linkText}>Resmî Siteye Git</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#888',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  poster: {
    width: 220,
    height: 330,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  title: {
    color: '#FFD166',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 6,
  },
  tagline: {
    color: '#E0E0E0',
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFD166',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    color: '#D8D8D8',
    fontSize: 15,
    lineHeight: 22,
  },
  infoGrid: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: '#1B1B2F',
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#2A2A3D',
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  infoLabel: {
    color: '#AAA',
    fontSize: 14,
  },
  infoValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  genreBadge: {
    backgroundColor: '#FFD16620',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  genreText: {
    color: '#FFD166',
    fontSize: 13,
    fontWeight: '500',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    justifyContent: 'center',
  },
  linkText: {
    color: '#FFD166',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 15,
  },
});
