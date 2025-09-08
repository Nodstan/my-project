import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressDots from '../screens/ProgressDots';

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>
        
        <Text style={styles.title}>Your heart beats over {"\n"} 100,000 times a day</Text>

      <Image
        source={require('../assets/heart.png')}
        style={styles.image}
      />

      <Text style={styles.subtitle}>
        That’s like your heart clapping {"\n"} for you every second… now {"\n"} that’s dedication!
      </Text>
      
      <ProgressDots total={4} currentIndex={0} />

      <View style={styles.bottom}>
              <TouchableOpacity onPress={() => navigation.navigate('Onboarding4')}>
                <Text style={styles.skip}>skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('Onboarding2')}
              >
                <Text style={styles.nextText}><Image 
        source={require('../assets/chevron-right.png')} 
        style={styles.nextIcon} 
      /></Text>
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
        subtitle: { fontSize: 18, color: '#555', textAlign: 'center', marginBottom: 40 },
        bottom: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 90 },
        skip: { fontSize: 16, color: '#666' },
        nextButton: {
          backgroundColor: '#28A745',
          padding: 15,
          borderRadius: 30,
        },
        nextText: { color: '#fff', fontSize: 18 },
        nextIcon: {
          width: 24,
          height: 24,
          resizeMode: 'contain',
        },
        
      });
      