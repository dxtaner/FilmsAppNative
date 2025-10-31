import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';

export default function DashboardWrapper({ navigation }) {
  const { sessionId } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      Alert.alert('⚠️ Giriş Yapılmamış', 'Lütfen giriş yapın.');
      navigation.replace('Login');
    } else {
      setLoading(false);
    }
  }, [sessionId, navigation]);

  if (!sessionId) {
    navigation.getParent()?.navigate('Login');
    return null;
  }
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#01b4e4" />
      </View>
    );
  }

  return <Dashboard navigation={navigation} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
});
