import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Eye, EyeOff, Download, Calendar } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const mockDonorVideos = [
  {
    id: '1',
    sheepId: 'SH001',
    sacrificeType: 'goat',
    amount: 25000,
    status: 'completed',
    recordedAt: '2025-01-15 14:30',
    processedAt: '2025-01-15 15:15',
    originalUrl: 'https://example.com/video1.mp4',
    blurredUrl: 'https://example.com/video1_blurred.mp4',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
    aiVerified: true,
  },
  {
    id: '2',
    sheepId: 'SH002',
    sacrificeType: 'sheep',
    amount: 30000,
    status: 'processing',
    recordedAt: '2025-01-15 12:15',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    sheepId: 'SH003',
    sacrificeType: 'cow_share',
    amount: 28000,
    status: 'pending',
    recordedAt: '2025-01-14 16:20',
    thumbnail: 'https://images.pexels.com/photos/2132178/pexels-photo-2132178.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return { color: '#10B981', text: 'Ready to View' };
    case 'processing':
      return { color: '#3B82F6', text: 'Processing' };
    case 'pending':
      return { color: '#F59E0B', text: 'Pending' };
    default:
      return { color: '#6B7280', text: 'Unknown' };
  }
};

const getSacrificeTypeText = (type: string) => {
  switch (type) {
    case 'goat': return 'Goat';
    case 'sheep': return 'Sheep';
    case 'cow_share': return 'Cow Share';
    default: return type;
  }
};

export default function DonorVideosScreen() {
  const { user } = useAuth();
  const [blurPreference, setBlurPreference] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>السلام عليكم</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Your sacrifice videos</Text>
      </View>

      <View style={styles.preferencesCard}>
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Blur Blood in Videos</Text>
            <Text style={styles.preferenceDescription}>
              Hide graphic content for sensitive viewing
            </Text>
          </View>
          <Switch
            value={blurPreference}
            onValueChange={setBlurPreference}
            trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
            thumbColor={blurPreference ? '#10B981' : '#FFFFFF'}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockDonorVideos.filter(v => v.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockDonorVideos.filter(v => v.status === 'processing').length}
          </Text>
          <Text style={styles.statLabel}>Processing</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockDonorVideos.reduce((sum, v) => sum + v.amount, 0).toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Total (₨)</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.videosList}>
          {mockDonorVideos.map((video) => {
            const statusConfig = getStatusConfig(video.status);

            return (
              <TouchableOpacity key={video.id} style={styles.videoCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.videoInfo}>
                    <Text style={styles.sheepId}>ID: {video.sheepId}</Text>
                    <Text style={styles.sacrificeType}>
                      {getSacrificeTypeText(video.sacrificeType)}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>₨{video.amount.toLocaleString()}</Text>
                </View>

                <View style={styles.videoDetails}>
                  <View style={styles.detailItem}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.detailText}>
                      Recorded: {new Date(video.recordedAt).toLocaleDateString()}
                    </Text>
                  </View>
                  {video.processedAt && (
                    <View style={styles.detailItem}>
                      <Calendar size={14} color="#10B981" />
                      <Text style={styles.detailText}>
                        Processed: {new Date(video.processedAt).toLocaleDateString()}
                      </Text>
                    </View>
                  )}
                </View>

                {video.aiVerified && (
                  <View style={styles.verificationBadge}>
                    <Text style={styles.verificationText}>✓ AI Verified</Text>
                  </View>
                )}

                {video.status === 'completed' && (
                  <View style={styles.videoActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Play size={16} color="#F59E0B" />
                      <Text style={styles.actionText}>
                        Watch {blurPreference ? 'Blurred' : 'Original'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Download size={16} color="#6B7280" />
                      <Text style={styles.actionText}>Download</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {video.status === 'processing' && (
                  <View style={styles.processingNotice}>
                    <Text style={styles.processingText}>
                      Your video is being processed. You'll be notified when it's ready.
                    </Text>
                  </View>
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
    backgroundColor: '#065F46',
    padding: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 18,
    color: '#F59E0B',
    fontWeight: '600',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#A7F3D0',
    fontWeight: '500',
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#6B7280',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#F59E0B',
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
  videosList: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  videoCard: {
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
  videoInfo: {
    flex: 1,
  },
  sheepId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sacrificeType: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
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
  videoDetails: {
    marginBottom: 12,
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  verificationBadge: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  verificationText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
    textAlign: 'center',
  },
  videoActions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  processingNotice: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  processingText: {
    fontSize: 12,
    color: '#1E40AF',
    textAlign: 'center',
    fontWeight: '500',
  },
});