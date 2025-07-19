import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Moon, Star } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthWelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.iconContainer}>
              <Moon size={48} color="#FFFFFF" />
              <Star size={20} color="#F59E0B" style={styles.star} />
            </View>
            <Text style={styles.title}>قربانی</Text>
            <Text style={styles.subtitle}>Qurbani Management System</Text>
          </View>

          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Manage your Qurbani with transparency and trust
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ensuring transparency in Islamic sacrifice
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#065F46",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    position: "relative",
    backgroundColor: "#047857",
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
  },
  star: {
    position: "absolute",
    top: -4,
    right: -4,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#A7F3D0",
    fontWeight: "500",
    textAlign: "center",
  },
  welcomeText: {
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 20,
    color: "#F59E0B",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#D1FAE5",
    textAlign: "center",
    lineHeight: 24,
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#A7F3D0",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#A7F3D0",
  },
  footer: {
    alignItems: "center",
    paddingTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#A7F3D0",
    textAlign: "center",
  },
});
