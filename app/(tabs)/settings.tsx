import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  CircleHelp as HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Settings", hasSwitch: false },
        { icon: Shield, label: "Privacy & Security", hasSwitch: false },
        {
          icon: Bell,
          label: "Notifications",
          hasSwitch: true,
          value: notifications,
          onToggle: setNotifications,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          icon: Database,
          label: "Auto Sync",
          hasSwitch: true,
          value: autoSync,
          onToggle: setAutoSync,
        },
        {
          icon: Palette,
          label: "Dark Mode",
          hasSwitch: true,
          value: darkMode,
          onToggle: setDarkMode,
        },
        { icon: Globe, label: "Language & Region", hasSwitch: false },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help & Documentation", hasSwitch: false },
        { icon: Database, label: "System Status", hasSwitch: false },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your preferences</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Admin User</Text>
              <Text style={styles.profileEmail}>admin@qurbani.org</Text>
              <Text style={styles.profileRole}>Organization Administrator</Text>
            </View>
          </View>
        </View>

        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < section.items.length - 1 &&
                        styles.settingItemBorder,
                    ]}
                  >
                    <View style={styles.settingLeft}>
                      <View style={styles.settingIcon}>
                        <IconComponent size={20} color="#6B7280" />
                      </View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>

                    {item.hasSwitch ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: "#E5E7EB", true: "#86EFAC" }}
                        thumbColor={item.value ? "#10B981" : "#FFFFFF"}
                      />
                    ) : (
                      <ChevronRight size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.logoutButton}>
              <LogOut size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Qurbani Management System</Text>
          <Text style={styles.versionNumber}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 Charitable Organization</Text>
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
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    paddingTop: 0,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  appInfo: {
    padding: 20,
    alignItems: "center",
  },
  appVersion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
