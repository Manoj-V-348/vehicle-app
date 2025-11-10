import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockBookings } from '../../data/mockUsers';
import { Booking, BookingStatus } from '../../types';

interface FilterState {
  status: BookingStatus | 'All';
  bookingType: 'All' | 'Purchase' | 'Rental' | 'Test Drive';
  sortBy: 'date' | 'amount' | 'status';
}

interface BookingDetailModalProps {
  visible: boolean;
  booking: Booking | null;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  visible,
  booking,
  onClose,
  onConfirm,
  onCancel,
}) => {
  if (!booking) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Booking Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Image source={{ uri: booking.vehicleImage }} style={styles.modalImage} />

          <View style={styles.modalDetails}>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Booking ID</Text>
              <Text style={styles.modalValue}>{booking.id}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Vehicle</Text>
              <Text style={styles.modalValue}>{booking.vehicleName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Type</Text>
              <Text style={styles.modalValue}>{booking.bookingType}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Start Date</Text>
              <Text style={styles.modalValue}>
                {new Date(booking.startDate).toLocaleDateString()}
              </Text>
            </View>
            {booking.endDate && (
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>End Date</Text>
                <Text style={styles.modalValue}>
                  {new Date(booking.endDate).toLocaleDateString()}
                </Text>
              </View>
            )}
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Total Amount</Text>
              <Text style={[styles.modalValue, { color: colors.primary, fontWeight: '700' }]}>
                ${booking.totalAmount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Payment Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      booking.paymentStatus === 'Paid'
                        ? colors.success + '15'
                        : booking.paymentStatus === 'Pending'
                        ? colors.warning + '15'
                        : colors.danger + '15',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        booking.paymentStatus === 'Paid'
                          ? colors.success
                          : booking.paymentStatus === 'Pending'
                          ? colors.warning
                          : colors.danger,
                    },
                  ]}
                >
                  {booking.paymentStatus}
                </Text>
              </View>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Booking Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      booking.status === 'Confirmed'
                        ? colors.success + '15'
                        : booking.status === 'Pending'
                        ? colors.warning + '15'
                        : booking.status === 'Completed'
                        ? colors.primary + '15'
                        : colors.danger + '15',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        booking.status === 'Confirmed'
                          ? colors.success
                          : booking.status === 'Pending'
                          ? colors.warning
                          : booking.status === 'Completed'
                          ? colors.primary
                          : colors.danger,
                    },
                  ]}
                >
                  {booking.status}
                </Text>
              </View>
            </View>
          </View>

          {booking.status === 'Pending' && (
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Ionicons name="close-circle" size={20} color={colors.danger} />
                <Text style={styles.cancelButtonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const AdminBookingsScreen = ({ navigation }: any) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'All',
    bookingType: 'All',
    sortBy: 'date',
  });

  const handleConfirmBooking = (bookingId: string) => {
    Alert.alert('Confirm Booking', 'Are you sure you want to confirm this booking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          setBookings(
            bookings.map((b) => (b.id === bookingId ? { ...b, status: 'Confirmed' as BookingStatus } : b))
          );
          setDetailModalVisible(false);
          Alert.alert('Success', 'Booking confirmed successfully');
        },
      },
    ]);
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => {
          setBookings(
            bookings.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as BookingStatus } : b))
          );
          setDetailModalVisible(false);
          Alert.alert('Success', 'Booking cancelled');
        },
      },
    ]);
  };

  const getFilteredBookings = () => {
    let filtered = [...bookings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'All') {
      filtered = filtered.filter((b) => b.status === filters.status);
    }

    // Booking type filter
    if (filters.bookingType !== 'All') {
      filtered = filtered.filter((b) => b.bookingType === filters.bookingType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'amount':
          return b.totalAmount - a.totalAmount;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredBookings = getFilteredBookings();

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return colors.success;
      case 'Pending':
        return colors.warning;
      case 'Completed':
        return colors.primary;
      case 'Cancelled':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => {
        setSelectedBooking(item);
        setDetailModalVisible(true);
      }}
    >
      <Image source={{ uri: item.vehicleImage }} style={styles.bookingImage} />

      <View style={styles.bookingInfo}>
        <View style={styles.bookingHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bookingId}>#{item.id}</Text>
            <Text style={styles.vehicleName}>{item.vehicleName}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) + '15' },
            ]}
          >
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {new Date(item.startDate).toLocaleDateString()}
              {item.endDate && ` - ${new Date(item.endDate).toLocaleDateString()}`}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cube" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{item.bookingType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="card" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{item.paymentStatus}</Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <View>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amountValue}>${item.totalAmount.toLocaleString()}</Text>
          </View>
          {item.status === 'Pending' && (
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleConfirmBooking(item.id);
                }}
              >
                <Ionicons name="checkmark" size={20} color={colors.success} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleCancelBooking(item.id);
                }}
              >
                <Ionicons name="close" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
    completed: bookings.filter((b) => b.status === 'Completed').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Manage Bookings</Text>
          <Text style={styles.headerSubtitle}>
            {filteredBookings.length} of {bookings.length} bookings
          </Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{bookingStats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.warning }]}>
            {bookingStats.pending}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.success }]}>
            {bookingStats.confirmed}
          </Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {bookingStats.completed}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by booking ID or vehicle..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterChipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filters.status === 'All' && styles.filterChipActive,
            ]}
            onPress={() => setFilters({ ...filters, status: 'All' })}
          >
            <Text
              style={[
                styles.filterChipText,
                filters.status === 'All' && styles.filterChipTextActive,
              ]}
            >
              All Status
            </Text>
          </TouchableOpacity>
          {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as BookingStatus[]).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                filters.status === status && styles.filterChipActive,
              ]}
              onPress={() => setFilters({ ...filters, status })}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filters.status === status && styles.filterChipTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar" size={64} color={colors.systemGray3} />
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      <BookingDetailModal
        visible={detailModalVisible}
        booking={selectedBooking}
        onClose={() => setDetailModalVisible(false)}
        onConfirm={() => selectedBooking && handleConfirmBooking(selectedBooking.id)}
        onCancel={() => selectedBooking && handleCancelBooking(selectedBooking.id)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  headerTitle: {
    ...textPresets.title2,
    color: colors.text,
  },
  headerSubtitle: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...textPresets.title3,
    color: colors.text,
    fontWeight: '700',
  },
  statLabel: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    ...textPresets.body,
    color: colors.text,
    marginLeft: 8,
  },
  filterChipsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.systemGray6,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    ...textPresets.callout,
    color: colors.text,
  },
  filterChipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingImage: {
    width: '100%',
    height: 160,
    backgroundColor: colors.systemGray6,
  },
  bookingInfo: {
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingId: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  vehicleName: {
    ...textPresets.headline,
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    ...textPresets.caption1,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amountLabel: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  amountValue: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: '700',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    ...textPresets.headline,
    color: colors.textSecondary,
    marginTop: 16,
  },
  emptySubtext: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
    marginTop: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    ...textPresets.title2,
    color: colors.text,
  },
  modalImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.systemGray6,
    marginBottom: 20,
  },
  modalDetails: {
    paddingHorizontal: 20,
    gap: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalLabel: {
    ...textPresets.callout,
    color: colors.textSecondary,
  },
  modalValue: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: '600',
  },
  modalActions: {
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
  confirmButton: {
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonText: {
    ...textPresets.headline,
    color: colors.white,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: colors.danger + '15',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButtonText: {
    ...textPresets.headline,
    color: colors.danger,
    fontWeight: '600',
  },
});

export default AdminBookingsScreen;
