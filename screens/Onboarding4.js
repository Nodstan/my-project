import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressDots from '../screens/ProgressDots';

export default function Onboarding4({ navigation }) {
  return (
    <View style={styles.container}>
        
        <Text style={styles.title}>Medicine, Told Like a {"\n"} Story</Text>

      <Image
              source={require('../assets/online-doctor.png')}
              style={styles.image}
            />
      
              <Text style={styles.subtitle}>
                  Explore the human body with {"\n"} tales and visuals that make it {"\n"} unforgettable.
              </Text>
      
      <ProgressDots total={4} currentIndex={3} />

      <View style={styles.bottom}>
              <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
                <Text style={styles.skip}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('SigninSignup')}
              >
                <Text style={styles.nextText}>
                    Get started
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#EAF5FF',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        },
        image: { width: 190, height: 150, marginBottom: 40 },
        title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30},
        subtitle: { fontSize: 19, color: '#555', textAlign: 'center', marginBottom: 40 },
        bottom: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 90 },
        skip: { fontSize: 16, color: '#666' },
        nextButton: {
          backgroundColor: '#28A745',
          padding: 15,
          borderRadius: 30,
        },
        nextText: { color: '#fff', fontSize: 18, padding: 6, textAlign: 'center' },
        nextIcon: {
          width: 24,
          height: 24,
          resizeMode: 'contain',
        },
        
      });
      