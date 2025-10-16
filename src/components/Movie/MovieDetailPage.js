import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { fetchMovieDetail } from '../../store/movie/movieDetailThunk';
import { clearMovieDetail } from '../../store/movie/movieDetailSlice';
import { getPopular } from '../../store/popular/popularThunk.js';

import MoviePoster from './sections/MoviePoster';
import OverviewSection from './sections/OverviewSection';
import KeywordsSection from './sections/KeywordsSection';
import VideosSection from './sections/VideosSection';
import ExId from './sections/ExId';
import ReviewsSection from './sections/ReviewsSection';
import SimilarMoviesSection from './sections/SimilarMoviesSection';
import ImagesSection from './sections/ImagesSection';
import ProvidersSection from './sections/ProvidersSection';
import CreditsSection from './sections/CreditsSection.js';
import PopularMoviesCarousel from '../Home/PopularMoviesCarousel.js';

export default function MovieDetailPage() {
  const route = useRoute();
  const { id } = route.params;
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

  // Film detayını ve popüler filmleri getir
  useEffect(() => {
    if (id) dispatch(fetchMovieDetail(id));
    dispatch(getPopular());
    return () => dispatch(clearMovieDetail());
  }, [id, dispatch]);

  // FlatList için bölümler
  const sections = useMemo(() => {
    const items = [];

    // Popüler Filmler Carousel
    if (
      popularState.items?.length ||
      popularState.loading ||
      popularState.error
    ) {
      items.push({
        key: 'popular',
        component: (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Popüler Filmler</Text>
            {popularState.loading && !popularState.items.length ? (
              <ActivityIndicator
                size="large"
                color="#01b4e4"
                style={{ marginTop: 16 }}
              />
            ) : (
              <>
                <PopularMoviesCarousel movies={popularState.items} />
                {popularState.error && (
                  <Text style={styles.errorText}>
                    Hata: {popularState.error}
                  </Text>
                )}
              </>
            )}
          </View>
        ),
      });
    }

    // Film Posteri
    if (movie)
      items.push({
        key: 'poster',
        component: <MoviePoster path={movie.poster_path} />,
      });

    // Sağlayıcılar
    if (providers)
      items.push({
        key: 'providers',
        component: <ProvidersSection providers={providers} />,
      });

    // Özet
    if (movie?.overview)
      items.push({
        key: 'overview',
        component: <OverviewSection overview={movie.overview} movie={movie} />,
      });

    // Oyuncu ve ekip
    if (credits?.cast?.length || credits?.crew?.length)
      items.push({
        key: 'credits',
        component: <CreditsSection credits={credits} />,
      });

    // Videolar
    if (videos?.length)
      items.push({
        key: 'videos',
        component: <VideosSection videos={videos} />,
      });

    // External IDs
    if (externalIds)
      items.push({
        key: 'external',
        component: <ExId externalIds={externalIds} />,
      });

    // Anahtar kelimeler
    if (keywords?.length)
      items.push({
        key: 'keywords',
        component: <KeywordsSection keywords={keywords} />,
      });

    // İncelemeler
    if (reviews?.length)
      items.push({
        key: 'reviews',
        component: <ReviewsSection reviews={reviews} />,
      });

    // Görseller
    if (images?.backdrops?.length)
      items.push({
        key: 'images',
        component: <ImagesSection images={images} />,
      });

    // Benzer filmler
    if (similar?.length)
      items.push({
        key: 'similar',
        component: <SimilarMoviesSection movies={similar} />,
      });

    return items;
  }, [
    movie,
    providers,
    videos,
    externalIds,
    keywords,
    reviews,
    images,
    similar,
    popularState,
  ]);

  // Loading veya error durumları
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD166" />
        <Text style={{ color: '#ccc', marginTop: 10 }}>Yükleniyor...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );

  if (!movie && !popularState.items.length) return null;

  return (
    <FlatList
      data={sections}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <View>{item.component}</View>}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, backgroundColor: '#0d0d0d' }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#01b4e4',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
});
