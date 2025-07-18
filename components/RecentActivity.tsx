import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Check, Clock, TriangleAlert as AlertTriangle, Upload } from 'lucide-react-native';

const activities = [
  {
    id: '1',
    type: 'video_verified',
    message: 'Video verified for Ahmed Hassan (SH001)',
    time: '2 minutes ago',
    icon: Check,
    color: '#10B981',
  },
  {
    id: '2',
    type: 'delivery_completed',
    message: 'Delivery completed for Fatima Khan',
    time: '15 minutes ago',
    icon: Check,
    color: '#10B981',
  },
  {
    id: '3',
    type: 'video_pending',
    message: 'New video uploaded by Omar Malik',
    time: '1 hour ago',
    icon: Upload,
    color: '#F59E0B',
  },
  {
    id: '4',
    type: 'video_flagged',
    message: 'Video flagged for review (SH003)',
    time: '2 hours ago',
    icon: AlertTriangle,
    color: '#EF4444',
  },
];

export default function RecentActivity() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <View style={styles.activityList}>
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.iconContainer, { backgroundColor: activity.color + '20' }]}>
                <IconComponent size={16} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});