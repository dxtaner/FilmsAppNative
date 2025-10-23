import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAccountBySession,
  fetchFavoriteMoviesThunk,
  fetchWatchlistMoviesThunk,
  fetchRatedMoviesThunk,
} from '../../store/account/accountThunk';
import { clearAccountState } from '../../store/account/accountSlice';
import MovieCard from '../Common/MovieCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const MovieListTab = ({ data, navigation }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Film bulunamadı.</Text>
      </View>
    );
  }

  const handleDetails = id => {
    if (id) navigation.navigate('MovieDetail', { id });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard onPress={() => handleDetails(item.id)} movie={item} />
      )}
      contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const UserAvatar = ({ accountInfo }) => {
  const avatarPath = accountInfo?.avatar?.tmdb?.avatar_path;
  const fallbackLetter = (accountInfo?.username || 'U')[0].toUpperCase();

  return avatarPath ? (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w185${avatarPath}` }}
      style={styles.avatar}
    />
  ) : (
    <View style={[styles.avatar, styles.avatarFallback]}>
      <Text style={styles.avatarFallbackText}>{fallbackLetter}</Text>
    </View>
  );
};

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const { accountInfo, favorite, watchlist, rated, loading, error } =
    useSelector(state => state.account);
  const { sessionId } = useSelector(state => state.auth);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      try {
        const res = await dispatch(
          fetchAccountBySession({ session_id: sessionId }),
        );
        const accountId = res.payload?.id;
        if (!accountId) return;

        await dispatch(
          fetchFavoriteMoviesThunk({
            account_id: accountId,
            session_id: sessionId,
          }),
        );
        await dispatch(
          fetchWatchlistMoviesThunk({
            account_id: accountId,
            session_id: sessionId,
          }),
        );
        await dispatch(
          fetchRatedMoviesThunk({
            account_id: accountId,
            session_id: sessionId,
          }),
        );
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchData();
  }, [dispatch, sessionId]);

  const handleLogout = () => {
    dispatch(clearAccountState());
    Alert.alert('✅ Çıkış Yapıldı', 'Başarıyla çıkış yaptınız.');
    navigation.navigate('Login');
  };

  if (!sessionId)
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: '#333' }}>Lütfen giriş yapın.</Text>
      </View>
    );

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#01b4e4" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Hata: {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {accountInfo && (
        <View style={styles.accountHeader}>
          <View style={styles.accountInfo}>
            <UserAvatar accountInfo={accountInfo} />
            <Text style={styles.accountText}>
              Hoşgeldiniz, {accountInfo.username || 'Kullanıcı'}
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      )}

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#01b4e4',
          tabBarInactiveTintColor: '#999',
          tabBarIndicatorStyle: { backgroundColor: '#01b4e4', height: 3 },
          tabBarLabelStyle: { fontWeight: '700', fontSize: 14 },
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen name="Favori">
          {() => <MovieListTab data={favorite} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="İzleme Listem">
          {() => <MovieListTab data={watchlist} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Oyladığım">
          {() => <MovieListTab data={rated} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#01b4e4',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  accountInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
  },
  avatarFallback: {
    backgroundColor: '#ffb74d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: { color: '#fff', fontWeight: '700', fontSize: 20 },
  accountText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
