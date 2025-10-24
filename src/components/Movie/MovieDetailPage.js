import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, TabBar } from 'react-native-tab-view';

import { fetchMovieDetail } from '../../store/movie/movieDetailThunk';
import { getPopular } from '../../store/popular/popularThunk';

import OverviewSection from './sections/OverviewSection';
import KeywordsSection from './sections/KeywordsSection';
import VideosSection from './sections/VideosSection';
import ExId from './sections/ExId';
import ReviewsSection from './sections/ReviewsSection';
import SimilarMoviesSection from './sections/SimilarMoviesSection';
import ImagesSection from './sections/ImagesSection';
import ProvidersSection from './sections/ProvidersSection';
import CreditsSection from './sections/CreditsSection';
import PopularMoviesCarousel from '../Home/PopularMoviesCarousel';

const { width, height } = Dimensions.get('window');
const INITIAL_TAB_HEIGHT = height * 0.8; // Başlangıç minimum yükseklik

export default function MovieDetailPage() {
  const route = useRoute();
  const { id } = route.params || {};
  const dispatch = useDispatch();

  const {
    movie,
    similar,
    reviews,
    keywords,
    videos,
    credits,
    externalIds,
    images,
    providers,
    loading,
    error,
  } = useSelector(state => state.movieDetail);
  const popularState = useSelector(state => state.popular);

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [tabContentHeight, setTabContentHeight] = useState(INITIAL_TAB_HEIGHT);
  const sceneHeightRef = useRef({});

  useEffect(() => {
    if (id) dispatch(fetchMovieDetail(id));
    if (!popularState.items.length) dispatch(getPopular());
  }, [id, dispatch]);

  useEffect(() => {
    const newRoutes = [];
    if (movie?.overview)
      newRoutes.push({ key: 'overview', title: 'Film Detaylari' });
    if (credits?.cast?.length || credits?.crew?.length)
      newRoutes.push({ key: 'credits', title: 'Kadro' });
    if (videos?.length) newRoutes.push({ key: 'videos', title: 'Videolar' });
    if (reviews?.length)
      newRoutes.push({ key: 'reviews', title: 'İncelemeler' });
    if (similar?.length)
      newRoutes.push({ key: 'similar', title: 'Benzer Filmler' });
    if (images?.backdrops?.length)
      newRoutes.push({ key: 'images', title: 'Resimler' });
    if (keywords?.length)
      newRoutes.push({ key: 'keywords', title: 'Anahtar Kelimeler' });
    if (providers?.results)
      newRoutes.push({ key: 'providers', title: 'İzleyici Kaynaklari' });
    if (externalIds)
      newRoutes.push({ key: 'external', title: 'Sosyal Bağlantılar' });
    setRoutes(newRoutes);
  }, [
    movie,
    credits,
    videos,
    reviews,
    similar,
    images,
    keywords,
    providers,
    externalIds,
  ]);

  const updateTabContentHeight = (key, contentHeight) => {
    sceneHeightRef.current[key] = contentHeight;

    if (routes[index]?.key === key && contentHeight + 50 > tabContentHeight) {
      setTabContentHeight(contentHeight + 50);
    }
  };

  useEffect(() => {
    const activeRouteKey = routes[index]?.key;
    const storedHeight = sceneHeightRef.current[activeRouteKey];
    if (storedHeight) {
      setTabContentHeight(storedHeight + 50);
    } else {
      setTabContentHeight(INITIAL_TAB_HEIGHT);
    }
  }, [index, routes]);

  if (loading && !movie) return <LoadingView />;
  if (error) return <ErrorView message={error} />;

  const renderScene = ({ route }) => {
    let Component;
    switch (route.key) {
      case 'overview':
        Component = <OverviewSection movie={movie} />;
        break;
      case 'external':
        Component = <ExId externalIds={externalIds} />;
        break;
      case 'providers':
        Component = <ProvidersSection providers={providers} />;
        break;
      case 'credits':
        Component = <CreditsSection credits={credits} />;
        break;
      case 'videos':
        Component = <VideosSection videos={videos} />;
        break;
      case 'reviews':
        Component = <ReviewsSection reviews={reviews} />;
        break;
      case 'keywords':
        Component = <KeywordsSection keywords={keywords} />;
        break;
      case 'images':
        Component = <ImagesSection images={images} />;
        break;
      case 'similar':
        Component = <SimilarMoviesSection movies={similar} />;
        break;
      default:
        Component = null;
    }

    return (
      <View
        style={styles.sceneContent}
        onLayout={e =>
          updateTabContentHeight(route.key, e.nativeEvent.layout.height)
        }
      >
        {Component}
      </View>
    );
  };

  const renderLazyPlaceholder = () => (
    <View style={styles.center} pointerEvents="none">
      <ActivityIndicator size="small" color="#FFD166" />
      <Text style={{ color: '#ccc', marginTop: 10 }}>Yükleniyor...</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* Popüler Filmler Carousel */}
      {popularState.items?.length ? (
        <View style={styles.popularContainer}>
          <Text style={styles.sectionTitle}>Popüler Filmler</Text>
          <PopularMoviesCarousel movies={popularState.items} />
        </View>
      ) : popularState.loading ? (
        <ActivityIndicator
          size="large"
          color="#01b4e4"
          style={{ marginVertical: 16 }}
        />
      ) : null}

      {/* Poster & Film Bilgisi */}
      {movie?.poster_path && (
        <View style={styles.posterWrapper}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']}
            style={styles.gradient}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieSubtitle}>
              {movie.release_date?.split('-')[0]} •{' '}
              {movie.genres?.map(g => g.name).join(', ')}
            </Text>
            <Text style={styles.vote}>
              ⭐ {movie.vote_average.toFixed(2)} ({movie.vote_count})
            </Text>
          </View>
        </View>
      )}

      {routes.length > 0 && (
        <View style={{ height: tabContentHeight }}>
          <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width }}
            renderLazyPlaceholder={renderLazyPlaceholder}
            swipeEnabled={true}
            renderTabBar={props => (
              <TabBar
                {...props}
                scrollEnabled
                style={styles.tabBar}
                indicatorStyle={styles.tabIndicator}
                labelStyle={styles.tabLabel}
              />
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const LoadingView = ({ message = 'Yükleniyor...' }) => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#FFD166" />
    <Text style={{ color: '#ccc', marginTop: 10 }}>{message}</Text>
  </View>
);

const ErrorView = ({ message }) => (
  <View style={styles.center}>
    <Text style={{ color: 'red' }}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { paddingBottom: 40 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.5,
  },
  posterWrapper: {
    width: '100%',
    height: height * 0.65,
    marginBottom: 16,
    position: 'relative',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  poster: { width: '100%', height: '100%' },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  movieInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD166',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  movieSubtitle: { fontSize: 16, color: '#fff', marginTop: 4 },
  vote: {
    fontSize: 16,
    color: '#01b4e4',
    marginTop: 6,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  tabBar: { backgroundColor: '#121212', elevation: 0 },
  tabIndicator: { backgroundColor: '#FFD166', height: 3 },
  tabLabel: { color: '#fff', fontWeight: '700' },
  popularContainer: { marginBottom: 16, paddingHorizontal: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFD166',
    marginBottom: 8,
  },
  sceneContent: {
    minHeight: height * 0.4,
  },
});
