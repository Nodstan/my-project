import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("token", data.token);

        Alert.alert("Success", "Signed in successfully!");
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Signin error:", error);
      Alert.alert("Error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={require("../assets/chevron-left.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        Welcome back to {"\n"} <Text style={styles.brand}>MedTales!</Text>
      </Text>
      <Text style={styles.subtitle}>
        Sign in to keep exploring the {"\n"} magic of medicine.
      </Text>

      {/* Email input */}
      <View style={styles.inputWrapper}>
        <Image source={require("../assets/mail.png")} style={styles.inputIcon} />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password input */}
      <View style={styles.inputWrapper}>
        <Image source={require("../assets/lock.png")} style={styles.inputIcon} />
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={
              showPassword
                ? require("../assets/eyes.png")
                : require("../assets/eye.png")
            }
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign In button */}
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={handleSignin}
        disabled={loading}
      >
        <Text style={styles.signUpText}>
          {loading ? "Signing in..." : "Sign in"}
        </Text>
      </TouchableOpacity>

      {/* Forgot password */}
      <Text style={styles.bottomText}>
        Forgot password? 🫣{" "}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate("Password")}
        >
          Click here!
        </Text>
      </Text>
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
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: "#143664",
    lineHeight: 28,
  },
  brand: {
    color: "#28A745",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7D7D7D",
    marginBottom: 30,
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B0C4DE",
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#2F80ED",
  },
  signUpBtn: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomText: {
    marginTop: 15,
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  signInLink: {
    color: "#28A745",
    fontWeight: "600",
  },
});
