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

import MoviePoster from './sections/MoviePoster';
import OverviewSection from './sections/OverviewSection';
import KeywordsSection from './sections/KeywordsSection';
import VideosSection from './sections/VideosSection';
import ExId from './sections/ExId';
import ReviewsSection from './sections/ReviewsSection';
import SimilarMoviesSection from './sections/SimilarMoviesSection';
import ImagesSection from './sections/ImagesSection';
import ProvidersSection from './sections/ProvidersSection';

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

  useEffect(() => {
    if (id) dispatch(fetchMovieDetail(id));
    return () => dispatch(clearMovieDetail());
  }, [id]);

  const sections = useMemo(() => {
    const items = [];
    if (movie)
      items.push({
        key: 'poster',
        component: <MoviePoster path={movie.poster_path} />,
      });
    if (providers)
      items.push({
        key: 'providers',
        component: <ProvidersSection providers={providers} />,
      });
    if (movie?.overview)
      items.push({
        key: 'overview',
        component: <OverviewSection overview={movie.overview} movie={movie} />,
      });
    if (videos?.length)
      items.push({
        key: 'videos',
        component: <VideosSection videos={videos} />,
      });
    if (externalIds)
      items.push({
        key: 'external',
        component: <ExId externalIds={externalIds} />,
      });
    if (keywords?.length)
      items.push({
        key: 'keywords',
        component: <KeywordsSection keywords={keywords} />,
      });
    if (reviews?.length)
      items.push({
        key: 'reviews',
        component: <ReviewsSection reviews={reviews} />,
      });
    if (images?.backdrops?.length)
      items.push({
        key: 'images',
        component: <ImagesSection images={images} />,
      });
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
  ]);

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

  if (!movie) return null;

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
});
