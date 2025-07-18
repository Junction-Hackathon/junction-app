import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Upload, Check, Clock, TriangleAlert as AlertTriangle, Wifi, WifiOff } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const mockVideos = [
  {
    id: '1',
    donorName: 'Ahmed Hassan',
    sheepId: 'SH001',
    status: 'uploading',
    recordedAt: '2025-01-15 14:30',
    uploadProgress: 65,
    localPath: '/storage/videos/video1.mp4',
  },
  {
    id: '2',
    donorName: 'Fatima Khan',
    sheepId: 'SH002',
    status: 'completed',
    recordedAt: '2025-01-15 12:15',
    uploadedAt: '2025-01-15 12:45',
    localPath: '/storage/videos/video2.mp4',
  },
  {
    id: '3',
    donorName: 'Ali Raza',
    sheepId: 'SH003',
    status: 'pending',
    recordedAt: '2025-01-15 10:45',
    localPath: '/storage/videos/video3.mp4',
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { color: '#F59E0B', icon: Clock, text: 'Pending Upload' };
    case 'uploading':
      return { color: '#3B82F6', icon: Upload, text: 'Uploading' };
    case 'completed':
      return { color: '#10B981', icon: Check, text: 'Completed' };
    case 'failed':
      return { color: '#EF4444', icon: AlertTriangle, text: 'Failed' };
    default:
      return { color: '#6B7280', icon: Clock, text: 'Unknown' };
  }
};

export default function SacrificerVideosScreen() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>My Videos</Text>
          <View style={styles.connectionStatus}>
            {isOnline ? (
              <Wifi size={16} color="#10B981" />
            ) : (
              <WifiOff size={16} color="#EF4444" />
            )}
            <Text style={[styles.statusText, { color: isOnline ? '#10B981' : '#EF4444' }]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Recorded sacrifice videos</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockVideos.filter(v => v.status === 'pending').length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockVideos.filter(v => v.status === 'uploading').length}
          </Text>
          <Text style={styles.statLabel}>Uploading</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockVideos.filter(v => v.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.videosList}>
          {mockVideos.map((video) => {
            const statusConfig = getStatusConfig(video.status);
            const StatusIcon = statusConfig.icon;

            return (
              <TouchableOpacity key={video.id} style={styles.videoCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.videoInfo}>
                    <Text style={styles.donorName}>{video.donorName}</Text>
                    <Text style={styles.sheepId}>ID: {video.sheepId}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                    <StatusIcon size={12} color={statusConfig.color} />
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.videoDetails}>
                  <Text style={styles.recordedTime}>
                    Recorded: {video.recordedAt}
                  </Text>
                  {video.uploadedAt && (
                    <Text style={styles.uploadedTime}>
                      Uploaded: {video.uploadedAt}
                    </Text>
                  )}
                </View>

                {video.status === 'uploading' && video.uploadProgress && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[styles.progressFill, { width: `${video.uploadProgress}%` }]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{video.uploadProgress}%</Text>
                  </View>
                )}

                {video.status === 'pending' && !isOnline && (
                  <View style={styles.offlineNotice}>
                    <WifiOff size={14} color="#F59E0B" />
                    <Text style={styles.offlineText}>
                      Will upload when connection is restored
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
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#A7F3D0',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  videoInfo: {
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  videoDetails: {
    marginBottom: 8,
  },
  recordedTime: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  uploadedTime: {
    fontSize: 12,
    color: '#10B981',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  offlineText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
});