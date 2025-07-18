import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import VideoCard from '@/components/VideoCard';
import SearchBar from '@/components/SearchBar';

const mockVideos = [
  {
    id: '1',
    donorName: 'Ahmed Hassan',
    sheepId: 'SH001',
    submittedBy: 'Muhammad Ali',
    status: 'pending',
    timeSubmitted: '2025-01-15 14:30',
    duration: '2:45',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    donorName: 'Fatima Khan',
    sheepId: 'SH002',
    submittedBy: 'Omar Malik',
    status: 'approved',
    timeSubmitted: '2025-01-15 12:15',
    duration: '3:12',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    donorName: 'Ali Raza',
    sheepId: 'SH003',
    submittedBy: 'Hassan Ahmed',
    status: 'flagged',
    timeSubmitted: '2025-01-15 10:45',
    duration: '1:58',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '4',
    donorName: 'Aisha Siddique',
    sheepId: 'SH004',
    submittedBy: 'Ibrahim Khan',
    status: 'processing',
    timeSubmitted: '2025-01-15 09:30',
    duration: '2:20',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export default function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = mockVideos.filter(video =>
      video.donorName.toLowerCase().includes(query.toLowerCase()) ||
      video.sheepId.toLowerCase().includes(query.toLowerCase()) ||
      video.submittedBy.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(video => video.status === selectedFilter);
    }

    setFilteredVideos(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    let filtered = mockVideos;

    if (filter !== 'all') {
      filtered = filtered.filter(video => video.status === filter);
    }

    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.sheepId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  };

  const statusCounts = {
    all: mockVideos.length,
    pending: mockVideos.filter(v => v.status === 'pending').length,
    approved: mockVideos.filter(v => v.status === 'approved').length,
    flagged: mockVideos.filter(v => v.status === 'flagged').length,
    processing: mockVideos.filter(v => v.status === 'processing').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Verification</Text>
        <Text style={styles.subtitle}>{filteredVideos.length} videos to review</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search videos..."
        />
      </View>

      <View style={styles.filterTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {Object.entries(statusCounts).map(([status, count]) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterTab,
                  selectedFilter === status && styles.activeFilterTab
                ]}
                onPress={() => handleFilterChange(status)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === status && styles.activeFilterTabText
                ]}>
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.videosList}>
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterTabs: {
    paddingBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  filterTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterTab: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  videosList: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
});