// components/ProgressDots.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressDots({ total, currentIndex }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  dot: {
    width: 15,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5
  },
  activeDot: {
    backgroundColor: '#28A745',
    width: 45,
  },
  inactiveDot: {
    backgroundColor: '#BCE6CE'
  }
});
