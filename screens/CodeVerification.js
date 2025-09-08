import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CodeVerification({ navigation }) {
  const [code, setCode] = useState('');

  const handleChange = (value) => {

    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      setCode(numericValue);
    }
  };

  const isComplete = code.length === 4;

  return (
    <View style={styles.container}>

      <Text style={styles.backArrow}>←</Text>

      <Text style={styles.heading}>Your secret code is on{'\n'}it’s way!</Text>
      <Text style={styles.subHeading}>
        We sent a code to{' '}
        <Text style={styles.email}>zikkyemerald01@gmail.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.codeCircle,
              isComplete ? styles.codeCircleActive : styles.codeCircleInactive
            ]}
          >
            <Text style={styles.codeText}>{code[index] || ''}</Text>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.hiddenInput}
        keyboardType="number-pad"
        value={code}
        onChangeText={handleChange}
        maxLength={4}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, isComplete ? styles.buttonActive : styles.buttonDisabled]}
        disabled={!isComplete}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t get a code? 🥺 <Text style={styles.resendLink}>Resend</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  backArrow: {
    fontSize: 22,
    marginBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  email: {
    color: '#999',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  codeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeCircleInactive: {
    borderColor: '#007BFF',
  },
  codeCircleActive: {
    borderColor: '#007BFF',
    backgroundColor: '#EAF3FF',
  },
  codeText: {
    fontSize: 20,
    fontWeight: '600',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonDisabled: {
    backgroundColor: '#CDEED1',
  },
  buttonActive: {
    backgroundColor: '#0AA84F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    color: '#444',
  },
  resendLink: {
    color: '#0AA84F',
    fontWeight: '500',
  },
});
