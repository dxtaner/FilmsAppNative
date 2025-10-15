import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionTitle from './SectionTitle';

const OverviewSection = ({ movie }) => {
  if (!movie) return null;

  const {
    overview,
    genres,
    release_date,
    runtime,
    vote_average,
    tagline,
    budget,
    revenue,
    status,
    original_language,
  } = movie;

  return (
    <View style={styles.container}>
      {/* Tagline */}
      {tagline ? <Text style={styles.tagline}>“{tagline}”</Text> : null}

      {/* Özet Başlığı */}
      <SectionTitle title="Özet" />

      {/* Özet Metni */}
      <Text style={styles.overviewText}>
        {overview || 'Açıklama bulunamadı.'}
      </Text>

      {/* Film Detayları */}
      <View style={styles.infoContainer}>
        {/* Türler */}
        {genres?.length > 0 && (
          <View style={styles.chipContainer}>
            {genres.map(g => (
              <View key={g.id} style={styles.chip}>
                <Text style={styles.chipText}>{g.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Temel Bilgiler */}
        {release_date && (
          <Text style={styles.infoText}>📅 Yayın Tarihi: {release_date}</Text>
        )}
        {runtime && <Text style={styles.infoText}>⏱ Süre: {runtime} dk</Text>}
        {vote_average !== undefined && (
          <Text style={styles.infoText}>⭐ Puan: {vote_average}/10</Text>
        )}
        {budget && (
          <Text style={styles.infoText}>
            💰 Bütçe: ${budget.toLocaleString()}
          </Text>
        )}
        {revenue && (
          <Text style={styles.infoText}>
            💸 Gelir: ${revenue.toLocaleString()}
          </Text>
        )}
        {status && <Text style={styles.infoText}>📌 Durum: {status}</Text>}
        {original_language && (
          <Text style={styles.infoText}>
            🗣 Dil: {original_language.toUpperCase()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default OverviewSection;

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  tagline: {
    color: '#ffd166',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  overviewText: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  infoText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#222',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: { color: '#ffd166', fontSize: 12, fontWeight: '700' },
});
