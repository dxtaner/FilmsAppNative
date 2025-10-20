import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import SectionTitle from './SectionTitle';

const { width, height } = Dimensions.get('window');
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const ORIGINAL_BASE = 'https://image.tmdb.org/t/p/original';

export default function ImagesSection({ images }) {
  if (!images) return null;

  const { backdrops = [], posters = [], logos = [] } = images;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (array, index) => {
    setModalImages(array);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalImages([]);
    setCurrentIndex(0);
  };

  const renderImageRow = (title, data, imageHeight = 130) => {
    if (!data || data.length === 0) return null;

    return (
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => item.file_path + '_' + index}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => openModal(data, index)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: IMAGE_BASE + item.file_path }}
                style={[styles.image, { height: imageHeight }]}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Görseller" />
      {renderImageRow('Arka Planlar', backdrops, 130)}
      {renderImageRow('Afişler', posters, 180)}
      {renderImageRow('Logolar', logos, 100)}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <FlatList
            data={modalImages}
            keyExtractor={(item, index) => item.file_path + '_' + index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={currentIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: ORIGINAL_BASE + item.file_path }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 10 },
  subSection: { marginBottom: 20 },
  subTitle: {
    color: '#FFD166',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 4,
  },
  scrollContainer: { paddingLeft: 6, paddingRight: 10 },
  image: {
    width: 200,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#1c1c1c',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: '#FFD166',
    fontSize: 24,
    fontWeight: '700',
  },
});
