import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExId({ externalIds }) {
  if (!externalIds) return null;

  const links = [
    {
      id: 'imdb',
      name: 'IMDb',
      iconName: 'imdb',
      url: externalIds.imdb_id
        ? `https://www.imdb.com/title/${externalIds.imdb_id}`
        : null,
      color: '#F5C518',
      backgroundColor: '#302802',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      iconName: 'facebook-f',
      url: externalIds.facebook_id
        ? `https://www.facebook.com/${externalIds.facebook_id}`
        : null,
      color: '#1877F2',
      backgroundColor: '#0A2540',
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      iconName: 'twitter',
      url: externalIds.twitter_id
        ? `https://twitter.com/${externalIds.twitter_id}`
        : null,
      color: '#000000',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      iconName: 'instagram',
      url: externalIds.instagram_id
        ? `https://www.instagram.com/${externalIds.instagram_id}`
        : null,
      color: '#C13584',
      backgroundColor: '#3D102A',
    },
  ];

  const handlePress = url => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error('Link açılamadı:', err));
  };

  const hasLinks = links.some(link => link.url);
  if (!hasLinks) return null;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.sectionTitle}>Dış Bağlantılar</Text>{' '}
      </View>

      <View style={styles.chipsWrapper}>
        {links.map(link =>
          link.url ? (
            <TouchableOpacity
              key={link.id}
              style={[
                styles.chipButton,
                { backgroundColor: link.backgroundColor },
              ]}
              onPress={() => handlePress(link.url)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { borderColor: link.color }]}>
                <Icon
                  name={link.iconName}
                  size={12}
                  color={link.id === 'twitter' ? '#000000' : link.color}
                />
              </View>

              <Text
                style={[styles.chipLabel, { color: link.textColor || '#fff' }]}
              >
                {link.name}
              </Text>
            </TouchableOpacity>
          ) : null,
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 10,
  },
  titleWrapper: {
    paddingHorizontal: 15,
  },
  chipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  chipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    marginRight: 8,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  chipLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
