import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  validateLogin,
  createUserSession,
  fetchAuthToken,
} from '../../store/auth/authThunk';

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // 👈 navigation hook eklendi
  const { loading, requestToken, error } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('⚠️ Hata', 'Kullanıcı adı ve şifre boş olamaz.');
      return;
    }

    try {
      let token = requestToken;
      if (!token) {
        const res = await dispatch(fetchAuthToken()).unwrap();
        token = res.request_token;
      }

      await dispatch(
        validateLogin({ username, password, request_token: token }),
      ).unwrap();

      const sessionRes = await dispatch(
        createUserSession({ request_token: token }),
      ).unwrap();

      Alert.alert('✅ Başarılı', 'Oturum açıldı!');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err) {
      Alert.alert(
        '❌ Giriş Başarısız',
        err?.message || 'Lütfen bilgilerinizi kontrol edin.',
      );
    }
  };

  const handleResetPassword = () => {
    Linking.openURL('https://www.themoviedb.org/reset-password');
  };

  return (
    <LinearGradient
      colors={['#141e30', '#243b55']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>🎬 TMDB Login</Text>

        <TextInput
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResetPassword}
          style={styles.resetLink}
        >
          <Text style={styles.resetText}>Şifreni mi unuttun? Sıfırla</Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', padding: 24 },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  resetLink: { marginTop: 24, alignSelf: 'center' },
  resetText: {
    color: '#ffd369',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  error: {
    color: '#ff6b6b',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});
