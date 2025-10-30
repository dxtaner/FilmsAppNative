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
  Animated,
} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const ORIGINAL_BASE_URL = 'https://image.tmdb.org/t/p/original';
const { width, height } = Dimensions.get('window');

export default function ImagesSection({ images }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  if (!images?.profiles) return null;

  const openModal = index => {
    setSelectedIndex(index);
    setModalVisible(true);
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index, animated: false });
    }, 50);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item, index }) => (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={() => openModal(index)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: IMAGE_BASE_URL + item.file_path }}
          style={styles.galleryImage}
        />
      </TouchableOpacity>
    </Animated.View>
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
          <View style={styles.counterContainer}>
            <Text style={styles.imageCounter}>
              {selectedIndex + 1} / {images.profiles.length}
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#01b4e4',
    marginBottom: 12,
  },
  galleryImage: {
    width: 140,
    height: 210,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#1c1c1c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
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
    width: width * 0.95,
    height: height * 0.75,
    borderRadius: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    padding: 12,
    zIndex: 2,
  },
  closeText: { color: '#FFD166', fontSize: 28, fontWeight: '700' },
  counterContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imageCounter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
