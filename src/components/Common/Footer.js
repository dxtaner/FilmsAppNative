import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const links = [
  {
    label: 'TMDB',
    url: 'https://www.themoviedb.org/',
    icon: 'information-outline',
  },
  {
    label: 'API',
    url: 'https://developers.themoviedb.org/3/getting-started/introduction',
    icon: 'api',
  },
];

const contacts = [
  {
    label: 'Email',
    url: 'mailto:tanerozer16@gmail.com',
    icon: 'email-outline',
    type: 'material',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tanerozer16/',
    icon: 'linkedin-square',
    type: 'font',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/dxtaner',
    icon: 'github-square',
    type: 'font',
  },
  {
    label: 'Medium',
    url: 'https://medium.com/@dxtaner',
    icon: 'medium',
    type: 'font',
  },
];

const Footer = () => {
  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const IconButton = ({ item }) => {
    const scale = new Animated.Value(1);

    const onPressIn = () =>
      Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }).start();
    const onPressOut = () =>
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    const Icon =
      item.type === 'material' ? MaterialCommunityIcons : FontAwesome;

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          margin: 8,
          alignItems: 'center',
          width: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => handlePress(item.url)}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#c8c5bfff', '#de0d3eff']}
            style={styles.iconButton}
          >
            <Icon name={item.icon} size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.iconLabel} numberOfLines={1}>
          {item.label}
        </Text>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={['#121212', '#1F1F2E']} style={styles.container}>
      <View style={styles.row}>
        {links.map(item => (
          <IconButton key={item.label} item={item} />
        ))}
      </View>
      <View style={styles.row}>
        {contacts.map(item => (
          <IconButton key={item.label} item={item} />
        ))}
      </View>
      <Text style={styles.copy}>© {new Date().getFullYear()} Taner Özer</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#d4cfc3ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  iconLabel: {
    color: '#dededeff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 3,
    width: 60,
  },
  copy: {
    color: '#888',
    fontSize: 11,
    marginTop: 12,
  },
});

export default Footer;
