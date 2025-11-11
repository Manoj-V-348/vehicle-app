import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import VehicleCard from '../../components/VehicleCard';
import { mockVehicles } from '../../data/mockVehicles';

const BrowseScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('All');

  const types: (VehicleType | 'All')[] = ['All', 'Car', 'SUV', 'Bike', 'Truck', 'Van'];

  const filteredVehicles =
    selectedType === 'All'
      ? mockVehicles
      : mockVehicles.filter((v) => v.type === selectedType);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Vehicles</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={types}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedType === item && styles.filterChipActive,
              ]}
              onPress={() => setSelectedType(item)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedType === item && styles.filterChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filterList}
        />
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredVehicles.length} vehicles found
        </Text>
      </View>

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
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  title: {
    ...textPresets.title2,
    color: colors.text,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    backgroundColor: colors.white,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsText: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default BrowseScreen;
