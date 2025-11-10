import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Vehicle } from '../types';
import { colors } from '../theme/colors';
import { textPresets } from '../theme/typography';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: vehicle.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{vehicle.condition}</Text>
        </View>
        {!vehicle.available && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Not Available</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {vehicle.name}
            </Text>
            <Text style={styles.subtitle}>
              {vehicle.year} • {vehicle.type}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.rating}>{vehicle.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.specs}>
          <View style={styles.specItem}>
            <Ionicons name="speedometer-outline" size={16} color={colors.systemGray} />
            <Text style={styles.specText}>{vehicle.mileage.toLocaleString()} mi</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="flash-outline" size={16} color={colors.systemGray} />
            <Text style={styles.specText}>{vehicle.fuelType}</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="settings-outline" size={16} color={colors.systemGray} />
            <Text style={styles.specText}>{vehicle.transmission}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Purchase</Text>
            <Text style={styles.price}>${vehicle.price.toLocaleString()}</Text>
          </View>
          <View style={styles.rentalPrice}>
            <Text style={styles.rentalLabel}>Rent</Text>
            <Text style={styles.rentalAmount}>${vehicle.rentalPricePerDay}/day</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 600,
  },
  unavailableBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  unavailableText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 600,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    ...textPresets.headline,
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    ...textPresets.caption1,
    color: colors.text,
    marginLeft: 4,
  },
  specs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  specText: {
    ...textPresets.footnote,
    color: colors.systemGray,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: 700,
  },
  rentalPrice: {
    alignItems: 'flex-end',
  },
  rentalLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rentalAmount: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
  },
});

export default VehicleCard;
