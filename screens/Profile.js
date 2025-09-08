import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#1C274C" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View>
            <Image
              source={require("../assets/avatar.png")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
  <Image 
    source={require("../assets/edit.png")} 
    style={{ width: 16, height: 16, color: "#143664" }} 
  />
</TouchableOpacity>

          </View>
          <Text style={styles.username}>Zikky💜</Text>

          <TouchableOpacity style={styles.editNicknameBtn}>
            <Text style={styles.editNicknameText}>Edit nickname</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Talubi Isaac</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>zikkyemerald@...</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Level</Text>
            <Text style={styles.value}>Secondary</Text>
          </View>

          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    marginTop: 10,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: -10,
    right: 45,
    backgroundColor: "#EAF1FF",
    color: "#143664",
    borderRadius: 20,
    padding: 6,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C274C",
    marginTop: 40,
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
  },
  label: {
    color: "#143664",
    fontWeight: "500",
    fontSize: 14,
  },
  value: {
    color: "#456A9C",
    fontSize: 15,
    fontWeight: "500",
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
