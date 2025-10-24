import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.32;
const CARD_HEIGHT = CARD_WIDTH * (3 / 1.5);
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const MarqueeText = ({ children, style }) => {
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const needsScroll = contentWidth > containerWidth;

  useEffect(() => {
    if (needsScroll) {
      scrollAnim.setValue(0);

      const distanceToScroll = contentWidth - containerWidth;
      const duration = distanceToScroll * 50;

      const animation = Animated.loop(
        Animated.sequence([
          Animated.delay(1500),
          Animated.timing(scrollAnim, {
            toValue: -distanceToScroll,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.delay(1000),
          Animated.timing(scrollAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );

      animation.start();
      return () => animation.stop();
    }
  }, [contentWidth, containerWidth, needsScroll, scrollAnim]);

  if (!children) return null;

  return (
    <View
      style={styles.marqueeContainer}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.Text
        style={[
          style,
          {
            transform: [{ translateX: scrollAnim }],
            // Kaydırma gerekiyorsa overflow ayarını yap
            overflow: needsScroll ? 'hidden' : 'visible',
          },
        ]}
        onLayout={e => setContentWidth(e.nativeEvent.layout.width)}
        numberOfLines={1}
      >
        {children}
      </Animated.Text>
    </View>
  );
};

const getRatingColor = voteAverage => {
  if (voteAverage === undefined || voteAverage === null) return '#A0A0A0';
  const normalized = voteAverage / 10;
  let r, g;
  if (normalized < 0.5) {
    r = 255;
    g = Math.floor(255 * (normalized * 2));
  } else {
    r = Math.floor(255 * (1 - (normalized - 0.5) * 2));
    g = 255;
  }
  return `rgb(${r}, ${g}, 0)`;
};

export default function SimilarMoviesSection({ movies }) {
  const navigation = useNavigation();
  if (!movies || movies.length === 0) return null;

  const handlePress = movieId => {
    navigation.push('MovieDetail', { id: movieId });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {movies.map(movie => (
          <TouchableOpacity
            key={movie.id}
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => handlePress(movie.id)}
          >
            <Image
              source={{
                uri: movie.poster_path
                  ? `${IMAGE_BASE}${movie.poster_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image',
              }}
              style={styles.poster}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.overlay}
            >
              <Text numberOfLines={1} style={styles.date}>
                {movie.release_date || 'Unknown Date'}
              </Text>

              <MarqueeText style={styles.title}>{movie.title}</MarqueeText>

              <View style={styles.ratingContainer}>
                <Text
                  style={[
                    styles.ratingText,
                    { color: getRatingColor(movie.vote_average) },
                  ]}
                >
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
  },
  date: {
    color: '#ccc',
    fontSize: 11,
    marginBottom: 2,
  },
  marqueeContainer: {
    overflow: 'hidden',
    height: 16,
    marginBottom: 2,
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
});
