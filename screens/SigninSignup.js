import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SigninSignup({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.brand}>MedTales</Text>, where medicine{'\n'}meets imagination
      </Text>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/google.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Sign up with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/apple.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Sign up with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUpText}>Sign up</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
    fontWeight: '500',
  },
  brand: {
    color: '#28A745',
    fontWeight: '700',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
    color: '#000',
  },
  signUpBtn: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
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
  },
  signInLink: {
    color: '#28A745',
    fontWeight: '600',
  },
});
