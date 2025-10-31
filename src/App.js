import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './components/Home/Home.js';
import About from './components/Home/About.js';
import MovieDetailPage from './components/Movie/MovieDetailPage.js';
import PersonDetail from './components/Person/PersonDetail.js';
import SeriesDetailPage from './components/Series/SeriesDetail.js';
import Footer from './components/Common/Footer.js';
import PopularPersons from './components/Home/PopularPersons.js';
import UpComingMoviesScreen from './components/Home/UpComingMoviesScreen.js';
import PopularSeries from './components/Series/PopularSeries.js';
import TopSeries from './components/Series/TopSeries.js';
import Login from './components/Auth/Login.js';
import DashboardWrapper from './components/Dashboard/DashboardWrapper.js';
import SearchMovieBar from './components/Home/SearchMovieBar.js';
import DiscoverMovies from './components/Home/DiscoverMovies.js';
import SearchPerson from './components/Home/SearchPerson.js';
import { clearAuthState } from './store/auth/authSlice.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// --- Screen Wrapper ---
function ScreenWithSearchAndFooter({ children, navigation, hideSearch }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0d0d0d' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {!hideSearch && (
        <View style={styles.searchWrapper}>
          <SearchMovieBar navigation={navigation} />
        </View>
      )}
      <View style={styles.content}>{children}</View>
      <Footer />
    </KeyboardAvoidingView>
  );
}

// --- Custom Drawer ---
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const { sessionId } = useSelector(state => state.auth);
  const [currentSession, setCurrentSession] = useState(sessionId);

  useEffect(() => {
    setCurrentSession(sessionId);
  }, [sessionId]);

  const drawerItems = [
    { label: 'Site Hakkında...', icon: 'information-circle', screen: 'About' },
    { label: 'Filmleri Keşfet', icon: 'search', screen: 'DiscoverMovies' },
    { label: 'Popüler Oyuncular', icon: 'people', screen: 'PopularPersons' },
    { label: 'Popüler Diziler', icon: 'tv', screen: 'PopularSeries' },
    { label: 'En İyi Diziler', icon: 'star', screen: 'TopSeries' },
    { label: 'Yaklaşan Filmler', icon: 'calendar', screen: 'UpComingMovies' },
    { label: 'Popüler Filmler', icon: 'film', screen: 'Home' },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      key={currentSession} // session değişince yeniden render
    >
      <SafeAreaView style={styles.drawerHeader}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.drawerTitle}>Taners Movie App</Text>
      </SafeAreaView>

      {drawerItems.map(item => (
        <DrawerItem
          key={item.label}
          label={() => <Text style={styles.drawerItemLabel}>{item.label}</Text>}
          icon={({ size }) => (
            <Ionicons name={item.icon} size={size} color="#01b4e4" />
          )}
          onPress={() => props.navigation.navigate(item.screen)}
        />
      ))}

      {currentSession ? (
        <>
          <DrawerItem
            label={() => <Text style={styles.drawerItemLabel}>Dashboard</Text>}
            icon={({ size }) => (
              <Ionicons name="grid" size={size} color="#01b4e4" />
            )}
            onPress={() => props.navigation.navigate('Dashboard')}
          />
          <DrawerItem
            label={() => <Text style={styles.drawerItemLabel}>Log Out</Text>}
            icon={({ size }) => (
              <Ionicons name="log-out" size={size} color="#01b4e4" />
            )}
            onPress={() => {
              dispatch(clearAuthState());
              Alert.alert('✅ Çıkış Yapıldı', 'Başarıyla çıkış yaptınız.');
              props.navigation.replace('Login');
            }}
          />
        </>
      ) : (
        <DrawerItem
          label={() => <Text style={styles.drawerItemLabel}>Giriş Yap</Text>}
          icon={({ size }) => (
            <Ionicons name="log-in" size={size} color="#01b4e4" />
          )}
          onPress={() => props.navigation.navigate('Login')}
        />
      )}
    </DrawerContentScrollView>
  );
}

// --- Drawer Navigator ---
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#1a1a1a' },
        drawerActiveTintColor: '#FFD166',
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Home">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <HomeScreen {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="DiscoverMovies">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <DiscoverMovies {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="PopularPersons">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <PopularPersons {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="PopularSeries">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <PopularSeries {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="TopSeries">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <TopSeries {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="UpComingMovies">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <UpComingMoviesScreen {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="About">
        {props => (
          <ScreenWithSearchAndFooter navigation={props.navigation}>
            <About {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Login">
        {props => (
          <ScreenWithSearchAndFooter
            navigation={props.navigation}
            hideSearch={true}
          >
            <Login {...props} />
          </ScreenWithSearchAndFooter>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Dashboard" component={DashboardWrapper} />
    </Drawer.Navigator>
  );
}

// --- App ---
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetailPage}
            options={{ title: 'Film Detayı' }}
          />
          <Stack.Screen
            name="SeriesDetail"
            component={SeriesDetailPage}
            options={{ title: 'Dizi Detayı' }}
          />
          <Stack.Screen
            name="PersonDetail"
            component={PersonDetail}
            options={{ title: 'Kişi Detayı' }}
          />
          <Stack.Screen
            name="SearchPerson"
            component={SearchPerson}
            options={{ title: 'Kişi Arama' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },
  searchWrapper: {
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: '#121212',
  },
  content: { flex: 1 },
  drawerContainer: { flex: 1, backgroundColor: '#121212' },
  drawerHeader: { padding: 20, alignItems: 'center' },
  logo: { width: 60, height: 60, marginBottom: 10, borderRadius: 30 },
  drawerTitle: { color: '#FFD166', fontSize: 24, fontWeight: '700' },
  drawerItemLabel: { color: '#fff', fontSize: 16 },
});
