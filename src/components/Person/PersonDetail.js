import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { clearPersonDetail } from '../../store/person/personDetailSlice';
import { fetchPersonDetail } from '../../store/person/personDetailThunk';

import Tabs from './sections/Tabs.js';
import PersonInfoSection from './sections/PersonInfoSection.js';
import MovieCreditsSection from './sections/MovieCreditsSection.js';
import TvCreditsSection from './sections/TvCreditsSection.js';
import ImagesSection from './sections/ImagesSection.js';

export default function PersonDetail() {
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('info');

  const {
    detail,
    externalIds,
    images,
    movieCredits,
    tvCredits,
    loading,
    error,
  } = useSelector(state => state.personDetail);

  useEffect(() => {
    if (id) dispatch(fetchPersonDetail(id));
    return () => dispatch(clearPersonDetail());
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

  if (!detail) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <PersonInfoSection detail={detail} externalIds={externalIds} />;
      case 'movies':
        return <MovieCreditsSection movieCredits={movieCredits} />;
      case 'tv':
        return <TvCreditsSection tvCredits={tvCredits} />;
      case 'images':
        return <ImagesSection images={images} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
