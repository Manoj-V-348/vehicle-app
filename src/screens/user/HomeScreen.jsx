import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import VehicleCard from '../../components/VehicleCard';
import { mockVehicles } from '../../data/mockVehicles';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const featuredVehicles = mockVehicles.slice(0, 5);
  const popularTypes = [
    { type: 'Car', icon: 'car-sport', color: colors.primary },
    { type: 'SUV', icon: 'car', color: colors.secondary },
    { type: 'Bike', icon: 'bicycle', color: colors.success },
    { type: 'Truck', icon: 'cube', color: colors.warning },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.headerTitle}>Find Your Dream Vehicle</Text>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Ionicons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statsCard}
          >
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mockVehicles.length}</Text>
              <Text style={styles.statLabel}>Total Vehicles</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {mockVehicles.filter((v) => v.available).length}
              </Text>
              <Text style={styles.statLabel}>Available Now</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {popularTypes.map((item) => (
              <TouchableOpacity
                key={item.type}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Browse', { filter: item.type })}
              >
                <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={28} color={colors.white} />
                </View>
                <Text style={styles.categoryText}>{item.type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Vehicles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Vehicles</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredVehicles}
            renderItem={({ item }) => (
              <VehicleCard
                vehicle={item}
                onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item.id })}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Browse', { filter: 'Rental' })}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="time" size={32} color={colors.white} />
                <Text style={styles.quickActionTitle}>Rent a Vehicle</Text>
                <Text style={styles.quickActionSubtitle}>From $50/day</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Browse', { filter: 'Purchase' })}
            >
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="cart" size={32} color={colors.white} />
                <Text style={styles.quickActionTitle}>Buy a Vehicle</Text>
                <Text style={styles.quickActionSubtitle}>Great deals</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.systemGray6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...textPresets.title2,
    color: colors.white,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    ...textPresets.caption1,
    color: colors.white,
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    ...textPresets.title3,
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  categoryIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryText: {
    ...textPresets.subheadline,
    color: colors.text,
    fontWeight: '600',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  quickActionTitle: {
    ...textPresets.headline,
    color: colors.white,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    ...textPresets.subheadline,
    color: colors.white,
    opacity: 0.9,
  },
});

export default HomeScreen;
