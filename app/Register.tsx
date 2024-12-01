import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {

    console.log('Registered');
    axios.post('http://localhost:8000/api/register', { name, email, password })
      .then(response => {
        Alert.alert('User Registered');
        router.push('/Login');
      })
      .catch(err => Alert.alert('Login Failed', err.message));
    // Navigate to another screen (e.g., Login or Dashboard) after successful registration
    // router.push('/Login');
  };

  const handleNavigateToLogin = () => {
    router.push('/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={(text) => setName(text)}

      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.alreadyRegisteredText}>
        Already have an account?{' '}
        <Text style={styles.loginText} onPress={handleNavigateToLogin}>
          Login here
        </Text>
      </Text>
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
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  registerButton: {
    width: '75%',
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alreadyRegisteredText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginText: {
    color: '#6200ee',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
