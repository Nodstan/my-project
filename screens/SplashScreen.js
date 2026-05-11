import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const shrinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(shrinkAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        navigation.replace("Onboarding1");
      });
    }, 2000);
  }, []);

  const animatedStyle = {
    width: shrinkAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 60],
    }),
    height: shrinkAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 60],
    }),
    borderRadius: shrinkAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    }),
    bottom: shrinkAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 35],
    }),
    right: shrinkAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    }),
    position: 'absolute',
  };

  const textOpacity = shrinkAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
          MedTales
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EAF5FF', // Matches Onboarding background
  },
  box: { 
    backgroundColor: '#28A745', 
    alignItems: 'center', 
    justifyContent: 'center',
    right: 0,
    bottom: 0,
  },
  text: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
