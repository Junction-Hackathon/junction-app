import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { AuthProvider } from "@/contexts/AuthContext";
import { dbManager } from "@/db";
import { useVideoSyncer } from "@/hooks/useVideoSyncer";
import { videoStorage } from "@/video-storage";
import NetInfo from "@react-native-community/netinfo";

export default function RootLayout() {
  useFrameworkReady();
  const { sync } = useVideoSyncer();

  useEffect(() => {
    dbManager.init();
    videoStorage.init();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (!state.isConnected) return;
      return sync();
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(sacrificer)" />
        <Stack.Screen name="(donor)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="#065F46" />
    </AuthProvider>
  );
}
