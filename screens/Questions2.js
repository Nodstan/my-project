import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Questions2({ navigation }) {
  const [selected, setSelected] = useState(null);

  const question =
    "During intense problem-solving, your brain increases communication between which two lobes to analyze and make decisions?";
  const options = [
    "Temporal and occipital lobes",
    "Parietal and Brainstem",
    "Frontal and Parietal lobes",
    "Occipital and Cerebellum",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.topBar}>
          <TouchableOpacity>
            <Text style={styles.endTest}>End test</Text>
          </TouchableOpacity>
          <Text style={styles.timer}>06:23</Text>
        </View>

        <View style={styles.progressContainer}>
          <Ionicons
            name="heart"
            size={18}
            color="#4A6FFF"
            style={{ marginRight: 6 }}
          />
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "50%" }]} />
          </View>
        </View>

        <Text style={styles.questionNumber}>Question 15</Text>

        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{question}</Text>
        </View>

        <Text style={styles.selectText}>Select answer</Text>
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => setSelected(index)}
          >
            <View
              style={[
                styles.radioOuter,
                selected === index && { borderColor: "#4A6FFF" },
              ]}
            >
              {selected === index && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => navigation.navigate("Results")}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  endTest: {
    color: "#4A6FFF",
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  timer: {
    fontSize: 15,
    color: "#143664",
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5ECFF",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: "#4A6FFF",
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#143664",
    marginBottom: 12,
  },
  questionBox: {
    backgroundColor: "#EEF4FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  questionText: {
    fontSize: 15,
    color: "#143664",
    lineHeight: 22,
  },
  selectText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#143664",
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#94a3b8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4A6FFF",
  },
  optionText: {
    fontSize: 15,
    color: "#143664",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  backBtn: {
    borderWidth: 1.5,
    borderColor: "#28A745",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 35,
  },
  backText: {
    fontSize: 15,
    color: "#28A745",
    fontWeight: "600",
  },
  nextBtn: {
    backgroundColor: "#28A745",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 35,
  },
  nextText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },
});
