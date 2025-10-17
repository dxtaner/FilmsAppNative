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

const links = [
  {
    label: 'About TMDB',
    url: 'https://www.themoviedb.org/',
    icon: 'information-outline',
  },
  {
    label: 'About API',
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
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
    const onPressOut = () =>
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    const Icon =
      item.type === 'material' ? MaterialCommunityIcons : FontAwesome;

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          key={item.label}
          style={styles.iconButton}
          onPress={() => handlePress(item.url)}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.8}
        >
          <Icon name={item.icon} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.iconLabel}>{item.label}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    paddingVertical: 25,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  iconButton: {
    backgroundColor: '#1f1f1f',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    width: 80,
    marginBottom: 5,
  },
  copy: {
    color: '#888',
    fontSize: 12,
    marginTop: 10,
  },
});

export default Footer;
