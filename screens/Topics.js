import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Topics({ navigation }) {
  const [selected, setSelected] = useState("Nervous");

  const topics = [
    { key: "Cardiovascular", icon: "heart-outline" },
    { key: "Respiratory", icon: "pulse-outline" },
    { key: "Nervous", icon: "analytics-outline" },
    { key: "Integumentary/skin", icon: "color-palette-outline" },
    { key: "Renal/urinary", icon: "water-outline" },
    { key: "Musculoskeletal", icon: "walk-outline" },
    { key: "Gastrointestinal", icon: "restaurant-outline" },
    { key: "Reproductive", icon: "female-outline" },
    { key: "Immune/lymphatic", icon: "shield-outline" },
    { key: "Endocrine", icon: "flask-outline" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Topic</Text>
      <Text style={styles.subtitle}>
        Every system has a story.{"\n"}Where do you want to start?
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
            <Ionicons
              name={item.icon}
              size={18}
              color={selected === item.key ? "#fff" : "#4A6FFF"}
              style={{ marginRight: 6 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("SubTopic", { topic: selected })}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C274C",
    paddingTop: 70,
    marginTop: 20,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
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
    backgroundColor: "#2ECC71",
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
