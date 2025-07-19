import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Download, Wifi, WifiOff } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "@/components/SearchBar";
import SacrificeCard from "@/components/SacrificeCard";
import { Sacrifice } from "@/types/sacrifice";
import tryCatch from "@/utils/try-catch";
import { API } from "@/api";
import { useVideoSyncer } from "@/hooks/useVideoSyncer";

export default function SacrificerDonorsScreen() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sacrifices, setSacrifices] = useState<Sacrifice[]>([]);
  const { error, isUploading, notSynced, shouldSync, state, lastSync } =
    useVideoSyncer();

  useEffect(() => {
    const load = async () => {
      const [sacrifices, err] = await tryCatch(() =>
        API.Sacrifices.fetchSacrifices()
      );

      if (sacrifices === null || err !== null) {
        console.log(err);
        return;
      }

      return setSacrifices(sacrifices);
    };
    load();
  }, []);

  const handleSyncData = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>السلام عليكم</Text>
            <Text style={styles.userName}>{user?.firstName}</Text>
          </View>
          <View style={styles.connectionStatus}>
            {state.isConnected ? (
              <Wifi size={20} color="#10B981" />
            ) : (
              <WifiOff size={20} color="#EF4444" />
            )}
            <Text
              style={[
                styles.statusText,
                { color: state.isConnected ? "#10B981" : "#EF4444" },
              ]}
            >
              {state.isConnected ? "Online" : "Offline"}
            </Text>
          </View>
        </View>

        <View style={styles.syncContainer}>
          <TouchableOpacity style={styles.syncButton} onPress={handleSyncData}>
            <Download size={16} color="#F59E0B" />
            <Text style={styles.syncText}>Sync Donors</Text>
          </TouchableOpacity>
          {lastSync && (
            <Text style={styles.lastSyncText}>
              Last sync: {lastSync.toLocaleTimeString()}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search donors or sheep ID..."
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sacrifices.length}</Text>
          <Text style={styles.statLabel}>Total Donors</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.donorsList}>
          {sacrifices.map((sacrifice) => (
            <SacrificeCard key={sacrifice.id} sacrifice={sacrifice} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#065F46",
    padding: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 18,
    color: "#F59E0B",
    fontWeight: "600",
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  syncContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  syncText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F59E0B",
  },
  lastSyncText: {
    fontSize: 12,
    color: "#A7F3D0",
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F59E0B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  donorsList: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
});
