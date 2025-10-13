import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import movieImage from './movieImage.jpg';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={movieImage} style={styles.image} resizeMode="cover" />

      <Text style={styles.title}>TMDB Filmleri</Text>

      <View style={styles.card}>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>TMDB Filmleri</Text> uygulaması, The Movie
          Database (TMDB) API'sini kullanarak en güncel ve popüler filmleri
          sizlere sunar. Favori listenizi oluşturabilir, izleme listenizi
          yönetebilir ve detaylı bilgilere erişebilirsiniz.
        </Text>

        <Text style={styles.paragraph}>
          React Native ile geliştirilen bu uygulama, hem Android hem de iOS
          platformlarında çalışır. Basit, hızlı ve kullanıcı dostu arayüz ile
          film keşfetme deneyiminizi keyifli hale getirir.
        </Text>

        <Text style={styles.paragraph}>
          Öneri ve geri bildirimleriniz, uygulamayı daha da geliştirmemize
          yardımcı olur.
        </Text>
      </View>

      <Text style={styles.footer}>
        © 2025 TMDB Filmleri. Tüm hakları saklıdır.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    paddingBottom: 30,
  },
  image: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#01b4e4',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});
