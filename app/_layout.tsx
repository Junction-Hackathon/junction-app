import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { AuthProvider } from "@/contexts/AuthContext";
import { useVideoSyncer } from "@/hooks/useVideoSyncer";
import { useEffect, useState } from "react";
import { dbManager } from "@/db";
import NetInfo from "@react-native-community/netinfo";
import { View, ActivityIndicator } from "react-native";
import { videoStorage } from "@/video-storage";

export default function RootLayout() {
  useFrameworkReady();
  const [isInitialized, setIsInitialized] = useState(false);
  const { sync } = useVideoSyncer();

  useEffect(() => {
    const init = async () => {
      await dbManager.init();
      await videoStorage.init();
      setIsInitialized(true);
    };

    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (!state.isConnected) return;
      try {
        await sync();
      } catch (err) {
        console.log(err);
      }
    });

    init();
    return () => unsubscribe();
  }, [sync]);

  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#065F46",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(sacrificer)" />
        <Stack.Screen name="(donor)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </AuthProvider>
  );
}
