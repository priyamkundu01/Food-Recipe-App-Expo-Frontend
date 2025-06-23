import { View, Text, Alert, KeyboardAvoidingView, TouchableOpacity, Platform, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons"

import { authStyles } from '../../assets/styles/auth.styles';
import { COLORS } from "../../constants/colors";

import VerifyEmail from "./verify-email";

const signUpScreen = () => {
  const router = useRouter();
  
  const { signUp, isLoaded } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    if (!password.length > 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
    }

    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password: password
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);

    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.message || "Failed to create account");
      console.log(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  if (pendingVerification) return <VerifyEmail email={email} onBack={() => setPendingVerification(false)} />

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i2.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setshowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                { loading ? 'Signing up...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Sign in Link */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={authStyles.linkContainer}
            >
              <Text
                style={authStyles.linkText}
              >
                Already have an account? <Text style={authStyles.link}>Sign in</Text>
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default signUpScreen;
