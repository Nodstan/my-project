import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="settings-outline"
                size={20}
                color="#4A6FFF"
                style={styles.icon}
              />
              <Text style={styles.sectionTitle}>General settings</Text>
            </View>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Font size</Text>
              <View style={styles.optionBox}>
                <Text style={styles.optionText}>Default</Text>
                <Ionicons name="chevron-down" size={16} color="#1C274C" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Language</Text>
              <View style={styles.optionBox}>
                <Text style={styles.optionText}>English</Text>
                <Ionicons name="chevron-down" size={16} color="#1C274C" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#4A6FFF"
                style={styles.icon}
              />
              <Text style={styles.sectionTitle}>Notifications</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>App notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#ccc", true: "#E9F7EF" }}
                thumbColor={"#27AE60"}
              />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="alarm-outline"
                size={20}
                color="#4A6FFF"
                style={styles.icon}
              />
              <Text style={styles.sectionTitle}>Reminders</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Turn on reminders</Text>
              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ false: "#ccc", true: "#E9F7EF" }}
                thumbColor={"#27AE60"}
              />
            </View>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Set reminder</Text>
              <View style={styles.optionBox}>
                <Text style={styles.optionText}>9:00AM</Text>
                <Ionicons name="chevron-down" size={16} color="#1C274C" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#4A6FFF"
                style={styles.icon}
              />
              <Text style={styles.sectionTitle}>Security</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Enable biometrics</Text>
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: "#ccc", true: "#E9F7EF" }}
                thumbColor={"#27AE60"}
              />
            </View>

            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("Password")}
            >
              <Text style={styles.label}>Change password</Text>
              <Ionicons name="chevron-forward" size={18} color="#1C274C" />
            </TouchableOpacity>
          </View>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  inner: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    backgroundColor: "#EAF1FF",
    padding: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C274C",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    color: "#1C274C",
  },
  optionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 14,
    marginRight: 4,
    color: "#1C274C",
  },
});
