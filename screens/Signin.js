import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function Signin({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/chevron-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        Welcome back to {"\n"} <Text style={styles.brand}>MedTales!</Text>
      </Text>
      <Text style={styles.subtitle}>
        Sign in to keep exploring the {"\n"} magic of medicine.
      </Text>

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/mail.png')} style={styles.inputIcon} />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          placeholder="Enter password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <Image source={require('../assets/eye.png')} style={styles.dropdownIcon} />
      </View>

      {/* Sign Up button */}
      <TouchableOpacity style={styles.signUpBtn}>
        <Text style={styles.signUpText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
              You’ve been here before? 🫣{' '}
              <Text
                style={styles.signInLink}
                onPress={() => navigation.navigate('Signin')}
              >
                Sign in
              </Text>
            </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
    flexGrow: 1,
  },
  backBtn: {
    marginBottom: 30,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#143664',
    gap: 5,
    lineHeight: 28,
  },
  brand: {
    color: '#28A745',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7D7D7D',
    marginBottom: 30,
    gap: 5,
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    Color: '#2F80ED',
  },
  signUpBtn: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomText: {
    marginTop: 15,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  signInLink: {
    color: '#28A745',
    fontWeight: '600',
  },
});
