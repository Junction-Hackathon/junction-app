import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Check, X, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface VideoCardProps {
  video: {
    id: string;
    donorName: string;
    sheepId: string;
    submittedBy: string;
    status: string;
    timeSubmitted: string;
    duration: string;
    thumbnail: string;
  };
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { color: '#F59E0B', icon: Clock, text: 'Pending Review' };
    case 'approved':
      return { color: '#10B981', icon: Check, text: 'Approved' };
    case 'flagged':
      return { color: '#EF4444', icon: AlertTriangle, text: 'Flagged' };
    case 'processing':
      return { color: '#3B82F6', icon: Clock, text: 'Processing' };
    default:
      return { color: '#6B7280', icon: Clock, text: 'Unknown' };
  }
};

export default function VideoCard({ video }: VideoCardProps) {
  const statusConfig = getStatusConfig(video.status);
  const StatusIcon = statusConfig.icon;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
          <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
        </View>
        <Text style={styles.duration}>{video.duration}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.donorInfo}>
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

        <View style={styles.metaInfo}>
          <Text style={styles.submittedBy}>Submitted by: {video.submittedBy}</Text>
          <Text style={styles.timeSubmitted}>{video.timeSubmitted}</Text>
        </View>

        {video.status === 'pending' && (
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
              <Check size={16} color="#FFFFFF" />
              <Text style={styles.approveText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
              <X size={16} color="#FFFFFF" />
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 160,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
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
  metaInfo: {
    marginBottom: 12,
  },
  submittedBy: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  timeSubmitted: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  approveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rejectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});