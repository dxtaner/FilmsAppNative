import React, { useState, useRef } from 'react';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const ORIGINAL_BASE_URL = 'https://image.tmdb.org/t/p/original';
const { width, height } = Dimensions.get('window');

export default function ImagesSection({ images }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef(null);

  if (!images?.profiles) return null;

  const openModal = index => {
    setSelectedIndex(index);
    setModalVisible(true);
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index, animated: false });
    }, 50);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openModal(index)}>
      <Image
        source={{ uri: IMAGE_BASE_URL + item.file_path }}
        style={styles.galleryImage}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🖼 Görseller</Text>
      <FlatList
        horizontal
        data={images.profiles}
        keyExtractor={(item, index) => item.file_path + index}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <FlatList
            ref={flatListRef}
            data={images.profiles}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex}
            keyExtractor={(item, index) => item.file_path + index}
            renderItem={({ item }) => (
              <View style={styles.modalImageContainer}>
                <Image
                  source={{ uri: ORIGINAL_BASE_URL + item.file_path }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              </View>
            )}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setSelectedIndex(index);
            }}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScrollToIndexFailed={() => {}}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.imageCounter}>
            {selectedIndex + 1} / {images.profiles.length}
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#01b4e4',
    marginBottom: 12,
  },
  galleryImage: {
    width: 140,
    height: 210,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#1c1c1c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.75,
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    padding: 12,
    zIndex: 2,
  },
  closeText: { color: '#FFD166', fontSize: 26, fontWeight: '700' },
  imageCounter: {
    position: 'absolute',
    bottom: 50,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
