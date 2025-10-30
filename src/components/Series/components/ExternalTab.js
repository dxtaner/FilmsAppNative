import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ExternalTab({ externalIds }) {
  if (!externalIds) return null;

  const links = [
    {
      id: 'imdb',
      value: externalIds.imdb_id,
      url: `https://www.imdb.com/title/${externalIds.imdb_id}`,
      icon: <FontAwesome name="imdb" size={36} color="#FFD700" />,
    },
    {
      id: 'facebook',
      value: externalIds.facebook_id,
      url: `https://www.facebook.com/${externalIds.facebook_id}`,
      icon: <Entypo name="facebook" size={36} color="#3b5998" />,
    },
    {
      id: 'twitter',
      value: externalIds.twitter_id,
      url: `https://twitter.com/${externalIds.twitter_id}`,
      icon: <Entypo name="twitter" size={36} color="#1da1f2" />,
    },
    {
      id: 'instagram',
      value: externalIds.instagram_id,
      url: `https://www.instagram.com/${externalIds.instagram_id}`,
      icon: <Entypo name="instagram" size={36} color="#C13584" />,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      horizontal
      style={{ paddingVertical: 12 }}
    >
      {links.map(
        link =>
          link.value && (
            <TouchableOpacity
              key={link.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(link.url)}
            >
              {link.icon}
            </TouchableOpacity>
          ),
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  card: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#1B1B2F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
});
