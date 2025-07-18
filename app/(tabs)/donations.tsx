import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus } from 'lucide-react-native';
import DonationCard from '@/components/DonationCard';
import SearchBar from '@/components/SearchBar';
import FilterModal from '@/components/FilterModal';

const mockDonations = [
  {
    id: '1',
    donorName: 'Ahmed Hassan',
    sheepId: 'SH001',
    videoStatus: 'verified',
    deliveryStatus: 'delivered',
    assignedWorker: 'Muhammad Ali',
    dateSubmitted: '2025-01-15',
    amount: 25000,
  },
  {
    id: '2',
    donorName: 'Fatima Khan',
    sheepId: 'SH002',
    videoStatus: 'pending',
    deliveryStatus: 'in_progress',
    assignedWorker: 'Omar Malik',
    dateSubmitted: '2025-01-15',
    amount: 30000,
  },
  {
    id: '3',
    donorName: 'Ali Raza',
    sheepId: 'SH003',
    videoStatus: 'verified',
    deliveryStatus: 'pending',
    assignedWorker: 'Hassan Ahmed',
    dateSubmitted: '2025-01-14',
    amount: 28000,
  },
  {
    id: '4',
    donorName: 'Aisha Siddique',
    sheepId: 'SH004',
    videoStatus: 'processing',
    deliveryStatus: 'pending',
    assignedWorker: 'Ibrahim Khan',
    dateSubmitted: '2025-01-14',
    amount: 35000,
  },
];

export default function DonationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filteredDonations, setFilteredDonations] = useState(mockDonations);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockDonations.filter(donation =>
      donation.donorName.toLowerCase().includes(query.toLowerCase()) ||
      donation.sheepId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDonations(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Donations</Text>
        <Text style={styles.subtitle}>{filteredDonations.length} active donations</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search donations..."
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilter(true)}
        >
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.donationsList}>
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onFilter={(filters) => {
          // Apply filters logic here
          setShowFilter(false);
        }}
      />
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  donationsList: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
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