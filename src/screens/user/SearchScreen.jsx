import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import VehicleCard from '../../components/VehicleCard';
import { mockVehicles } from '../../data/mockVehicles';
import type { VehicleType, FuelType, TransmissionType } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [priceRange, setPriceRange] = useState('all');

  const vehicleTypes: VehicleType[] = ['Car', 'SUV', 'Truck', 'Van', 'Bike', 'Motorcycle'];
  const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionTypes: TransmissionType[] = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];

  const toggleFilter = <T,>(value: T, selected: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedFuels([]);
    setSelectedTransmissions([]);
    setPriceRange('all');
  };

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter((vehicle) => {
      // Search query filter
      const matchesSearch =
        searchQuery === '' ||
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(vehicle.type);

      // Fuel filter
      const matchesFuel = selectedFuels.length === 0 || selectedFuels.includes(vehicle.fuelType);

      // Transmission filter
      const matchesTransmission =
        selectedTransmissions.length === 0 || selectedTransmissions.includes(vehicle.transmission);

      // Price range filter
      let matchesPrice = true;
      if (priceRange === 'under50k') {
        matchesPrice = vehicle.price < 50000;
      } else if (priceRange === '50k-100k') {
        matchesPrice = vehicle.price >= 50000 && vehicle.price <= 100000;
      } else if (priceRange === 'over100k') {
        matchesPrice = vehicle.price > 100000;
      }

      return matchesSearch && matchesType && matchesFuel && matchesTransmission && matchesPrice;
    });
  }, [searchQuery, selectedTypes, selectedFuels, selectedTransmissions, priceRange]);

  const activeFiltersCount =
    selectedTypes.length + selectedFuels.length + selectedTransmissions.length + (priceRange !== 'all' ? 1 : 0);

  const renderFilterChip = <T,>(
    label: string,
    value: T,
    selected: T[],
    onToggle: () => void
  ) => {
    const isSelected = selected.includes(value);
    return (
      <TouchableOpacity
        key={String(value)}
        style={[styles.filterChip, isSelected && styles.filterChipActive]}
        onPress={onToggle}
      >
        <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPriceRangeOption = (
    label: string,
    value: 'all' | 'under50k' | '50k-100k' | 'over100k'
  ) => {
    const isSelected = priceRange === value;
    return (
      <TouchableOpacity
        key={value}
        style={[styles.priceOption, isSelected && styles.priceOptionActive]}
        onPress={() => setPriceRange(value)}
      >
        <View
          style={[
            styles.radioButton,
            isSelected && styles.radioButtonActive,
          ]}
        >
          {isSelected && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={[styles.priceOptionText, isSelected && styles.priceOptionTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.systemGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicles, brands..."
            placeholderTextColor={colors.systemGray2}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.systemGray} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Toggle Button */}
        <TouchableOpacity
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name="options"
            size={22}
            color={showFilters ? colors.white : colors.primary}
          />
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <ScrollView
          style={styles.filtersPanel}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.filtersPanelContent}>
            {/* Vehicle Type Filter */}
            <View style={styles.filterGroup}>
              <View style={styles.filterHeader}>
                <Ionicons name="car-sport" size={20} color={colors.text} />
                <Text style={styles.filterTitle}>Vehicle Type</Text>
              </View>
              <View style={styles.filterChips}>
                {vehicleTypes.map((type) =>
                  renderFilterChip(
                    type,
                    type,
                    selectedTypes,
                    () => toggleFilter(type, selectedTypes, setSelectedTypes)
                  )
                )}
              </View>
            </View>

            {/* Fuel Type Filter */}
            <View style={styles.filterGroup}>
              <View style={styles.filterHeader}>
                <Ionicons name="flash" size={20} color={colors.text} />
                <Text style={styles.filterTitle}>Fuel Type</Text>
              </View>
              <View style={styles.filterChips}>
                {fuelTypes.map((fuel) =>
                  renderFilterChip(
                    fuel,
                    fuel,
                    selectedFuels,
                    () => toggleFilter(fuel, selectedFuels, setSelectedFuels)
                  )
                )}
              </View>
            </View>

            {/* Transmission Filter */}
            <View style={styles.filterGroup}>
              <View style={styles.filterHeader}>
                <Ionicons name="settings" size={20} color={colors.text} />
                <Text style={styles.filterTitle}>Transmission</Text>
              </View>
              <View style={styles.filterChips}>
                {transmissionTypes.map((trans) =>
                  renderFilterChip(
                    trans,
                    trans,
                    selectedTransmissions,
                    () => toggleFilter(trans, selectedTransmissions, setSelectedTransmissions)
                  )
                )}
              </View>
            </View>

            {/* Price Range Filter */}
            <View style={styles.filterGroup}>
              <View style={styles.filterHeader}>
                <Ionicons name="pricetag" size={20} color={colors.text} />
                <Text style={styles.filterTitle}>Price Range</Text>
              </View>
              <View style={styles.priceOptions}>
                {renderPriceRangeOption('All Prices', 'all')}
                {renderPriceRangeOption('Under $50,000', 'under50k')}
                {renderPriceRangeOption('$50,000 - $100,000', '50k-100k')}
                {renderPriceRangeOption('Over $100,000', 'over100k')}
              </View>
            </View>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={clearAllFilters}
              >
                <Ionicons name="refresh" size={18} color={colors.primary} />
                <Text style={styles.clearFiltersText}>Clear All Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}

      {/* Results Section */}
      <View style={styles.resultsSection}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'Vehicle' : 'Vehicles'} Found
          </Text>
          {activeFiltersCount > 0 && (
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredVehicles.length > 0 ? (
          <FlatList
            data={filteredVehicles}
            renderItem={({ item }) => (
              <VehicleCard
                vehicle={item}
                onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item.id })}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color={colors.systemGray3} />
            <Text style={styles.emptyTitle}>No Vehicles Found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your filters or search terms
            </Text>
            {activeFiltersCount > 0 && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={clearAllFilters}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...textPresets.body,
    color: colors.text,
    padding: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.systemGray6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.danger,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    ...textPresets.caption2,
    color: colors.white,
    fontWeight: '700',
  },
  filtersPanel: {
    maxHeight: 400,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersPanelContent: {
    padding: 16,
  },
  filterGroup: {
    marginBottom: 24,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  filterTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...textPresets.subheadline,
    color: colors.text,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  priceOptions: {
    gap: 12,
  },
  priceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    gap: 12,
  },
  priceOptionActive: {
    backgroundColor: colors.primary + '15',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.systemGray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  priceOptionText: {
    ...textPresets.body,
    color: colors.text,
  },
  priceOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  clearFiltersText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: '600',
  },
  resultsSection: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  resultsCount: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
  },
  clearText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    ...textPresets.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  resetButtonText: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: '600',
  },
});

export default SearchScreen;
