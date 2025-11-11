import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockVehicles } from '../../data/mockVehicles';
import { mockBookings } from '../../data/mockUsers';

const { width } = Dimensions.get('window');



const StatCard= ({ title, value, icon, color, trend, trendUp }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {trend && (
        <View style={styles.trendContainer}>
          <Ionicons
            name={trendUp ? 'trending-up' : 'trending-down'}
            size={14}
            color={trendUp ? colors.success : colors.danger}
          />
          <Text style={[styles.trendText, { color: trendUp ? colors.success : colors.danger }]}>
            {trend}
          </Text>
        </View>
      )}
    </View>
  </View>
);

const ActivityCard = ({ item }) => (
  <View style={styles.activityCard}>
    <View style={styles.activityIcon}>
      <Ionicons name={item.icon} size={20} color={colors.primary} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityDescription}>{item.description}</Text>
    </View>
    <Text style={styles.activityTime}>{item.time}</Text>
  </View>
);

const AdminDashboardScreen = ({ navigation }: any) => {
  const totalVehicles = mockVehicles.length;
  const availableVehicles = mockVehicles.filter((v) => v.available).length;
  const totalBookings = mockBookings.length;
  const activeBookings = mockBookings.filter((b) => b.status === 'Confirmed').length;
  const pendingBookings = mockBookings.filter((b) => b.status === 'Pending').length;
  const totalRevenue = mockBookings
    .filter((b) => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking',
      description: 'Range Rover Sport - Rental',
      time: '5m ago',
      icon: 'calendar',
    },
    {
      id: '2',
      type: 'vehicle',
      title: 'Vehicle Updated',
      description: 'Tesla Model 3 availability changed',
      time: '15m ago',
      icon: 'car-sport',
    },
    {
      id: '3',
      type: 'booking',
      title: 'Booking Confirmed',
      description: 'BMW X5 - Test Drive',
      time: '1h ago',
      icon: 'checkmark-circle',
    },
    {
      id: '4',
      type: 'user',
      title: 'New User Registration',
      description: 'Sarah Johnson joined',
      time: '2h ago',
      icon: 'person-add',
    },
    {
      id: '5',
      type: 'booking',
      title: 'Payment Received',
      description: 'Harley-Davidson - Purchase $18,500',
      time: '3h ago',
      icon: 'card',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Admin Dashboard</Text>
            <Text style={styles.headerTitle}>Overview & Analytics</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={colors.primary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{pendingBookings}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('AdminAddVehicle')}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.quickActionGradient}
            >
              <Ionicons name="add-circle" size={24} color={colors.white} />
              <Text style={styles.quickActionText}>Add Vehicle</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('AdminVehicles')}
          >
            <View style={[styles.quickActionGradient, styles.quickActionSolid]}>
              <Ionicons name="car" size={24} color={colors.primary} />
              <Text style={[styles.quickActionText, { color: colors.primary }]}>
                Manage Vehicles
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('AdminBookings')}
          >
            <View style={[styles.quickActionGradient, styles.quickActionSolid]}>
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <Text style={[styles.quickActionText, { color: colors.primary }]}>
                View Bookings
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(1)}k`}
              icon="cash"
              color={colors.success}
              trend="+12.5%"
              trendUp={true}
            />
            <StatCard
              title="Active Bookings"
              value={activeBookings}
              icon="calendar"
              color={colors.primary}
              trend="+8.3%"
              trendUp={true}
            />
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Vehicles"
              value={totalVehicles}
              icon="car-sport"
              color={colors.secondary}
              trend="+3"
              trendUp={true}
            />
            <StatCard
              title="Available Now"
              value={availableVehicles}
              icon="checkmark-circle"
              color={colors.warning}
            />
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Booking Overview</Text>
            
              <Text style={styles.seeAllText}>This Month</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartCard}>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                <Text style={styles.legendText}>Completed</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={styles.legendText}>Active</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
                <Text style={styles.legendText}>Pending</Text>
              </View>
            </View>

            {/* Simple Bar Chart Visualization */}
            <View style={styles.chartBars}>
              <View style={styles.barGroup}>
                <View style={styles.barStack}>
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.success, height: 60 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.primary, height: 40 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.warning, height: 20 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>Week 1</Text>
              </View>
              <View style={styles.barGroup}>
                <View style={styles.barStack}>
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.success, height: 70 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.primary, height: 50 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.warning, height: 30 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>Week 2</Text>
              </View>
              <View style={styles.barGroup}>
                <View style={styles.barStack}>
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.success, height: 55 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.primary, height: 60 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.warning, height: 25 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>Week 3</Text>
              </View>
              <View style={styles.barGroup}>
                <View style={styles.barStack}>
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.success, height: 80 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.primary, height: 45 },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      { backgroundColor: colors.warning, height: 35 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>Week 4</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityContainer}>
            {recentActivity.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingBottom: 24,
    backgroundColor: colors.white,
  },
  greeting: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  headerTitle: {
    ...textPresets.title2,
    color: colors.text,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.systemGray6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.danger,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    ...textPresets.caption2,
    color: colors.white,
    fontWeight: '700',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionGradient: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionSolid: {
    backgroundColor: colors.white,
  },
  quickActionText: {
    ...textPresets.caption1,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...textPresets.title3,
    color: colors.text,
  },
  seeAllText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
    justifyContent: 'center',
  },
  statTitle: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    ...textPresets.title3,
    color: colors.text,
    fontWeight: '700',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendText: {
    ...textPresets.caption2,
    marginLeft: 4,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    ...textPresets.caption1,
    color: colors.textSecondary,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barStack: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barSegment: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 2,
  },
  barLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginTop: 8,
  },
  activityContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...textPresets.callout,
    color: colors.text,
    marginBottom: 2,
  },
  activityDescription: {
    ...textPresets.footnote,
    color: colors.textSecondary,
  },
  activityTime: {
    ...textPresets.caption2,
    color: colors.textSecondary,
  },
});

export default AdminDashboardScreen;
