import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { AxiosError } from "axios";
import { Nullable } from "@/types";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: "Mohammed Djaoued",
    lastName: "Bouhadda",
    email: "bhdmeddjaoued@gmail.com",
    password: "Djaouedouu124@",
    confirmPassword: "Djaouedouu124@",
    phone: "0698690027",
    role: UserRole.DONOR,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { register, user, error, isLoading } = useAuth();

  const [globalError, setGlobalError] = useState<Nullable<string>>(null);

  const router = useRouter();

  const handleRegister = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
      phoneNumber: formData.phone,
    });
  };

  useEffect(() => {
    if (!error) return;
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.status === 400)
        return setGlobalError(error.response?.data.message);

      if (error.status === 401)
        return setGlobalError("Invalid email or password");
    }
    return setGlobalError("Unknown error.");
  }, [error]);

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
        <Text style={styles.title}>Create Account</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.roleSelector}>
            <Text style={styles.label}>I am a:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === UserRole.DONOR && styles.roleButtonActive,
                ]}
                onPress={() =>
                  setFormData((prev) => ({ ...prev, role: UserRole.DONOR }))
                }
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === UserRole.DONOR &&
                      styles.roleButtonTextActive,
                  ]}
                >
                  Donor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === UserRole.DABAH && styles.roleButtonActive,
                ]}
                onPress={() =>
                  setFormData((prev) => ({ ...prev, role: UserRole.DABAH }))
                }
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === UserRole.DABAH &&
                      styles.roleButtonTextActive,
                  ]}
                >
                  Sacrificer
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, firstName: text }))
              }
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, lastName: text }))
              }
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phone: text }))
              }
              placeholder="+92 300 1234567"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={formData.password}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, password: text }))
                }
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password *</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmPassword}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, confirmPassword: text }))
              }
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
            />
          </View>

          <View>
            <Text style={styles.errorMessage}>{globalError}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              isLoading && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.loginLink}>
            Already have an account?{" "}
            <Text style={styles.loginLinkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "rgba(255, 40, 40, 1)",
    fontSize: 16,
  },
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
  },
  form: {
    marginBottom: 24,
  },
  roleSelector: {
    marginBottom: 24,
  },
  roleButtons: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  roleButtonActive: {
    backgroundColor: "#F0FDF4",
    borderColor: "#10B981",
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  roleButtonTextActive: {
    color: "#10B981",
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
  registerButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  loginLink: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  loginLinkBold: {
    fontWeight: "600",
    color: "#F59E0B",
  },
});
