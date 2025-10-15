import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function SectionTitle({ title }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#ffd166',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 6,
  },
});
