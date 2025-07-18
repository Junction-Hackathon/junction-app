import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '@/components/DashboardCard';
import StatsOverview from '@/components/StatsOverview';
import RecentActivity from '@/components/RecentActivity';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Qurbani Management</Text>
          <Text style={styles.subtitle}>Dashboard Overview</Text>
        </View>

        <StatsOverview />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.cardGrid}>
            <DashboardCard
              title="Pending Videos"
              value="12"
              subtitle="Awaiting verification"
              color="#F59E0B"
              iconName="video"
            />
            <DashboardCard
              title="Active Deliveries"
              value="8"
              subtitle="In progress"
              color="#3B82F6"
              iconName="truck"
            />
            <DashboardCard
              title="New Donations"
              value="24"
              subtitle="Today"
              color="#10B981"
              iconName="heart"
            />
            <DashboardCard
              title="Available Workers"
              value="15"
              subtitle="On duty"
              color="#8B5CF6"
              iconName="users"
            />
          </View>
        </View>

        <RecentActivity />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});