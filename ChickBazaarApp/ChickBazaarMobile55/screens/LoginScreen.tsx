import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../context/AuthContext";
import AuthService from "../services/auth.service";

export default function LoginScreen({ navigation }: any) {
  const { login: signIn } = useAuth();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (loading) {
      return;
    }

    const mobileNumber = mobile.trim();

    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await AuthService.login({
        mobile: mobileNumber,
      });

      await signIn(response);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={30}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />

          <View style={styles.card}>
            <Text style={styles.title}>
              Retailer Login
            </Text>

            <Text style={styles.subtitle}>
              Login using your registered mobile number to continue.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={10}
              editable={!loading}
              value={mobile}
              autoComplete="tel"
              textContentType="telephoneNumber"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
              blurOnSubmit
              accessibilityLabel="Mobile number"
              onSubmitEditing={handleLogin}
              onChangeText={(text) =>
                setMobile(text.replace(/\D/g, ""))
              }
            />

            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={loading}
              onPress={handleLogin}
              accessibilityRole="button"
              accessibilityLabel="Login"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading}
              style={loading && styles.linkDisabled}
              onPress={() =>
                navigation.navigate("Register")
              }
            >
              <Text style={styles.register}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.version}>
              ChickBazaar Retailer App
            </Text>

            <Text style={styles.versionNo}>
              Version 1.0.0
            </Text>

            <Text style={styles.powered}>
              Made with ❤️ in India
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logoImage: {
    width: 250,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 35,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 10,
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#0F172A",
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#F97316",
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  register: {
    textAlign: "center",
    marginTop: 22,
    color: "#F97316",
    fontWeight: "700",
    fontSize: 15,
  },

  linkDisabled: {
    opacity: 0.6,
  },

  footer: {
    alignItems: "center",
    marginTop: 34,
    paddingBottom: 20,
  },

  version: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
  },

  versionNo: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 13,
  },

  powered: {
    marginTop: 8,
    color: "#94A3B8",
    fontSize: 12,
  },
});