import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function Password({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/chevron-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.subtitle}>
        Reset it, remember it, and {"\n"} return to the tales.
      </Text>

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          placeholder="Old password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={!showOldPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
          <Image
            source={
              showOldPassword
                ? require('../assets/eye.png')
                : require('../assets/eyes.png')
            }
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          placeholder="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Image
            source={
              showNewPassword
                ? require('../assets/eye.png')
                : require('../assets/eyes.png')
            }
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signUpBtn} onPress={() => alert('Password Changed')}>
        <Text style={styles.signUpText}>Change Password</Text>
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#143664',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7D7D7D',
    marginBottom: 30,
    lineHeight: 22,
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
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#2F80ED',
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
});
