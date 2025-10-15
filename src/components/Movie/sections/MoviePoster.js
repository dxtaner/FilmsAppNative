import React from 'react';
import { Image, StyleSheet } from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MoviePoster({ path }) {
  if (!path) return null;
  return (
    <Image source={{ uri: IMAGE_BASE_URL + path }} style={styles.poster} />
  );
}

const styles = StyleSheet.create({
  poster: { width: '100%', height: 450, borderRadius: 14, marginBottom: 14 },
});
