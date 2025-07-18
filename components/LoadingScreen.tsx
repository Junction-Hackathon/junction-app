import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moon } from 'lucide-react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconContainer}>
          <Moon size={48} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>قربانی</Text>
        <Text style={styles.subtitle}>Qurbani Management</Text>
      </View>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#065F46',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    backgroundColor: '#047857',
    borderRadius: 32,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7F3D0',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 16,
    color: '#A7F3D0',
    fontWeight: '500',
  },
});