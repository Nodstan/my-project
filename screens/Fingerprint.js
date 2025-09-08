import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Fingerprint({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/chevron-left.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>One touch to unlock{"\n"}your tale.</Text>

      <Text style={styles.subtitle}>
        Enable fingerprint login for{"\n"}quick and secure access.
      </Text>

      <Image 
        source={require('../assets/fingerprint-icon.png')} 
        style={styles.fpIcon}
      />

      <TouchableOpacity style={styles.enableBtn}>
        <Text style={styles.enableBtnText}>Enable Fingerprint</Text>
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
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  fpIcon: {
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
