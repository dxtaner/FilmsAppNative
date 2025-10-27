// src/components/movie/VideosSection.js
import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');
const VIDEO_WIDTH = width * 0.9;
const VIDEO_HEIGHT = VIDEO_WIDTH * 0.5625;

const VideosSection = ({ videos }) => {
  if (!videos?.length) return null;

  const trailers = videos.filter(
    v => v.site === 'YouTube' && v.type === 'Trailer',
  );

  if (!trailers?.length) return null;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        horizontal
        data={trailers}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <View style={styles.playerWrapper}>
              <YoutubePlayer
                height={VIDEO_HEIGHT}
                width={VIDEO_WIDTH}
                videoId={item.key}
                play={false}
                webViewProps={{
                  allowsFullscreenVideo: true,
                  allowsInlineMediaPlayback: true,
                  mediaPlaybackRequiresUserAction: false,
                }}
              />
            </View>

            <Text style={styles.videoTitle} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default VideosSection;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  videoCard: {
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    width: VIDEO_WIDTH,

    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  playerWrapper: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: 'black',
  },
  videoTitle: {
    color: '#E0E0E0',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 12,
    textAlign: 'left',
    lineHeight: 20,
  },
});
