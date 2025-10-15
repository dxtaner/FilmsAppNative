import React, { useEffect } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { fetchMovieDetail } from '../../store/movie/movieDetailThunk';
import { clearMovieDetail } from '../../store/movie/movieDetailSlice';

// import MoviePoster from './sections/MoviePoster.js';
// import OverviewSection from './sections/OverviewSection.js';
// // import KeywordsSection from './sections/KeywordsSection';
// import VideosSection from './sections/VideosSection.js';
// import ExId from './sections/ExId.js';
// // import ReviewsSection from './sections/ReviewsSection';
// // import SimilarMoviesSection from './sections/SimilarMoviesSection';
// // import CreditsSection from './sections/CreditsSection';
// // import ImagesSection from './sections/ImagesSection';
// import ProvidersSection from './sections/ProvidersSection.js';

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <MoviePoster path={movie.poster_path} />
      <ProvidersSection providers={providers} />
      <OverviewSection overview={movie.overview} movie={movie} />
      <VideosSection videos={videos} />
      <ExId externalIds={externalIds} />
     <KeywordsSection keywords={keywords} />
      <ReviewsSection reviews={reviews} />
      <SimilarMoviesSection movies={similar} />
      <CreditsSection credits={credits} />
      <ImagesSection images={images} />
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
