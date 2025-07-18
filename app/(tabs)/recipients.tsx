import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, MapPin, Users, Calendar } from 'lucide-react-native';

const mockRecipients = [
  {
    id: '1',
    name: 'Khadija Bibi',
    region: 'Karachi East',
    householdSize: 6,
    priority: 'high',
    lastReceived: '2024-12-25',
    notes: 'Widow with 4 children',
    phone: '+92 300 1111111',
  },
  {
    id: '2',
    name: 'Abdul Rahman',
    region: 'Lahore Central',
    householdSize: 4,
    priority: 'medium',
    lastReceived: '2025-01-10',
    notes: 'Elderly couple with disabled son',
    phone: '+92 300 2222222',
  },
  {
    id: '3',
    name: 'Maryam Sultana',
    region: 'Islamabad',
    householdSize: 8,
    priority: 'high',
    lastReceived: '2024-11-15',
    notes: 'Large family, father unemployed',
    phone: '+92 300 3333333',
  },
  {
    id: '4',
    name: 'Usman Ali',
    region: 'Karachi West',
    householdSize: 3,
    priority: 'low',
    lastReceived: '2025-01-05',
    notes: 'Recent beneficiary',
    phone: '+92 300 4444444',
  },
];

const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case 'high':
      return { color: '#EF4444', text: 'High Priority' };
    case 'medium':
      return { color: '#F59E0B', text: 'Medium Priority' };
    case 'low':
      return { color: '#10B981', text: 'Low Priority' };
    default:
      return { color: '#6B7280', text: 'Unknown' };
  }
};

export default function RecipientsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipients</Text>
        <Text style={styles.subtitle}>{mockRecipients.length} registered families</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Total Families</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>High Priority</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>356</Text>
          <Text style={styles.statLabel}>People Helped</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.recipientsList}>
          {mockRecipients.map((recipient) => {
            const priorityConfig = getPriorityConfig(recipient.priority);

            return (
              <TouchableOpacity key={recipient.id} style={styles.recipientCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>{recipient.name}</Text>
                    <View style={styles.locationContainer}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={styles.region}>{recipient.region}</Text>
                    </View>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: priorityConfig.color + '20' }]}>
                    <Text style={[styles.priorityText, { color: priorityConfig.color }]}>
                      {priorityConfig.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.recipientDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Users size={14} color="#6B7280" />
                      <Text style={styles.detailText}>Household: {recipient.householdSize}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Calendar size={14} color="#6B7280" />
                      <Text style={styles.detailText}>Last: {recipient.lastReceived}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.notes}>{recipient.notes}</Text>
                  <Text style={styles.phone}>{recipient.phone}</Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Contact</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                    <Text style={styles.primaryActionText}>Assign Delivery</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  recipientsList: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  recipientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  region: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  priorityBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recipientDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  notes: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  phone: {
    fontSize: 12,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  primaryAction: {
    backgroundColor: '#10B981',
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  primaryActionText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#10B981',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});