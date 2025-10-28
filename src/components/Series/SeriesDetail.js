import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  fetchSeriesDetails,
  fetchSeriesCredits,
  fetchSeriesSimilar,
  fetchSeriesVideos,
  fetchSeriesWatchProviders,
  fetchSeriesKeywords,
  fetchSeriesExternalIds,
  fetchSeriesImages,
  fetchSeriesReviews,
} from '../../store/series/seriesThunk';
import { clearSeriesState } from '../../store/series/seriesSlice';

import DetailsTab from './components/DetailsTab';
import CastTab from './components/CastTab';
import SimilarTab from './components/SimilarTab';
import VideosTab from './components/VideosTab';
import KeywordsTab from './components/KeywordsTab';
import ReviewsTab from './components/ReviewsTab';
import ImagesTab from './components/ImagesTab';
import ExternalTab from './components/ExternalTab';
import ProvidersTab from './components/ProvidersTab';

const { width } = Dimensions.get('window');

export default function SeriesDetail({ route }) {
  const { series_id } = route.params;
  const dispatch = useDispatch();

  const {
    details,
    credits,
    similar,
    videos,
    watchProviders,
    keywords,
    externalIds,
    images,
    reviews,
    loading,
    error,
  } = useSelector(state => state.series || {});

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    dispatch(fetchSeriesDetails(series_id));
    dispatch(fetchSeriesCredits(series_id));
    dispatch(fetchSeriesSimilar(series_id));
    dispatch(fetchSeriesVideos(series_id));
    dispatch(fetchSeriesWatchProviders(series_id));
    dispatch(fetchSeriesKeywords(series_id));
    dispatch(fetchSeriesExternalIds(series_id));
    dispatch(fetchSeriesImages(series_id));
    dispatch(fetchSeriesReviews(series_id));

    return () => dispatch(clearSeriesState());
  }, [series_id]);

  useEffect(() => {
    const newRoutes = [];
    if (details) newRoutes.push({ key: 'details', title: 'Dizi Bilgileri' });
    if (credits?.cast?.length || credits?.crew?.length)
      newRoutes.push({ key: 'cast', title: 'Kadro' });
    if (similar?.length)
      newRoutes.push({ key: 'similar', title: 'Benzer Diziler' });
    if (videos?.length) newRoutes.push({ key: 'videos', title: 'Videolar' });
    if (keywords?.length)
      newRoutes.push({ key: 'keywords', title: 'Anatar Kelimeler' });
    if (reviews?.length)
      newRoutes.push({ key: 'reviews', title: 'İnceleme Yorumları' });
    if (
      images?.backdrops?.length ||
      images?.posters?.length ||
      images?.logos?.length
    )
      newRoutes.push({ key: 'images', title: 'Resimler' });
    if (externalIds && Object.values(externalIds).some(v => v))
      newRoutes.push({ key: 'external', title: 'Sosyal Linkler' });
    if (
      watchProviders &&
      (watchProviders.US?.flatrate?.length ||
        watchProviders.TR?.flatrate?.length)
    )
      newRoutes.push({ key: 'providers', title: 'İzleyici Kaynakları' });

    setRoutes(newRoutes);
  }, [
    details,
    credits,
    similar,
    videos,
    keywords,
    reviews,
    images,
    externalIds,
    watchProviders,
  ]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD166" />
        <Text style={styles.loadingText}>Loading Series Info...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Error: {error.status_message || 'Something went wrong.'}
        </Text>
      </View>
    );
  }

  if (!routes.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          No information available for this series.
        </Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    details: () => <DetailsTab details={details} />,
    cast: () => <CastTab credits={credits} />,
    similar: () => <SimilarTab similar={similar} />,
    videos: () => <VideosTab videos={videos} />,
    keywords: () => <KeywordsTab keywords={keywords} />,
    reviews: () => <ReviewsTab reviews={reviews} />,
    images: () => <ImagesTab images={images} />,
    external: () => <ExternalTab externalIds={externalIds} />,
    providers: () => <ProvidersTab watchProviders={watchProviders} />,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            labelStyle={styles.label}
            pressColor="rgba(255, 209, 102, 0.1)"
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFD166',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#1B1B2F',
    elevation: 3,
  },
  indicator: {
    backgroundColor: '#FFD166',
    height: 3,
    borderRadius: 3,
  },
  label: {
    color: '#FFD166',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  center: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
