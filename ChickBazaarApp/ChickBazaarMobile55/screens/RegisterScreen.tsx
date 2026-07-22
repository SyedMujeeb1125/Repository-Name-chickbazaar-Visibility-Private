import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

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

import { API } from "../config/api";
import Api from "../services/api";
import AuthService from "../services/auth.service";

type RegisterResponse = {
  success: boolean;
  error?: string;
};

export default function RegisterScreen({
  navigation,
}: any) {
  const { login: signIn } = useAuth();

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid =
    shopName.trim().length > 0 &&
    ownerName.trim().length > 0 &&
    /^\d{10}$/.test(mobile);

  const submit = async () => {
    Keyboard.dismiss();

    if (loading || !isFormValid) {
      return;
    }

    const shop = shopName.trim();
    const owner = ownerName.trim();
    const mobileNumber = mobile.trim();

    try {
      setLoading(true);

      const response =
        await Api.post<RegisterResponse>(
          API.AUTH.REGISTER,
          {
            shopName: shop,
            ownerName: owner,
            mobile: mobileNumber,
          }
        );

      if (!response.success) {
        Alert.alert(
          "Registration Failed",
          response.error ??
            "Unable to register retailer."
        );
        return;
      }

      const loginResponse =
        await AuthService.login({
          mobile: mobileNumber,
        });

      await signIn(loginResponse);

      Alert.alert(
        "Success",
        "Retailer registered successfully."
      );
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error?.message ??
          "Unable to connect to the server."
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
              Retailer Registration
            </Text>

            <Text style={styles.subtitle}>
              Register your retail shop to
              start ordering healthy live
              broiler chicken.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Shop Name"
              accessibilityLabel="Shop name"
              autoFocus
              editable={!loading}
              value={shopName}
              returnKeyType="next"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={setShopName}
            />

            <TextInput
              style={styles.input}
              placeholder="Owner Name"
              accessibilityLabel="Owner name"
              editable={!loading}
              value={ownerName}
              returnKeyType="next"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={setOwnerName}
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              accessibilityLabel="Mobile number"
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              autoComplete="tel"
              autoCorrect={false}
              autoCapitalize="none"
              maxLength={10}
              returnKeyType="done"
              blurOnSubmit
              editable={!loading}
              value={mobile}
              onChangeText={(text) =>
                setMobile(
                  text.replace(/\D/g, "")
                )
              }
              onSubmitEditing={submit}
            />

            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid || loading) &&
                  styles.buttonDisabled,
              ]}
              disabled={
                !isFormValid || loading
              }
              onPress={submit}
              accessibilityRole="button"
              accessibilityLabel="Register"
            >
              {loading ? (
                <ActivityIndicator
                  color="#FFFFFF"
                />
              ) : (
                <Text style={styles.buttonText}>
                  Register
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading}
              style={
                loading && styles.linkDisabled
              }
              onPress={() =>
                navigation.goBack()
              }
            >
              <Text style={styles.loginText}>
                Already have an account?
                Login
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
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#F97316",
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
  },

  loginText: {
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