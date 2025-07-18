import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Truck, Video, Users } from 'lucide-react-native';

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  iconName: string;
}

const iconMap = {
  heart: Heart,
  truck: Truck,
  video: Video,
  users: Users,
};

export default function DashboardCard({ title, value, subtitle, color, iconName }: DashboardCardProps) {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Heart;

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <IconComponent size={20} color={color} />
          </View>
        </View>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    width: '48%',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    flex: 1,
  },
  iconContainer: {
    borderRadius: 8,
    padding: 6,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});