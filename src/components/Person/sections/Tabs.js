import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const tabs = [
  { key: 'info', label: 'Bilgi' },
  { key: 'movies', label: 'Filmler' },
  { key: 'tv', label: 'Diziler' },
  { key: 'images', label: 'Görseller' },
];

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => setActiveTab(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
  },
  tab: { paddingVertical: 6 },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD166',
  },
  tabText: { color: '#ccc', fontSize: 15 },
  activeTabText: { color: '#FFD166', fontWeight: '700' },
});
