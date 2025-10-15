import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.75);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1.4);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function PopularMoviesCarousel({ movies = [] }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(null);
  const timerRef = useRef(null);

  // Otomatik geçiş
  useEffect(() => {
    if (!movies.length) return;

    let index = 0;
    timerRef.current = setInterval(() => {
      index = (index + 1) % movies.length;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 4500);

    return () => clearInterval(timerRef.current);
  }, [movies]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + 16),
      index * (ITEM_WIDTH + 16),
      (index + 1) * (ITEM_WIDTH + 16),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    const handleHoverIn = () => {
      if (Platform.OS === 'web') setActiveIndex(index);
    };
    const handleHoverOut = () => {
      if (Platform.OS === 'web') setActiveIndex(null);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
        onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
        onPressIn={() => Platform.OS !== 'web' && setActiveIndex(index)}
        onPressOut={() => Platform.OS !== 'web' && setActiveIndex(null)}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
      >
        <Animated.View
          style={[styles.card, { transform: [{ scale }], opacity }]}
        >
          <Image
            source={{ uri: IMAGE_BASE_URL + item.poster_path }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.overlay} />

          {activeIndex === index && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoSubtitle}>
                Yayın Tarihi: {item.release_date || 'Bilinmiyor'}
              </Text>
              <Text style={styles.infoDescription} numberOfLines={3}>
                {item.overview || 'Açıklama bulunamadı.'}
              </Text>
            </View>
          )}

          <View style={styles.captionContainer}>
            <Text style={styles.captionTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.captionSubtitle}>
              {item.release_date?.slice(0, 4)}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  captionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  captionSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 2,
  },
  infoContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    bottom: 70,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 14,
    padding: 12,
    justifyContent: 'center',
  },
  infoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoSubtitle: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 8,
  },
  infoDescription: {
    color: '#eee',
    fontSize: 13,
    lineHeight: 18,
  },
});
