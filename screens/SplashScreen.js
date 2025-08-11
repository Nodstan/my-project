import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MedTales</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#28A745', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});
