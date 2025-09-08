import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function QuizSetup({ navigation }) {
  const [questions, setQuestions] = useState('');
  const [time, setTime] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#143664" />
      </TouchableOpacity>

      <Text style={styles.title}>Quiz setup</Text>
      <Text style={styles.subtitle}>
        Set your pace, and start the {"\n"} adventure.
      </Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="help-circle-outline" size={22} color="#2F80ED" style={styles.inputIcon} />
        <TextInput
          placeholder="Set number of questions"
          value={questions}
          onChangeText={setQuestions}
          style={styles.input}
          keyboardType="numeric"
        />
        <Ionicons name="chevron-down" size={20} color="#2F80ED" style={styles.dropdownIcon} />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="time-outline" size={22} color="#2F80ED" style={styles.inputIcon} />
        <TextInput
          placeholder="-- : --"
          value={time}
          onChangeText={setTime}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

<TouchableOpacity
  style={styles.signUpBtn}
  onPress={() => navigation.navigate("Questions", { 
    questions: questions, 
    time: time 
  })}
>
  <Text style={styles.signUpText}>Start quiz</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  dropdownIcon: {
    marginLeft: 10,
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
