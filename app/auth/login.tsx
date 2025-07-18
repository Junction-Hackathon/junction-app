import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { AxiosError } from "axios";
import { Nullable } from "@/types";

export default function LoginScreen() {
  const [email, setEmail] = useState("donor@test.com");
  const [password, setPassword] = useState("Test123@");
  const [showPassword, setShowPassword] = useState(false);

  const [globalError, setGlobalError] = useState<Nullable<string>>(null);

  const { isLoading, login, error, user } = useAuth();

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    await login({ email, password });
  };

  useEffect(() => {
    if (!error) return;
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.status === 401)
        return setGlobalError("Invalid email or password");
    }
    return setGlobalError("Unknown error.");
  }, [error]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!isLoading && user !== null) return router.push("/");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View style={styles.demoCredentials}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>Sacrificer: sacrificer@test.com</Text>
            <Text style={styles.demoText}>Donor: donor@test.com</Text>
            <Text style={styles.demoText}>Password: any</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text style={styles.registerLink}>
            Don't have an account?{" "}
            <Text style={styles.registerLinkBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#065F46",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#1F2937",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
  },
  eyeButton: {
    padding: 14,
  },
  loginButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  demoCredentials: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: "#047857",
    marginBottom: 2,
  },
  registerLink: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  registerLinkBold: {
    fontWeight: "600",
    color: "#F59E0B",
  },
});
