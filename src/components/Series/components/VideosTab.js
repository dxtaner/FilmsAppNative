import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VideosTab({ videos }) {
  const openVideo = key => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openVideo(item.key)}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name="logo-youtube" size={36} color="#FF0000" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.details}>
          {item.type} | {new Date(item.published_at).toLocaleDateString()}
        </Text>
        {item.official && <Text style={styles.official}>Official</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={videos || []}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.emptyText}>🎬 Video bulunamadı.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1F1F2F',
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  iconWrapper: {
    width: 50,
    alignItems: 'center',
  },
  info: { flex: 1, marginLeft: 12 },
  title: {
    color: '#FFD166',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: { color: '#ccc', fontSize: 13 },
  official: {
    color: '#FFD166',
    fontSize: 12,
    marginTop: 2,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#aaa',
    fontSize: 16,
  },
});
