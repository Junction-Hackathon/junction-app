import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Check, Truck } from 'lucide-react-native';

const mockDeliveries = [
  {
    id: '1',
    donorName: 'Ahmed Hassan',
    address: 'Block A, Gulshan-e-Iqbal, Karachi',
    driver: 'Muhammad Ali',
    status: 'in_transit',
    estimatedTime: '15 minutes',
    distance: '2.5 km',
  },
  {
    id: '2',
    donorName: 'Fatima Khan',
    address: 'Defence Phase 2, Lahore',
    driver: 'Omar Malik',
    status: 'delivered',
    deliveredAt: '2:30 PM',
    distance: '5.2 km',
  },
  {
    id: '3',
    donorName: 'Ali Raza',
    address: 'Blue Area, Islamabad',
    driver: 'Hassan Ahmed',
    status: 'pending',
    estimatedTime: '45 minutes',
    distance: '8.1 km',
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'delivered':
      return { color: '#10B981', icon: Check, text: 'Delivered' };
    case 'in_transit':
      return { color: '#3B82F6', icon: Truck, text: 'In Transit' };
    case 'pending':
      return { color: '#F59E0B', icon: Clock, text: 'Pending' };
    default:
      return { color: '#6B7280', icon: Clock, text: 'Unknown' };
  }
};

export default function DeliveriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Deliveries</Text>
        <Text style={styles.subtitle}>{mockDeliveries.length} active deliveries</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>In Transit</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Delivered Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.deliveriesList}>
          {mockDeliveries.map((delivery) => {
            const statusConfig = getStatusConfig(delivery.status);
            const StatusIcon = statusConfig.icon;

            return (
              <TouchableOpacity key={delivery.id} style={styles.deliveryCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.donorInfo}>
                    <Text style={styles.donorName}>{delivery.donorName}</Text>
                    <View style={styles.addressContainer}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={styles.address}>{delivery.address}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                    <StatusIcon size={12} color={statusConfig.color} />
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.deliveryInfo}>
                  <Text style={styles.driverText}>Driver: {delivery.driver}</Text>
                  <Text style={styles.distanceText}>Distance: {delivery.distance}</Text>
                </View>

                <View style={styles.timeInfo}>
                  {delivery.status === 'delivered' ? (
                    <Text style={styles.deliveredTime}>Delivered at {delivery.deliveredAt}</Text>
                  ) : (
                    <Text style={styles.estimatedTime}>ETA: {delivery.estimatedTime}</Text>
                  )}
                </View>

                {delivery.status === 'in_transit' && (
                  <TouchableOpacity style={styles.trackButton}>
                    <MapPin size={16} color="#FFFFFF" />
                    <Text style={styles.trackButtonText}>Track Live</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })}
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
  deliveriesList: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  deliveryCard: {
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
  donorInfo: {
    flex: 1,
  },
  donorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  address: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  driverText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeInfo: {
    marginBottom: 12,
  },
  deliveredTime: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  estimatedTime: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});