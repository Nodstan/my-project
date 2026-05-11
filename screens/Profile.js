import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [editingNickname, setEditingNickname] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");

  const API_URL = `${BASE_URL}/auth/profile`;

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Please log in again.");
        navigation.navigate("Signin");
        return;
      }

      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setUsername(data.username || "");
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setLevel(data.education || "");
      } else {
        Alert.alert("Error", data.message || "Failed to load profile");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network error while fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Please log in again.");
        navigation.navigate("Signin");
        return;
      }

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          fullName,
          email,
          education: level,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        setUser(data.user);
        setEditingProfile(false);
        setEditingNickname(false);
      } else {
        Alert.alert("Error", data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network error while updating profile");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={26} color="#1C274C" />
              </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View>
                <Image
                  source={require("../assets/avatar.png")}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.editIcon} onPress={() => Alert.alert("Info", "Photo upload coming soon")}>
                  <Image
                    source={require("../assets/edit.png")}
                    style={{ width: 16, height: 16, tintColor: "#143664" }}
                  />
                </TouchableOpacity>
              </View>

              {editingNickname ? (
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={[styles.username, styles.usernameInput]}
                  placeholder="Enter nickname"
                />
              ) : (
                <Text style={styles.username}>
                  {user ? user.username || "No nickname" : "Loading..."}
                </Text>
              )}

              <TouchableOpacity
                style={styles.editNicknameBtn}
                onPress={() =>
                  editingNickname ? updateProfile() : setEditingNickname(true)
                }
              >
                <Text style={styles.editNicknameText}>
                  {editingNickname ? "Save Nickname" : "Edit Nickname"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ✅ Name Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name</Text>
                {editingProfile ? (
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    placeholder="Enter full name"
                  />
                ) : (
                  <Text style={styles.value}>{fullName || "N/A"}</Text>
                )}
              </View>
            </View>

            {/* ✅ Email + Level Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                {editingProfile ? (
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Enter email"
                  />
                ) : (
                  <Text style={styles.value}>{email || "N/A"}</Text>
                )}
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Level</Text>
                {editingProfile ? (
                  <TextInput
                    value={level}
                    onChangeText={setLevel}
                    style={styles.input}
                    placeholder="Enter level"
                  />
                ) : (
                  <Text style={styles.value}>{level || "N/A"}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.editProfileBtn}
                onPress={() =>
                  editingProfile ? updateProfile() : setEditingProfile(true)
                }
              >
                <Text style={styles.editProfileText}>
                  {editingProfile ? "Save Changes" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 16 },
  header: { marginTop: 10 },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  editIcon: {
    position: "absolute",
    bottom: -10,
    right: 45,
    backgroundColor: "#EAF1FF",
    borderRadius: 20,
    padding: 6,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C274C",
    marginTop: 40,
  },
  usernameInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    width: 160,
    textAlign: "center",
  },
  editNicknameBtn: {
    backgroundColor: "#EAF1FF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 6,
  },
  editNicknameText: {
    fontSize: 13,
    color: "#1C274C",
    paddingVertical: 4,
  },
  infoCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    alignItems: "center",
  },
  label: { color: "#143664", fontWeight: "500", fontSize: 14 },
  value: { color: "#456A9C", fontSize: 15, fontWeight: "500" },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    textAlign: "right",
    fontSize: 15,
    paddingVertical: 2,
    color: "#143664",
  },
  editProfileBtn: {
    alignSelf: "center",
    backgroundColor: "#EAF1FF",
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  editProfileText: {
    color: "#1C274C",
    fontSize: 14,
    fontWeight: "500",
  },
});
