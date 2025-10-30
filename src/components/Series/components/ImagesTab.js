import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const { width, height } = Dimensions.get('window');

export default function ImagesTab({ images }) {
  const { backdrops = [], logos = [], posters = [] } = images || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const renderImage = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => openModal(item)}>
      <Image
        source={{ uri: IMAGE_BASE_URL + item.file_path }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderSection = (title, data) =>
    data.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImage}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {renderSection('Backdrops', backdrops)}
            {renderSection('Logolar', logos)}
            {renderSection('Posters', posters)}
          </>
        }
        data={[]}
        renderItem={null}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={{
              uri: selectedImage
                ? IMAGE_BASE_URL + selectedImage.file_path
                : null,
            }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFD166',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: width * 0.7,
    height: width * 0.4,
    borderRadius: 12,
    marginRight: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width * 0.95,
    height: height * 0.7,
  },
});
