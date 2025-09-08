import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function Results({ navigation }) {
  const score = 75;
  const correctAnswers = 23;
  const totalQuestions = 30;
  const timeTaken = "14 min, 8 secs";
  const category = "Nervous";
  const difficulty = "Hard";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>You scored</Text>

        <View style={styles.scoreBox}>
          <View style={styles.circle}>
            <Text style={styles.scoreText}>{score}%</Text>
          </View>
          <Text style={styles.message}>You're getting the hang of it!</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.row}>
            <Text style={styles.label}>Correct answers</Text>
            <Text style={styles.value}>
              {correctAnswers}/{totalQuestions}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time taken</Text>
            <Text style={styles.value}>{timeTaken}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Categories</Text>
            <Text style={styles.value}>{category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Difficulty Level</Text>
            <Text style={styles.value}>{difficulty}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => alert("Check answers pressed")}
        >
          <Text style={styles.primaryText}>Check answers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate("QuizHome")}
        >
          <Text style={styles.secondaryText}>Try another category</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#143664",
    marginBottom: 20,
  },
  scoreBox: {
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#EEF4FF",
    marginBottom: 30,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: "#4A6FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  message: {
    fontSize: 14,
    color: "#143664",
  },
  stats: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: "#143664",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
  },
  primaryBtn: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  secondaryText: {
    color: "#28A745",
    fontSize: 16,
    fontWeight: "600",
  },
});