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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockVehicles } from '../../data/mockVehicles';
import { Vehicle, VehicleType } from '../../types';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

interface FilterState {
  type: VehicleType | 'All';
  availability: 'All' | 'Available' | 'Unavailable';
  sortBy: 'name' | 'price' | 'year' | 'rating';
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const vehicleTypes: (VehicleType | 'All')[] = ['All', 'Car', 'SUV', 'Bike', 'Motorcycle', 'Truck', 'Van'];
  const availabilityOptions = ['All', 'Available', 'Unavailable'];
  const sortOptions: { label: string; value: FilterState['sortBy'] }[] = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Year', value: 'year' },
    { label: 'Rating', value: 'rating' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Vehicle Type</Text>
            <View style={styles.filterOptions}>
              {vehicleTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterChip,
                    filters.type === type && styles.filterChipActive,
                  ]}
                  onPress={() => setFilters({ ...filters, type })}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filters.type === type && styles.filterChipTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Availability</Text>
            <View style={styles.filterOptions}>
              {availabilityOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterChip,
                    filters.availability === option && styles.filterChipActive,
                  ]}
                  onPress={() => setFilters({ ...filters, availability: option as any })}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filters.availability === option && styles.filterChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.filterOptions}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterChip,
                    filters.sortBy === option.value && styles.filterChipActive,
                  ]}
                  onPress={() => setFilters({ ...filters, sortBy: option.value })}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filters.sortBy === option.value && styles.filterChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              onApply(filters);
              onClose();
            }}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AdminVehiclesScreen = ({ navigation }: any) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: 'All',
    availability: 'All',
    sortBy: 'name',
  });

  const handleDelete = (vehicleId: string, vehicleName: string) => {
    Alert.alert(
      'Delete Vehicle',
      `Are you sure you want to delete ${vehicleName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setVehicles(vehicles.filter((v) => v.id !== vehicleId));
            Alert.alert('Success', 'Vehicle deleted successfully');
          },
        },
      ]
    );
  };

  const handleToggleAvailability = (vehicleId: string) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === vehicleId ? { ...v, available: !v.available } : v
      )
    );
  };

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const getFilteredVehicles = () => {
    let filtered = [...vehicles];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'All') {
      filtered = filtered.filter((v) => v.type === filters.type);
    }

    // Availability filter
    if (filters.availability === 'Available') {
      filtered = filtered.filter((v) => v.available);
    } else if (filters.availability === 'Unavailable') {
      filtered = filtered.filter((v) => !v.available);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'year':
          return b.year - a.year;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredVehicles = getFilteredVehicles();

  const renderVehicleCard = ({ item }: { item: Vehicle }) => (
    <View style={styles.vehicleCard}>
      <Image source={{ uri: item.images[0] }} style={styles.vehicleImage} />

      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.vehicleName}>{item.name}</Text>
            <Text style={styles.vehicleDetails}>
              {item.year} • {item.type} • {item.transmission}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.availabilityBadge,
              { backgroundColor: item.available ? colors.success + '15' : colors.danger + '15' },
            ]}
            onPress={() => handleToggleAvailability(item.id)}
          >
            <Text
              style={[
                styles.availabilityText,
                { color: item.available ? colors.success : colors.danger },
              ]}
            >
              {item.available ? 'Available' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vehicleStats}>
          <View style={styles.statItem}>
            <Ionicons name="speedometer" size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>{item.mileage.toLocaleString()} mi</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>{item.seatingCapacity} seats</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.statText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.vehiclePricing}>
          <View>
            <Text style={styles.priceLabel}>Purchase</Text>
            <Text style={styles.priceValue}>${item.price.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.priceLabel}>Rental/Day</Text>
            <Text style={styles.priceValue}>${item.rentalPricePerDay}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => navigation.navigate('AdminEditVehicle', { vehicleId: item.id })}
          >
            <Ionicons name="create" size={18} color={colors.white} />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item.id })}
          >
            <Ionicons name="eye" size={18} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id, item.name)}
          >
            <Ionicons name="trash" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Manage Vehicles</Text>
          <Text style={styles.headerSubtitle}>
            {filteredVehicles.length} of {vehicles.length} vehicles
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AdminAddVehicle')}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicles..."
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="options" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {(filters.type !== 'All' || filters.availability !== 'All') && (
        <View style={styles.activeFiltersContainer}>
          {filters.type !== 'All' && (
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{filters.type}</Text>
              <TouchableOpacity onPress={() => setFilters({ ...filters, type: 'All' })}>
                <Ionicons name="close" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
          {filters.availability !== 'All' && (
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{filters.availability}</Text>
              <TouchableOpacity
                onPress={() => setFilters({ ...filters, availability: 'All' })}
              >
                <Ionicons name="close" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Vehicle List */}
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-sport" size={64} color={colors.systemGray3} />
            <Text style={styles.emptyText}>No vehicles found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        currentFilters={filters}
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: colors.white,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  activeFilterText: {
    ...textPresets.caption1,
    color: colors.text,
  },
  listContainer: {
    padding: 16,
  },
  vehicleCard: {
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
  vehicleImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.systemGray6,
  },
  vehicleInfo: {
    padding: 16,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleName: {
    ...textPresets.headline,
    color: colors.text,
    marginBottom: 4,
  },
  vehicleDetails: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availabilityText: {
    ...textPresets.caption1,
    fontWeight: '600',
  },
  vehicleStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...textPresets.caption1,
    color: colors.textSecondary,
  },
  vehiclePricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  priceLabel: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceValue: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  viewButton: {
    backgroundColor: colors.systemGray6,
  },
  deleteButton: {
    backgroundColor: colors.danger + '15',
    flex: 0,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: '600',
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
    paddingHorizontal: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    ...textPresets.title2,
    color: colors.text,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    ...textPresets.headline,
    color: colors.text,
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    borderWidth: 1,
    borderColor: colors.systemGray6,
  },
  filterChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  filterChipText: {
    ...textPresets.callout,
    color: colors.text,
  },
  filterChipTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    ...textPresets.headline,
    color: colors.white,
    fontWeight: '600',
  },
});

export default AdminVehiclesScreen;
