import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import { UserRole } from "@/types/user";

export default function IndexScreen() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        if (user.role === UserRole.DABAH) {
          router.replace("/(sacrificer)");
        } else {
          router.replace("/(donor)");
        }
      } else {
        router.replace("/auth");
      }
    }
  }, [isAuthenticated, isLoading, user]);

  return (
    <View style={styles.container}>
      <LoadingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
