// src/components/Footer.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';

const links = [
  { label: 'About TMDB', url: 'https://www.themoviedb.org/' },
  {
    label: 'About the API',
    url: 'https://developers.themoviedb.org/3/getting-started/introduction',
  },
];

const contacts = [
  { label: 'Email', url: 'mailto:tanerozer16@gmail.com' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tanerozer16/' },
  { label: 'GitHub', url: 'https://github.com/dxtaner' },
  { label: 'Medium', url: 'https://medium.com/@dxtaner' },
];

export default function Footer() {
  const openLink = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      alert(`Cannot open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.section}>
        <Text style={styles.title}>Information</Text>
        <Text style={styles.copy}>© 2025 Created by @dxtaner</Text>
        {links.map(({ label, url }) => (
          <TouchableOpacity
            key={label}
            onPress={() => openLink(url)}
            activeOpacity={0.7}
          >
            <Text style={styles.link}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Contact</Text>
        {contacts.map(({ label, url }) => (
          <TouchableOpacity
            key={label}
            onPress={() => openLink(url)}
            activeOpacity={0.7}
          >
            <Text style={styles.link}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#222',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopWidth: 3,
    borderTopColor: '#ff0000',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#01b4e4',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  copy: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    color: '#01b4e4',
    fontSize: 16,
    marginVertical: 6,
    textDecorationLine: 'underline',
  },
});
