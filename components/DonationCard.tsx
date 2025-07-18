import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, CreditCard as Edit, MapPin, Calendar } from 'lucide-react-native';

interface DonationCardProps {
  donation: {
    id: string;
    donorName: string;
    sheepId: string;
    videoStatus: string;
    deliveryStatus: string;
    assignedWorker: string;
    dateSubmitted: string;
    amount: number;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified':
    case 'delivered':
      return '#10B981';
    case 'pending':
      return '#F59E0B';
    case 'processing':
    case 'in_progress':
      return '#3B82F6';
    case 'rejected':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const getStatusText = (status: string) => {
  return status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
};

export default function DonationCard({ donation }: DonationCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.donorInfo}>
          <Text style={styles.donorName}>{donation.donorName}</Text>
          <Text style={styles.sheepId}>ID: {donation.sheepId}</Text>
        </View>
        <Text style={styles.amount}>₨{donation.amount.toLocaleString()}</Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Video:</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(donation.videoStatus) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(donation.videoStatus) }]}>
              {getStatusText(donation.videoStatus)}
            </Text>
          </View>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Delivery:</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(donation.deliveryStatus) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(donation.deliveryStatus) }]}>
              {getStatusText(donation.deliveryStatus)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.metaInfo}>
        <View style={styles.metaItem}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.metaText}>{donation.assignedWorker}</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.metaText}>{donation.dateSubmitted}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Eye size={16} color="#6B7280" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Edit size={16} color="#6B7280" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
    marginBottom: 2,
  },
  sheepId: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  statusContainer: {
    marginBottom: 12,
    gap: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    width: 60,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});