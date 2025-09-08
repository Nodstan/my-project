import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function FaceId({ navigation }) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/chevron-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Use your face to unlock{"\n"}the magic? ✨</Text>

      <Text style={styles.subtitle}>
        Turn on Face ID for fast and{"\n"}secure sign-ins.
      </Text>

      <Image 
        source={require('../assets/face-id-icon.png')} 
        style={styles.faceIcon}
      />

      <TouchableOpacity style={styles.enableBtn}>
        <Text style={styles.enableBtnText}>Enable Face ID</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.noThanks}>No thanks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 70,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 20,
  },
  faceIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 30,
  },
  enableBtn: {
    backgroundColor: '#00A86B',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 40,
    width: '90%',
    alignItems: 'center',
  },
  enableBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noThanks: {
    color: '#00A86B',
    marginTop: 20,
    fontSize: 14,
  },
});
