import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setAuthError('');

    let isValid = true;
    if (!validateEmail(email) || password.length < 6) {
      setAuthError('Please enter a valid email and password.');
      isValid = false;
    }

    if (isValid) {
        axios.post('http://localhost:8000/api/login', { email, password })
          .then(response => {
            console.log(response.data);
            window.localStorage.setItem('token', response.data.token);
            Alert.alert('Login Successful');
            router.push('/TruckRequest');
          })
          .catch(err => Alert.alert('Login Failed', err.message));
      console.log('Logged In');
      // router.push('/TruckRequest');
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          style={[styles.input, authError && styles.errorInput]}
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={[styles.input, authError && styles.errorInput]}
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.notRegisteredText}>
          Not registered?{' '}
          <Text style={styles.registerText} onPress={handleNavigateToRegister}>
            Register here
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  errorInput: {
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#ff5252',
    fontSize: 13,
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '100%',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notRegisteredText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  registerText: {
    color: '#6200ee',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
