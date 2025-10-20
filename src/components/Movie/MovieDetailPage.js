import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchMovieDetail } from '../../store/movie/movieDetailThunk';
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
  const navigation = useNavigation();
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

  useEffect(() => {
    if (id) dispatch(fetchMovieDetail(id));
    if (!popularState.items.length) dispatch(getPopular());
  }, [id, dispatch]);

  const sections = useMemo(() => {
    const items = [];

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

    if (movie) {
      items.push(
        { key: 'poster', component: <MoviePoster path={movie.poster_path} /> },
        {
          key: 'providers',
          component: providers ? (
            <ProvidersSection providers={providers} />
          ) : null,
        },
        {
          key: 'overview',
          component: (
            <OverviewSection overview={movie.overview} movie={movie} />
          ),
        },
        {
          key: 'credits',
          component: credits ? <CreditsSection credits={credits} /> : null,
        },
        {
          key: 'videos',
          component: videos?.length ? <VideosSection videos={videos} /> : null,
        },
        {
          key: 'external',
          component: externalIds ? <ExId externalIds={externalIds} /> : null,
        },
        {
          key: 'keywords',
          component: keywords?.length ? (
            <KeywordsSection keywords={keywords} />
          ) : null,
        },
        {
          key: 'reviews',
          component: reviews?.length ? (
            <ReviewsSection reviews={reviews} />
          ) : null,
        },
        {
          key: 'images',
          component: images?.backdrops?.length ? (
            <ImagesSection images={images} />
          ) : null,
        },
        {
          key: 'similar',
          component: similar?.length ? (
            <SimilarMoviesSection movies={similar} />
          ) : null,
        },
      );
    }

    return items.filter(i => i.component); // null componentleri kaldır
  }, [
    movie,
    providers,
    videos,
    externalIds,
    keywords,
    reviews,
    images,
    similar,
    credits,
    popularState,
  ]);

  if (loading && !movie)
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

  if (!movie && !popularState.items.length)
    return (
      <View style={styles.center}>
        <Text style={{ color: '#ccc' }}>
          Film seçilmedi veya veriler yükleniyor.
        </Text>
      </View>
    );

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
