import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockVehicles } from '../../data/mockVehicles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Rental'>;

interface DateOption {
  date: Date;
  label: string;
  shortLabel: string;
}

const RentalScreen: React.FC<Props> = ({ route, navigation }) => {
  const { vehicleId } = route.params;
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [selectedPickupTime, setSelectedPickupTime] = useState<string>('09:00');

  if (!vehicle) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color={colors.systemGray} />
        <Text style={styles.errorText}>Vehicle not found</Text>
      </View>
    );
  }

  // Generate date options for the next 14 days
  const generateDateOptions = (): DateOption[] => {
    const options: DateOption[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      options.push({
        date,
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `${monthNames[date.getMonth()]} ${date.getDate()}`,
        shortLabel: dayNames[date.getDay()],
      });
    }
    return options;
  };

  const dateOptions = generateDateOptions();

  const pickupTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const calculateRentalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    const days = calculateRentalDays();
    const basePrice = vehicle.rentalPricePerDay * days;
    const insuranceCost = includeInsurance ? days * 25 : 0;
    return basePrice + insuranceCost;
  };

  const handleConfirmRental = () => {
    if (!startDate || !endDate) {
      Alert.alert('Required', 'Please select both start and end dates');
      return;
    }

    const bookingId = `R${Date.now()}`;
    const amount = calculateTotal();

    navigation.navigate('Payment', {
      bookingId,
      amount,
      vehicleName: vehicle.name,
    });
  };

  const renderDatePicker = (
    label: string,
    selectedDate: Date | null,
    onSelect: (date: Date) => void
  ) => (
    <View style={styles.pickerSection}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateScroll}
      >
        {dateOptions.map((option, index) => {
          const isSelected = selectedDate?.toDateString() === option.date.toDateString();
          const isDisabled = label === 'End Date' && startDate && option.date <= startDate;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateOption,
                isSelected && styles.dateOptionSelected,
                isDisabled && styles.dateOptionDisabled,
              ]}
              onPress={() => !isDisabled && onSelect(option.date)}
              disabled={isDisabled || false}
            >
              <Text
                style={[
                  styles.dateDay,
                  isSelected && styles.dateDaySelected,
                  isDisabled && styles.dateTextDisabled,
                ]}
              >
                {option.shortLabel}
              </Text>
              <Text
                style={[
                  styles.dateLabel,
                  isSelected && styles.dateLabelSelected,
                  isDisabled && styles.dateTextDisabled,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderDurationOption = (
    duration: 'daily' | 'weekly' | 'monthly',
    title: string,
    description: string,
    icon: string
  ) => {
    const isSelected = selectedDuration === duration;
    return (
      <TouchableOpacity
        style={[styles.durationOption, isSelected && styles.durationOptionSelected]}
        onPress={() => setSelectedDuration(duration)}
      >
        <View style={[styles.durationIcon, isSelected && styles.durationIconSelected]}>
          <Ionicons name={icon as any} size={24} color={isSelected ? colors.white : colors.primary} />
        </View>
        <View style={styles.durationContent}>
          <Text style={[styles.durationTitle, isSelected && styles.durationTitleSelected]}>
            {title}
          </Text>
          <Text style={[styles.durationDescription, isSelected && styles.durationDescriptionSelected]}>
            {description}
          </Text>
        </View>
        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Vehicle Card */}
        <View style={styles.vehicleCard}>
          <Image source={{ uri: vehicle.images[0] }} style={styles.vehicleImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.vehicleGradient}
          >
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <View style={styles.vehicleSpecs}>
                <View style={styles.specBadge}>
                  <Ionicons name="speedometer" size={14} color={colors.white} />
                  <Text style={styles.specText}>{vehicle.fuelType}</Text>
                </View>
                <View style={styles.specBadge}>
                  <Ionicons name="settings" size={14} color={colors.white} />
                  <Text style={styles.specText}>{vehicle.transmission}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.priceTag}>
            <Text style={styles.priceAmount}>${vehicle.rentalPricePerDay}</Text>
            <Text style={styles.priceLabel}>per day</Text>
          </View>
        </View>

        {/* Duration Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rental Duration Type</Text>
          {renderDurationOption('daily', 'Daily Rental', 'Perfect for short trips', 'calendar')}
          {renderDurationOption('weekly', 'Weekly Rental', 'Get 10% discount', 'calendar-outline')}
          {renderDurationOption('monthly', 'Monthly Rental', 'Best value - 20% off', 'calendar-sharp')}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dates</Text>
          <View style={styles.datePickerCard}>
            {renderDatePicker('Start Date', startDate, setStartDate)}
            {renderDatePicker('End Date', endDate, setEndDate)}

            {startDate && endDate && (
              <View style={styles.durationSummary}>
                <Ionicons name="time-outline" size={20} color={colors.primary} />
                <Text style={styles.durationText}>
                  {calculateRentalDays()} {calculateRentalDays() === 1 ? 'day' : 'days'} rental
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Pickup Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Time</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeScroll}
          >
            {pickupTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  selectedPickupTime === time && styles.timeOptionSelected,
                ]}
                onPress={() => setSelectedPickupTime(time)}
              >
                <Ionicons
                  name="time"
                  size={18}
                  color={selectedPickupTime === time ? colors.white : colors.primary}
                />
                <Text
                  style={[
                    styles.timeText,
                    selectedPickupTime === time && styles.timeTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Add-ons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          <TouchableOpacity
            style={styles.addonCard}
            onPress={() => setIncludeInsurance(!includeInsurance)}
          >
            <View style={styles.addonIcon}>
              <Ionicons name="shield-checkmark" size={24} color={colors.success} />
            </View>
            <View style={styles.addonContent}>
              <Text style={styles.addonTitle}>Full Insurance Coverage</Text>
              <Text style={styles.addonDescription}>+$25 per day - Complete protection</Text>
            </View>
            <View style={[styles.checkbox, includeInsurance && styles.checkboxActive]}>
              {includeInsurance && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Rental Summary */}
        {startDate && endDate && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Rental Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Rental ({calculateRentalDays()} {calculateRentalDays() === 1 ? 'day' : 'days'})
              </Text>
              <Text style={styles.summaryValue}>
                ${(vehicle.rentalPricePerDay * calculateRentalDays()).toLocaleString()}
              </Text>
            </View>

            {includeInsurance && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Insurance Coverage</Text>
                <Text style={styles.summaryValue}>${(calculateRentalDays() * 25).toLocaleString()}</Text>
              </View>
            )}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxes & Fees</Text>
              <Text style={styles.summaryValue}>$0</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotal}>Total Amount</Text>
              <Text style={styles.summaryTotalAmount}>${calculateTotal().toLocaleString()}</Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomAmount}>${calculateTotal().toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmRental}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmGradient}
          >
            <Text style={styles.confirmButtonText}>Confirm Rental</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    paddingBottom: 20,
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
  vehicleCard: {
    height: 200,
    marginBottom: 20,
    position: 'relative',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  vehicleGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  vehicleInfo: {},
  vehicleName: {
    ...textPresets.title2,
    color: colors.white,
    marginBottom: 8,
  },
  vehicleSpecs: {
    flexDirection: 'row',
    gap: 8,
  },
  specBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  specText: {
    ...textPresets.caption1,
    color: colors.white,
  },
  priceTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  priceAmount: {
    ...textPresets.title3,
    color: colors.white,
    fontWeight: 700,
    textAlign: 'center',
  },
  priceLabel: {
    ...textPresets.caption2,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...textPresets.title3,
    color: colors.text,
    marginBottom: 16,
  },
  durationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  durationOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  durationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.systemGray6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  durationIconSelected: {
    backgroundColor: colors.primary,
  },
  durationContent: {
    flex: 1,
  },
  durationTitle: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
    marginBottom: 4,
  },
  durationTitleSelected: {
    color: colors.primary,
  },
  durationDescription: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  durationDescriptionSelected: {
    color: colors.primary,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.systemGray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  datePickerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
  },
  pickerSection: {
    marginBottom: 20,
  },
  pickerLabel: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
    marginBottom: 12,
  },
  dateScroll: {
    gap: 8,
  },
  dateOption: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.systemGray6,
    minWidth: 70,
  },
  dateOptionSelected: {
    backgroundColor: colors.primary,
  },
  dateOptionDisabled: {
    opacity: 0.4,
  },
  dateDay: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateDaySelected: {
    color: colors.white,
  },
  dateLabel: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
  },
  dateLabelSelected: {
    color: colors.white,
  },
  dateTextDisabled: {
    color: colors.systemGray3,
  },
  durationSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.systemGray6,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  durationText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: 600,
  },
  timeScroll: {
    gap: 8,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    gap: 6,
  },
  timeOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeText: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
  },
  timeTextSelected: {
    color: colors.white,
  },
  addonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  addonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.success + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addonContent: {
    flex: 1,
  },
  addonTitle: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
    marginBottom: 4,
  },
  addonDescription: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.systemGray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 4,
  },
  summaryTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: 600,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    ...textPresets.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  summaryTotal: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: 700,
  },
  summaryTotalAmount: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: 700,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
    gap: 16,
  },
  bottomInfo: {
    flex: 1,
  },
  bottomLabel: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  bottomAmount: {
    ...textPresets.title3,
    color: colors.text,
    fontWeight: 700,
  },
  confirmButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  confirmButtonText: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: 700,
  },
});

export default RentalScreen;
