import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockBookings } from '../../data/mockUsers';
import type { Booking, BookingStatus } from '../../types';

const BookingHistoryScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const filterBookings = () => {
    const now = new Date();
    switch (selectedTab) {
      case 'upcoming':
        return mockBookings.filter(
          (booking) =>
            (booking.status === 'Confirmed' || booking.status === 'Pending') &&
            new Date(booking.startDate) >= now
        );
      case 'completed':
        return mockBookings.filter((booking) => booking.status === 'Completed');
      case 'cancelled':
        return mockBookings.filter((booking) => booking.status === 'Cancelled');
      default:
        return mockBookings;
    }
  };

  const filteredBookings = filterBookings();

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
        return colors.systemGray;
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'checkmark-circle';
      case 'Pending':
        return 'time';
      case 'Completed':
        return 'checkmark-done-circle';
      case 'Cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case 'Purchase':
        return 'cart';
      case 'Rental':
        return 'time';
      case 'Test Drive':
        return 'car-sport';
      default:
        return 'document';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const renderTabButton = (
    tab: 'all' | 'upcoming' | 'completed' | 'cancelled',
    label: string,
    count: number
  ) => {
    const isActive = selectedTab === tab;
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.tabButtonActive]}
        onPress={() => setSelectedTab(tab)}
      >
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
        {count > 0 && (
          <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
            <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderBookingCard = ({ item }: { item: Booking }) => {
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);
    const typeIcon = getBookingTypeIcon(item.bookingType);

    return (
      <TouchableOpacity style={styles.bookingCard} activeOpacity={0.9}>
        <View style={styles.bookingHeader}>
          <View style={styles.bookingImageContainer}>
            <Image source={{ uri: item.vehicleImage }} style={styles.bookingImage} />
            <View style={[styles.typeIconBadge, { backgroundColor: statusColor + '20' }]}>
              <Ionicons name={typeIcon as any} size={16} color={statusColor} />
            </View>
          </View>

          <View style={styles.bookingInfo}>
            <Text style={styles.vehicleName} numberOfLines={1}>
              {item.vehicleName}
            </Text>
            <View style={styles.bookingMeta}>
              <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.bookingDate}>{formatDate(item.startDate)}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
              <Ionicons name={statusIcon as any} size={14} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Booking Type</Text>
              <View style={styles.detailValueRow}>
                <Ionicons name={typeIcon as any} size={16} color={colors.primary} />
                <Text style={styles.detailValue}>{item.bookingType}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Booking ID</Text>
              <Text style={styles.detailValue}>{item.id}</Text>
            </View>
          </View>

          {item.endDate && (
            <View style={styles.dateRange}>
              <View style={styles.dateRangeItem}>
                <Text style={styles.dateRangeLabel}>Start</Text>
                <Text style={styles.dateRangeValue}>{formatDate(item.startDate)}</Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color={colors.systemGray} />
              <View style={styles.dateRangeItem}>
                <Text style={styles.dateRangeLabel}>End</Text>
                <Text style={styles.dateRangeValue}>{formatDate(item.endDate)}</Text>
              </View>
            </View>
          )}

          <View style={styles.bookingFooter}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Total Amount</Text>
              <Text style={styles.amountValue}>
                ${item.totalAmount.toLocaleString()}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              {item.status === 'Pending' && (
                <>
                  <TouchableOpacity style={styles.actionButtonSecondary}>
                    <Text style={styles.actionButtonSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButtonPrimary}>
                    <Text style={styles.actionButtonPrimaryText}>Confirm</Text>
                  </TouchableOpacity>
                </>
              )}
              {item.status === 'Confirmed' && (
                <TouchableOpacity style={styles.actionButtonSecondary}>
                  <Ionicons name="document-text-outline" size={16} color={colors.primary} />
                  <Text style={styles.actionButtonSecondaryText}>View Details</Text>
                </TouchableOpacity>
              )}
              {item.status === 'Completed' && (
                <TouchableOpacity style={styles.actionButtonSecondary}>
                  <Ionicons name="star-outline" size={16} color={colors.primary} />
                  <Text style={styles.actionButtonSecondaryText}>Rate</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={80} color={colors.systemGray3} />
      <Text style={styles.emptyTitle}>No Bookings Found</Text>
      <Text style={styles.emptySubtitle}>
        {selectedTab === 'all'
          ? "You haven't made any bookings yet"
          : `No ${selectedTab} bookings`}
      </Text>
    </View>
  );

  const allCount = mockBookings.length;
  const upcomingCount = mockBookings.filter(
    (b) =>
      (b.status === 'Confirmed' || b.status === 'Pending') &&
      new Date(b.startDate) >= new Date()
  ).length;
  const completedCount = mockBookings.filter((b) => b.status === 'Completed').length;
  const cancelledCount = mockBookings.filter((b) => b.status === 'Cancelled').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {renderTabButton('all', 'All', allCount)}
          {renderTabButton('upcoming', 'Upcoming', upcomingCount)}
          {renderTabButton('completed', 'Completed', completedCount)}
          {renderTabButton('cancelled', 'Cancelled', cancelledCount)}
        </ScrollView>
      </View>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  tabsContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabsScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.white,
  },
  tabBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tabBadgeText: {
    ...textPresets.caption1,
    color: colors.text,
    fontWeight: '700',
  },
  tabBadgeTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bookingImageContainer: {
    position: 'relative',
  },
  bookingImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.systemGray6,
  },
  typeIconBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  vehicleName: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 6,
  },
  bookingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  bookingDate: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  statusText: {
    ...textPresets.caption1,
    fontWeight: '700',
  },
  bookingDetails: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  detailValue: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: '600',
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.systemGray6,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  dateRangeItem: {
    flex: 1,
  },
  dateRangeLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateRangeValue: {
    ...textPresets.subheadline,
    color: colors.text,
    fontWeight: '600',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amountContainer: {},
  amountLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  amountValue: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionButtonPrimaryText: {
    ...textPresets.subheadline,
    color: colors.white,
    fontWeight: '600',
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  actionButtonSecondaryText: {
    ...textPresets.subheadline,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    ...textPresets.title3,
    color: colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    ...textPresets.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default BookingHistoryScreen;
