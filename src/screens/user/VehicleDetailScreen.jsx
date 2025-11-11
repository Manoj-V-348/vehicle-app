import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockVehicles } from '../../data/mockVehicles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.45;

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetail'>;

const VehicleDetailScreen: React.FC = ({ route, navigation }) => {
  const { vehicleId } = route.params;
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  if (!vehicle) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color={colors.systemGray} />
        <Text style={styles.errorText}>Vehicle not found</Text>
      </View>
    );
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleBooking = (type: 'Purchase' | 'Rental' | 'Test Drive') => {
    if (type === 'Rental') {
      navigation.navigate('Rental', { vehicleId: vehicle.id });
    } else {
      navigation.navigate('Booking', { vehicleId: vehicle.id, bookingType: type });
    }
  };

  const renderFeatureItem = (feature: string, index: number) => (
    <View key={index} style={styles.featureItem}>
      <Ionicons name="checkmark-circle" size={20} color={colors.success} />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  const renderSpecItem = (icon: string, label: string, value: string) => (
    <View style={styles.specCard}>
      <View style={styles.specIcon}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={[colors.card, colors.card]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle} numberOfLines={1}>
            {vehicle.name}
          </Text>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        {/* Image Carousel */}
        <View style={styles.imageCarouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(contentOffsetX / width);
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {vehicle.images.map((image, index) => (
              <Animated.View key={index} style={[styles.imageWrapper, { transform: [{ scale: imageScale }] }]}>
                <Image source={{ uri: image }} style={styles.carouselImage} resizeMode="cover" />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.imageGradient}
                />
              </Animated.View>
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View style={styles.indicatorContainer}>
            {vehicle.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{vehicle.condition}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.mainHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{vehicle.name}</Text>
              <View style={styles.subtitleRow}>
                <Ionicons name="location" size={14} color={colors.textSecondary} />
                <Text style={styles.location}>{vehicle.location}</Text>
              </View>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={18} color={colors.warning} />
              <Text style={styles.ratingText}>{vehicle.rating.toFixed(1)}</Text>
              <Text style={styles.reviewsText}>({vehicle.reviews})</Text>
            </View>
          </View>

          {/* Price Cards */}
          <View style={styles.priceSection}>
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Purchase Price</Text>
              <Text style={styles.priceAmount}>${vehicle.price.toLocaleString()}</Text>
            </View>
            <View style={[styles.priceCard, styles.rentalCard]}>
              <Text style={styles.priceLabel}>Rental Rate</Text>
              <Text style={styles.rentalAmount}>${vehicle.rentalPricePerDay}/day</Text>
            </View>
          </View>

          {/* Quick Specs Grid */}
          <View style={styles.specsGrid}>
            {renderSpecItem('calendar-outline', 'Year', String(vehicle.year))}
            {renderSpecItem('speedometer-outline', 'Mileage', `${vehicle.mileage.toLocaleString()} mi`)}
            {renderSpecItem('flash-outline', 'Fuel Type', vehicle.fuelType)}
            {renderSpecItem('settings-outline', 'Transmission', vehicle.transmission)}
            {renderSpecItem('people-outline', 'Seats', String(vehicle.seatingCapacity))}
            {renderSpecItem('color-palette-outline', 'Color', vehicle.color)}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{vehicle.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features & Amenities</Text>
            <View style={styles.featuresGrid}>
              {vehicle.features.map(renderFeatureItem)}
            </View>
          </View>

          {/* Availability Status */}
          <View style={styles.section}>
            <View style={styles.availabilityCard}>
              <View style={styles.availabilityHeader}>
                <Ionicons
                  name={vehicle.available ? 'checkmark-circle' : 'close-circle'}
                  size={28}
                  color={vehicle.available ? colors.success : colors.danger}
                />
                <Text style={styles.availabilityTitle}>
                  {vehicle.available ? 'Available Now' : 'Currently Unavailable'}
                </Text>
              </View>
              <Text style={styles.availabilityText}>
                {vehicle.available
                  ? 'This vehicle is ready for immediate purchase, rental, or test drive.'
                  : 'This vehicle is currently not available. Please check back later or contact us for more information.'}
              </Text>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      {vehicle.available && (
        <View style={styles.bottomBar}>
          <LinearGradient
            colors={['transparent', colors.white]}
            style={styles.bottomGradient}
          />
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleBooking('Test Drive')}
            >
              <Ionicons name="car-sport-outline" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Test Drive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleBooking('Rental')}
            >
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Rent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={() => handleBooking('Purchase')}
            >
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButtonGradient}
              >
                <Ionicons name="cart-outline" size={20} color={colors.white} />
                <Text style={styles.primaryButtonText}>Buy Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  errorText: {
    ...textPresets.headline,
    color: colors.textSecondary,
    marginTop: 16,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 100,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingHorizontal: 60,
    paddingTop: 44,
  },
  headerTitle: {
    ...textPresets.headline,
    color: colors.text,
    textAlign: 'center',
  },
  imageCarouselContainer: {
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  imageWrapper: {
    width,
    height: IMAGE_HEIGHT,
  },
  carouselImage: {
    width,
    height: IMAGE_HEIGHT,
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: colors.white,
    width: 24,
  },
  statusBadge: {
    position: 'absolute',
    top: 54,
    right: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statusText: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: '600',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingTop: 28,
    paddingHorizontal: 20,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleSection: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    ...textPresets.title2,
    color: colors.text,
    marginBottom: 8,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  ratingText: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewsText: {
    ...textPresets.footnote,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priceSection: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  priceCard: {
    flex: 1,
    backgroundColor: colors.systemGray6,
    padding: 16,
    borderRadius: 16,
  },
  rentalCard: {
    backgroundColor: colors.backgroundSecondary,
  },
  priceLabel: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceAmount: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: '700',
  },
  rentalAmount: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 12,
  },
  specCard: {
    width: (width - 64) / 3,
    backgroundColor: colors.systemGray6,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  specIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  specLabel: {
    ...textPresets.caption2,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  specValue: {
    ...textPresets.footnote,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    ...textPresets.title3,
    color: colors.text,
    marginBottom: 16,
  },
  description: {
    ...textPresets.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    ...textPresets.body,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  availabilityCard: {
    backgroundColor: colors.systemGray6,
    padding: 20,
    borderRadius: 16,
  },
  availabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  availabilityTitle: {
    ...textPresets.headline,
    color: colors.text,
    marginLeft: 12,
    fontWeight: '600',
  },
  availabilityText: {
    ...textPresets.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingBottom: 20,
    paddingTop: 12,
  },
  bottomGradient: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  secondaryButton: {
    backgroundColor: colors.systemGray6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryButtonText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1.2,
  },
  primaryButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: '700',
  },
});

export default VehicleDetailScreen;
