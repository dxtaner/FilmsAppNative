import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import movieImage from './movieImage.jpg';

const { width } = Dimensions.get('window');

export default function About() {
  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Header */}
      <View style={styles.imageContainer}>
        <Image source={movieImage} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <Text style={styles.title}>TMDB Filmleri</Text>
      </View>

      {/* Card Content */}
      <View style={styles.card}>
        <View style={styles.listItem}>
          <MaterialCommunityIcons
            name="movie-open-outline"
            size={22}
            color="#de0d3eff"
          />
          <Text style={styles.listText}>
            En güncel ve popüler filmleri keşfedin
          </Text>
        </View>
        <View style={styles.listItem}>
          <MaterialCommunityIcons
            name="star-outline"
            size={22}
            color="#de0d3eff"
          />
          <Text style={styles.listText}>
            Favori listenizi oluşturabilir ve yönetebilirsiniz
          </Text>
        </View>
        <View style={styles.listItem}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={22}
            color="#de0d3eff"
          />
          <Text style={styles.listText}>
            Basit ve kullanıcı dostu arayüz ile film keşfi
          </Text>
        </View>
        <View style={styles.listItem}>
          <MaterialCommunityIcons
            name="hand-heart-outline"
            size={22}
            color="#de0d3eff"
          />
          <Text style={styles.listText}>
            Öneri ve geri bildirimleriniz ile uygulama geliştirilebilir
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Bu uygulama, film ve dizi meraklıları için bir rehber niteliğindedir.
          Kullanıcılar hem popüler içerikleri takip edebilir, hem de kendi
          favori listelerini oluşturarak kişisel bir arşiv oluşturabilirler. Tüm
          bilgiler TMDB API’si üzerinden güncel olarak sağlanmaktadır.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('https://www.themoviedb.org/')}
        >
          <Text style={styles.buttonText}>TMDB Web Sitesine Git</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} TMDB Filmleri
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flexGrow: 1,
    paddingBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  paragraph: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 15,
    lineHeight: 24,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#de0d3eff',
    textShadowColor: 'rgba(255,215,102,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  card: {
    backgroundColor: '#1F1F2E',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  listText: {
    color: '#E0E0E0',
    fontSize: 16,
    marginLeft: 12,
    lineHeight: 22,
    flex: 1,
  },
  button: {
    backgroundColor: '#ecb9c5ff',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 25,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});
