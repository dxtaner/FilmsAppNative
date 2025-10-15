// src/components/movie/sections/ExId.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import SectionTitle from './SectionTitle';

export default function ExId({ externalIds }) {
  if (!externalIds) return null;

  const links = [
    {
      id: 'imdb',
      name: 'IMDb',
      symbol: '🎬',
      url: externalIds.imdb_id
        ? `https://www.imdb.com/title/${externalIds.imdb_id}`
        : null,
      color: '#f5c518',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      symbol: '📘',
      url: externalIds.facebook_id
        ? `https://www.facebook.com/${externalIds.facebook_id}`
        : null,
      color: '#1877F2',
    },
    {
      id: 'twitter',
      name: 'Twitter',
      symbol: '🐦',
      url: externalIds.twitter_id
        ? `https://twitter.com/${externalIds.twitter_id}`
        : null,
      color: '#1DA1F2',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      symbol: '📸',
      url: externalIds.instagram_id
        ? `https://www.instagram.com/${externalIds.instagram_id}`
        : null,
      color: '#C13584',
    },
  ];

  const handlePress = url => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error('Link açılamadı:', err));
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Dış Bağlantılar</SectionTitle>
      <View style={styles.row}>
        {links.map(link =>
          link.url ? (
            <TouchableOpacity
              key={link.id}
              style={styles.button}
              onPress={() => handlePress(link.url)}
              activeOpacity={0.7}
            >
              <Text style={[styles.symbol, { color: link.color }]}>
                {link.symbol}
              </Text>
              <Text style={styles.label}>{link.name}</Text>
            </TouchableOpacity>
          ) : null,
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 12,
  },
  symbol: {
    fontSize: 32,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
