import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { VehicleType, VehicleCondition, FuelType, TransmissionType } from '../../types';
import { mockVehicles } from '../../data/mockVehicles';



const AdminEditVehicleScreen = ({ route, navigation }: any) => {
  const { vehicleId } = route.params;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: '',
    type: '',
    condition: '',
    price: '',
    rentalPricePerDay: '',
    fuelType: '',
    transmission: '',
    mileage: '',
    seatingCapacity: '',
    color: '',
    description: '',
    features: '',
    location: '',
    available: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vehicleTypes: VehicleType[] = ['Car', 'Bike', 'Truck', 'SUV', 'Van', 'Motorcycle'];
  const conditions: VehicleCondition[] = ['New', 'Used', 'Certified Pre-Owned'];
  const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionTypes: TransmissionType[] = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];

  useEffect(() => {
    // Load vehicle data
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      setFormData({
        name: vehicle.name,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year.toString(),
        type: vehicle.type,
        condition: vehicle.condition,
        price: vehicle.price.toString(),
        rentalPricePerDay: vehicle.rentalPricePerDay.toString(),
        fuelType: vehicle.fuelType,
        transmission: vehicle.transmission,
        mileage: vehicle.mileage.toString(),
        seatingCapacity: vehicle.seatingCapacity.toString(),
        color: vehicle.color,
        description: vehicle.description,
        features: vehicle.features.join(', '),
        location: vehicle.location,
        available: vehicle.available,
      });
      setLoading(false);
    } else {
      Alert.alert('Error', 'Vehicle not found', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [vehicleId]);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Vehicle name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    } else {
      const yearNum = parseInt(formData.year);
      const currentYear = new Date().getFullYear();
      if (yearNum < 1900 || yearNum > currentYear + 1) {
        newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }
    if (!formData.type) newErrors.type = 'Vehicle type is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }
    if (!formData.rentalPricePerDay.trim()) {
      newErrors.rentalPricePerDay = 'Rental price is required';
    } else if (isNaN(Number(formData.rentalPricePerDay)) || Number(formData.rentalPricePerDay) <= 0) {
      newErrors.rentalPricePerDay = 'Rental price must be a valid positive number';
    }
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    if (!formData.mileage.trim()) {
      newErrors.mileage = 'Mileage is required';
    } else if (isNaN(Number(formData.mileage)) || Number(formData.mileage) < 0) {
      newErrors.mileage = 'Mileage must be a valid non-negative number';
    }
    if (!formData.seatingCapacity.trim()) {
      newErrors.seatingCapacity = 'Seating capacity is required';
    } else if (isNaN(Number(formData.seatingCapacity)) || Number(formData.seatingCapacity) < 1) {
      newErrors.seatingCapacity = 'Seating capacity must be at least 1';
    }
    if (!formData.color.trim()) newErrors.color = 'Color is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Vehicle updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      setIsSubmitting(false);
    }, 1000);
  };

  const renderInput = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    keyboardType: 'default' | 'numeric' | 'number-pad' = 'default',
    multiline: boolean = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          errors[field] && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={formData[field]}
        onChangeText={(value) => updateField(field, value)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderSelector = <T extends string>(
    label: string,
    field: keyof FormData,
    options: T[],
    value: T | ''
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.selectorContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.selectorOption,
              value === option && styles.selectorOptionActive,
              errors[field] && styles.inputError,
            ]}
            onPress={() => updateField(field, option)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                value === option && styles.selectorOptionTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading vehicle data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Vehicle</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Availability Toggle */}
          <View style={styles.availabilityCard}>
            <View style={styles.availabilityInfo}>
              <Ionicons
                name={formData.available ? 'checkmark-circle' : 'close-circle'}
                size={28}
                color={formData.available ? colors.success : colors.danger}
              />
              <View style={styles.availabilityText}>
                <Text style={styles.availabilityTitle}>
                  {formData.available ? 'Available' : 'Unavailable'}
                </Text>
                <Text style={styles.availabilitySubtitle}>
                  {formData.available
                    ? 'This vehicle is available for booking'
                    : 'This vehicle is not available for booking'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.availabilityToggle,
                formData.available && styles.availabilityToggleActive,
              ]}
              onPress={() => updateField('available', !formData.available)}
            >
              <View
                style={[
                  styles.availabilityToggleKnob,
                  formData.available && styles.availabilityToggleKnobActive,
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            {renderInput('Vehicle Name', 'name', 'e.g., Tesla Model 3')}
            {renderInput('Brand', 'brand', 'e.g., Tesla')}
            {renderInput('Model', 'model', 'e.g., Model 3')}
            {renderInput('Year', 'year', 'e.g., 2024', 'number-pad')}
            {renderSelector('Type', 'type', vehicleTypes, formData.type)}
            {renderSelector('Condition', 'condition', conditions, formData.condition)}
          </View>

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                {renderInput('Purchase Price ($)', 'price', '50000', 'number-pad')}
              </View>
              <View style={{ width: 12 }} />
              <View style={{ flex: 1 }}>
                {renderInput('Rental/Day ($)', 'rentalPricePerDay', '200', 'number-pad')}
              </View>
            </View>
          </View>

          {/* Technical Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Specifications</Text>
            {renderSelector('Fuel Type', 'fuelType', fuelTypes, formData.fuelType)}
            {renderSelector('Transmission', 'transmission', transmissionTypes, formData.transmission)}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                {renderInput('Mileage (miles)', 'mileage', '12000', 'number-pad')}
              </View>
              <View style={{ width: 12 }} />
              <View style={{ flex: 1 }}>
                {renderInput('Seating', 'seatingCapacity', '5', 'number-pad')}
              </View>
            </View>
            {renderInput('Color', 'color', 'e.g., Pearl White')}
          </View>

          {/* Additional Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Details</Text>
            {renderInput('Location', 'location', 'e.g., New York, NY')}
            {renderInput(
              'Description',
              'description',
              'Describe the vehicle...',
              'default',
              true
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Features (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter features separated by commas"
                placeholderTextColor={colors.textSecondary}
                value={formData.features}
                onChangeText={(value) => updateField('features', value)}
                multiline
                numberOfLines={3}
              />
              <Text style={styles.helperText}>
                Example: Apple CarPlay, Heated Seats, Sunroof
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text style={styles.submitButtonText}>Updating Vehicle...</Text>
            ) : (
              <>
                <Ionicons name="save" size={24} color={colors.white} />
                <Text style={styles.submitButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...textPresets.body,
    color: colors.textSecondary,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  availabilityCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  availabilityText: {
    marginLeft: 12,
    flex: 1,
  },
  availabilityTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
  },
  availabilitySubtitle: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginTop: 2,
  },
  availabilityToggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.systemGray4,
    padding: 2,
    justifyContent: 'center',
  },
  availabilityToggleActive: {
    backgroundColor: colors.success,
  },
  availabilityToggleKnob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  availabilityToggleKnobActive: {
    transform: [{ translateX: 24 }],
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...textPresets.title3,
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    ...textPresets.callout,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  required: {
    color: colors.danger,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...textPresets.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    ...textPresets.caption1,
    color: colors.danger,
    marginTop: 4,
  },
  helperText: {
    ...textPresets.caption1,
    color: colors.textSecondary,
    marginTop: 4,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorOptionActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  selectorOptionText: {
    ...textPresets.callout,
    color: colors.text,
  },
  selectorOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    ...textPresets.headline,
    color: colors.white,
    fontWeight: '600',
  },
});

export default AdminEditVehicleScreen;
