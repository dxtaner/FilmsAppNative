import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import SectionTitle from './SectionTitle';

const DetailItem = ({ label, value, color = '#fff' }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, { color }]}>{value}</Text>
  </View>
);

// Bütçe/Hasılat formatlayıcı
const formatCurrency = amount => {
  if (!amount || amount === 0) return '-';
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
};

export default function OverviewSection({ movie }) {
  if (!movie) return null;

  const handleHomepagePress = () => {
    if (movie.homepage) {
      Linking.openURL(movie.homepage).catch(err =>
        console.error('Link açılamadı', err),
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Tagline */}
      {movie.tagline && (
        <View style={styles.taglineContainer}>
          <Text style={styles.taglineText}>"{movie.tagline}"</Text>
        </View>
      )}

      {/* Film Özeti */}
      {movie.overview && (
        <View style={styles.section}>
          <SectionTitle title="Film Özeti" />
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
      )}

      {/* Önemli Detaylar */}
      <View style={[styles.section, styles.detailsGrid]}>
        <DetailItem
          label="Süre"
          value={movie.runtime ? `${movie.runtime}m` : '-'}
          color="#FFD166"
        />
        <DetailItem
          label="Yayın Tarihi"
          value={movie.release_date?.split('-')[0] || '-'}
          color="#fff"
        />
        <DetailItem label="Durum" value={movie.status || '-'} color="#01b4e4" />
      </View>

      {/* Finans ve Bağlantılar */}
      <View style={styles.section}>
        <SectionTitle title="Finans ve Bağlantılar" />

        <View style={styles.financeRow}>
          <DetailItem label="Bütçe" value={formatCurrency(movie.budget)} />
          <DetailItem label="Hasılat" value={formatCurrency(movie.revenue)} />
        </View>

        {movie.homepage && (
          <Text style={styles.homepageLink} onPress={handleHomepagePress}>
            🌐 Ziyaret Et ↗
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  section: {
    marginBottom: 25,
  },

  taglineContainer: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD166',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  taglineText: {
    color: '#FFD166',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '600',
  },

  overviewText: {
    color: '#eee',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 8,
  },

  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 17,
    fontWeight: '700',
  },

  // Finans
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
  },

  // Anasayfa Link
  homepageLink: {
    marginTop: 12,
    color: '#01b4e4',
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
