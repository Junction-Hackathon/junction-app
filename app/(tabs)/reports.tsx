import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Download, ChartBar as BarChart3, ChartPie as PieChart, TrendingUp } from 'lucide-react-native';

const reportTypes = [
  {
    id: 'donations',
    title: 'Donations Report',
    description: 'Complete donation analytics and trends',
    icon: BarChart3,
    color: '#10B981',
  },
  {
    id: 'deliveries',
    title: 'Delivery Performance',
    description: 'Delivery success rates and timing',
    icon: TrendingUp,
    color: '#3B82F6',
  },
  {
    id: 'workers',
    title: 'Worker Performance',
    description: 'Individual worker statistics',
    icon: PieChart,
    color: '#F59E0B',
  },
  {
    id: 'recipients',
    title: 'Recipients Impact',
    description: 'Families helped and distribution',
    icon: BarChart3,
    color: '#8B5CF6',
  },
];

const quickStats = [
  { label: 'Total Donations', value: '₨1,250,000', period: 'This Season' },
  { label: 'Families Helped', value: '89', period: 'This Month' },
  { label: 'Videos Verified', value: '145', period: 'This Week' },
  { label: 'Success Rate', value: '97.5%', period: 'Overall' },
];

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'season', label: 'This Season' },
    { id: 'year', label: 'This Year' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>Performance insights and trends</Text>
      </View>

      <View style={styles.periodSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.periodTabs}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodTab,
                  selectedPeriod === period.id && styles.activePeriodTab
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text style={[
                  styles.periodTabText,
                  selectedPeriod === period.id && styles.activePeriodTabText
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.quickStatsSection}>
          <Text style={styles.sectionTitle}>Quick Statistics</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statPeriod}>{stat.period}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.reportsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Detailed Reports</Text>
            <TouchableOpacity style={styles.exportButton}>
              <Download size={16} color="#10B981" />
              <Text style={styles.exportText}>Export All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reportsList}>
            {reportTypes.map((report) => {
              const IconComponent = report.icon;
              return (
                <TouchableOpacity key={report.id} style={styles.reportCard}>
                  <View style={styles.reportHeader}>
                    <View style={[styles.reportIcon, { backgroundColor: report.color + '20' }]}>
                      <IconComponent size={24} color={report.color} />
                    </View>
                    <View style={styles.reportInfo}>
                      <Text style={styles.reportTitle}>{report.title}</Text>
                      <Text style={styles.reportDescription}>{report.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Performance Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Average Processing Time</Text>
              <Text style={styles.summaryValue}>2.5 hours</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Customer Satisfaction</Text>
              <Text style={styles.summaryValue}>4.8/5.0</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>On-Time Delivery Rate</Text>
              <Text style={styles.summaryValue}>94.2%</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Video Verification Rate</Text>
              <Text style={styles.summaryValue}>98.7%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  periodSelector: {
    paddingBottom: 16,
  },
  periodTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  periodTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activePeriodTab: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activePeriodTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  quickStatsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  statPeriod: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  reportsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  exportText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  reportsList: {
    gap: 12,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportIcon: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  reportDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  downloadButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  summarySection: {
    padding: 20,
    paddingTop: 0,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});