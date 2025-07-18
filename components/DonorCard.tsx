import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Video, Phone, MapPin } from 'lucide-react-native';
import { Donor } from '@/types/sacrifice';

interface DonorCardProps {
  donor: Donor;
}

const getSacrificeTypeText = (type: string) => {
  switch (type) {
    case 'goat': return 'Goat';
    case 'sheep': return 'Sheep';
    case 'cow_share': return 'Cow Share';
    default: return type;
  }
};

const getSacrificeTypeColor = (type: string) => {
  switch (type) {
    case 'goat': return '#10B981';
    case 'sheep': return '#3B82F6';
    case 'cow_share': return '#F59E0B';
    default: return '#6B7280';
  }
};

export default function DonorCard({ donor }: DonorCardProps) {
  const router = useRouter();
  const typeColor = getSacrificeTypeColor(donor.sacrificeType);

  const handleRecordVideo = () => {
    router.push({
      pathname: '/(sacrificer)/record-video',
      params: { donorId: donor.id }
    });
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.donorInfo}>
          <Text style={styles.donorName}>{donor.name}</Text>
          <Text style={styles.sheepId}>ID: {donor.sheepId}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
          <Text style={[styles.typeText, { color: typeColor }]}>
            {getSacrificeTypeText(donor.sacrificeType)}
          </Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₨{donor.amount.toLocaleString()}</Text>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Phone size={14} color="#6B7280" />
          <Text style={styles.contactText}>{donor.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.contactText}>{donor.region}</Text>
        </View>
      </View>

      {donor.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesText}>{donor.notes}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.recordButton} onPress={handleRecordVideo}>
        <Video size={20} color="#FFFFFF" />
        <Text style={styles.recordButtonText}>Record Sacrifice</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sheepId: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  amountContainer: {
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065F46',
  },
  contactInfo: {
    marginBottom: 12,
    gap: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  notesContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 13,
    color: '#92400E',
    fontStyle: 'italic',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 12,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});