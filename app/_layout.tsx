import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { AuthProvider } from "@/contexts/AuthContext";
import { useVideoSyncer } from "@/hooks/useVideoSyncer";
import { useEffect, useState } from "react";
import { dbManager } from "@/db";
import NetInfo from "@react-native-community/netinfo";
import { View, ActivityIndicator, Text } from "react-native";
import { videoStorage } from "@/video-storage";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

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
        <Toast />
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
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 14,
        color: "gray",
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),

  info: ({ text1, text2, ...rest }) => (
    <View
      style={{
        height: 60,
        backgroundColor: "#2f86f6",
        borderRadius: 8,
        padding: 10,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
      {text2 ? <Text style={{ color: "white" }}>{text2}</Text> : null}
    </View>
  ),
};
