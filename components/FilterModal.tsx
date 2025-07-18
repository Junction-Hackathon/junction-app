import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, Filter } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onFilter: (filters: any) => void;
}

export default function FilterModal({ visible, onClose, onFilter }: FilterModalProps) {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState('all');

  const statuses = ['all', 'pending', 'verified', 'processing', 'rejected'];
  const workers = ['all', 'Muhammad Ali', 'Omar Malik', 'Hassan Ahmed', 'Ibrahim Khan'];

  const handleApplyFilters = () => {
    onFilter({
      status: selectedStatus,
      worker: selectedWorker,
    });
  };

  const handleReset = () => {
    setSelectedStatus('all');
    setSelectedWorker('all');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Filter size={20} color="#1F2937" />
              <Text style={styles.title}>Filter Donations</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.optionsGrid}>
                {statuses.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.option,
                      selectedStatus === status && styles.selectedOption
                    ]}
                    onPress={() => setSelectedStatus(status)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedStatus === status && styles.selectedOptionText
                    ]}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Assigned Worker</Text>
              <View style={styles.optionsGrid}>
                {workers.map((worker) => (
                  <TouchableOpacity
                    key={worker}
                    style={[
                      styles.option,
                      selectedWorker === worker && styles.selectedOption
                    ]}
                    onPress={() => setSelectedWorker(worker)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedWorker === worker && styles.selectedOptionText
                    ]}>
                      {worker === 'all' ? 'All Workers' : worker}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});