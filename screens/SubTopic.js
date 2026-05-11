import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SubTopic() {
  const navigation = useNavigation();
  const route = useRoute();

  const mainTopicRaw = route.params?.topic || "Nervous";
  const mainTopic = useMemo(() => {
    const trimmed = String(mainTopicRaw || "").trim();
    if (!trimmed) return "Nervous system";
    if (trimmed.toLowerCase().includes("system")) return trimmed;
    return `${trimmed} system`;
  }, [mainTopicRaw]);

  const subTopics = useMemo(() => {
    const key = String(mainTopicRaw || "").toLowerCase();
    if (key.includes("nervous")) {
      return [
        "Foundations",
        "Brain and Spinal Cord",
        "PNS and Autonomic Nervous System",
        "Neurophysiology and Biochemistry",
        "Clinical Neurology",
        "Advanced Neuroscience",
      ];
    }

    return ["Foundations", "Core Concepts", "Clinical", "Advanced"];
  }, [mainTopicRaw]);

  const [step, setStep] = useState("subtopics");
  const [selectedSubTopic, setSelectedSubTopic] = useState(subTopics[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const stories = [
    {
      id: "cardiac-cycle",
      title: "The House with Four Doors",
      description: "Once upon a time in the center of the body stood...",
      tag: "Cardiac Cycle",
      image: require("../assets/heartss.png"),
    },
    {
      id: "cardiac-cycle-2",
      title: "The House with Four Doors",
      description: "Once upon a time in the center of the body stood...",
      tag: "Cardiac Cycle",
      image: require("../assets/heartss.png"),
    },
    {
      id: "cardiac-cycle-3",
      title: "The House with Four Doors",
      description: "Once upon a time in the center of the body stood...",
      tag: "Cardiac Cycle",
      image: require("../assets/heartss.png"),
    },
    {
      id: "cardiac-cycle-4",
      title: "The House with Four Doors",
      description: "Once upon a time in the center of the body stood...",
      tag: "Cardiac Cycle",
      image: require("../assets/heartss.png"),
    },
  ];

  const filteredStories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return stories;
    return stories.filter((s) => {
      const haystack = `${s.title} ${s.description} ${s.tag}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, stories]);

  const handleBack = () => {
    if (step === "stories") {
      setStep("subtopics");
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {step === "subtopics" ? (
        <View style={styles.subtopicsWrap}>
          <View style={styles.topHeader}>
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="#143664" />
            </TouchableOpacity>
            <View style={{ width: 24 }} />
          </View>

          <Text style={styles.pickTitle}>Choose Sub - topic</Text>
          <Text style={styles.pickSubtitle}>
            Let’s get specific. Choose what{"\n"}part you want to explore.
          </Text>

          <View style={styles.chipsWrap}>
            {subTopics.map((label) => {
              const active = selectedSubTopic === label;
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setSelectedSubTopic(label)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => setStep("stories")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="#143664" />
            </TouchableOpacity>
            <Text style={styles.title}>{mainTopic}</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#888"
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.gridContainer}>
              {filteredStories.map((story) => (
                <View key={story.id} style={styles.card}>
                  <Image source={story.image} style={styles.cardImage} />

                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                      {story.title}
                    </Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                      {story.description}
                    </Text>

                    <View style={styles.tagContainer}>
                      <Text style={styles.tagText}>{story.tag}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.readBtn}
                      onPress={() =>
                        navigation.navigate("MainTabs", {
                          screen: "Topics",
                          params: {
                            screen: "TopicDetails",
                            params: { topicId: story.id },
                          },
                        })
                      }
                    >
                      <Text style={styles.readText}>Read</Text>
                      <Ionicons name="arrow-forward" size={16} color="#143664" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subtopicsWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 5,
  },
  pickTitle: {
    marginTop: 26,
    fontSize: 20,
    fontWeight: "700",
    color: "#1C274C",
    textAlign: "center",
  },
  pickSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  chipsWrap: {
    marginTop: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    backgroundColor: "#EEF4FF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
    margin: 6,
  },
  chipActive: {
    backgroundColor: "#4A6FFF",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#143664",
  },
  chipTextActive: {
    color: "#fff",
  },
  continueButton: {
    marginTop: 24,
    backgroundColor: "#2ECC71",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#143664",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#F8FBFF",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#143664",
    marginBottom: 4,
    lineHeight: 18,
  },
  cardDesc: {
    fontSize: 12,
    color: "#7D7D7D",
    marginBottom: 10,
    lineHeight: 16,
  },
  tagContainer: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#28A745",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  tagText: {
    color: "#28A745",
    fontSize: 10,
    fontWeight: "600",
  },
  readBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  readText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#143664",
    marginRight: 4,
  },
});
