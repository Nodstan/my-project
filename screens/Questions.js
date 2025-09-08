import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Questions({ navigation }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = {
    text: "Which part of your brain is responsible for keeping your balance, even when you're trying to walk like a ninja on a tightrope?",
    options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Hippocampus"],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.endTest}>End test</Text>
          </TouchableOpacity>
          <Text style={styles.timer}>14:52</Text>
        </View>

        <View style={styles.progressWrapper}>
          <Ionicons name="heart-outline" size={20} color="#4A6FFF" style={{ marginRight: 8 }} />
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '30%' }]} /> 
          </View>
        </View>

        <Text style={styles.questionLabel}>Question 1</Text>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <Text style={styles.selectLabel}>Select answer</Text>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionWrapper}
            onPress={() => setSelectedAnswer(option)}
          >
            <Ionicons
              name={selectedAnswer === option ? "radio-button-on" : "radio-button-off"}
              size={20}
              color={selectedAnswer === option ? "#4A6FFF" : "#6b7280"}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

<TouchableOpacity
  style={styles.nextBtn}
  onPress={() => navigation.navigate('Questions2')}
>
  <Text style={styles.nextText}>Next question</Text>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  endTest: {
    fontSize: 14,
    color: '#4A6FFF',
    textDecorationLine: 'underline',
  },
  timer: {
    fontSize: 14,
    color: '#143664',
    fontWeight: '600',
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#4A6FFF',
    borderRadius: 4,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#143664',
    marginBottom: 8,
  },
  questionBox: {
    backgroundColor: '#EEF4FF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 15,
    color: '#143664',
    lineHeight: 22,
  },
  selectLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#143664',
    marginBottom: 10,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#143664',
  },
  nextBtn: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
