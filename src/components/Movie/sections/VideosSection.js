// src/components/movie/VideosSection.js
import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import SectionTitle from './SectionTitle';

const { width } = Dimensions.get('window');

const VideosSection = ({ videos }) => {
  if (!videos?.length) return null;

  const trailers = videos.filter(
    v => v.site === 'YouTube' && v.type === 'Trailer',
  );

  if (!trailers?.length) return null;

  return (
    <View style={{ marginTop: 16 }}>
      <SectionTitle title="Fragmanlar" />
      <FlatList
        horizontal
        data={trailers}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={220}
              width={width * 0.85}
              videoId={item.key}
              play={false}
            />
            <Text style={styles.videoName}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingLeft: 16 }}
      />
    </View>
  );
};

export default VideosSection;

const styles = StyleSheet.create({
  videoContainer: {
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1c1c1c',
    paddingBottom: 10,
  },
  videoName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 6,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
});
