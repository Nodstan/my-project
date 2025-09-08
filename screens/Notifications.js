import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Easing
} from "react-native";
import { BlurView } from "expo-blur";

const sampleData = [
  { id: "1", text: "New story under Nervous system!" },
  { id: "2", text: "New story under Nervous system!" },
  { id: "3", text: "New story under Nervous system!" },
  { id: "4", text: "New story under Nervous system!" },
  { id: "5", text: "New story under Nervous system!" }
];

export default function Notifications({ visible, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (!visible) {
      setExpanded(false);
      animatedHeight.setValue(300);
    }
  }, [visible]);

  const toggleExpand = () => {
    const toValue = expanded ? 300 : 600;
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start();
    setExpanded(!expanded);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { height: animatedHeight }]}>

          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Notifications</Text>
            <View style={{ width: 24 }} />
          </View>

          <FlatList
            data={sampleData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notification}>
                <View style={styles.iconCircle}>
                  <Text style={{ fontSize: 16 }}>🔔</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.text}</Text>
                  <TouchableOpacity style={styles.checkBtn}>
                    <Text style={styles.checkText}>Check it out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            scrollEnabled={expanded}
          />

          {!expanded && (
            <TouchableOpacity onPress={toggleExpand} style={styles.seeMore}>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    padding: 16,
    overflow: "hidden"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  close: {
    fontSize: 18,
    color: "#333"
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EAF2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  text: {
    fontSize: 14,
    marginBottom: 4
  },
  checkBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#E9F7EF",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#27AE60"
  },
  checkText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#27AE60"
  },
  seeMore: {
    marginTop: 8,
    alignSelf: "center"
  },
  seeMoreText: {
    color: "#27AE60",
    fontWeight: "500"
  }
});
