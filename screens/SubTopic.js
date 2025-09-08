import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SubTopic() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("Brain and Spinal Cord");

  const topics = [
    { key: "Foundations" },
    { key: "Brain and Spinal Cord" },
    { key: "PNS and Automatic Nervous System" },
    { key: "Neurophysiology and Biochemistry" },
    { key: "Clinical Neurology" },
    { key: "Advanced Neuroscience" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/chevron-left.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Choose sub-topic</Text>

      <Text style={styles.subtitle}>
        Let's get specific. Choose what{"\n"}part you want to explore.
      </Text>

      <View style={styles.topicGrid}>
        {topics.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.topicButton,
              selected === item.key && styles.topicButtonSelected,
            ]}
            onPress={() => setSelected(item.key)}
          >
            <Text
              style={[
                styles.topicText,
                selected === item.key && styles.topicTextSelected,
              ]}
            >
              {item.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
    flexGrow: 1,
  },
  backBtn: {
    marginBottom: 30,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: "#143664",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7D7D7D",
    marginBottom: 30,
    lineHeight: 22,
  },
  topicGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  topicButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F3FA",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    margin: 6,
  },
  topicButtonSelected: {
    backgroundColor: "#4A6FFF",
  },
  topicText: {
    fontSize: 14,
    color: "#1C274C",
    marginRight: 6,
    fontWeight: "500",
  },
  topicTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
