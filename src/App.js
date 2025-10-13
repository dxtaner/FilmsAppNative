import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { store } from './store/index.js';

import About from './components/Home/About.js';
import HomeScreen from './components/Home/Home.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      {' '}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Ana Sayfa' }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ title: 'Hakkında' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
