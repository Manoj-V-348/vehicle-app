import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { mockVehicles } from '../../data/mockVehicles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

const BookingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { vehicleId, bookingType } = route.params;
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    preferredDate: '',
    additionalNotes: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!vehicle) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color={colors.systemGray} />
        <Text style={styles.errorText}>Vehicle not found</Text>
      </View>
    );
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Required Field', 'Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Required Field', 'Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Required Field', 'Please enter your phone number');
      return false;
    }
    if (bookingType === 'Test Drive' && !formData.preferredDate.trim()) {
      Alert.alert('Required Field', 'Please enter your preferred date');
      return false;
    }
    if (bookingType === 'Purchase' && !formData.address.trim()) {
      Alert.alert('Required Field', 'Please enter your address for delivery');
      return false;
    }
    if (!agreedToTerms) {
      Alert.alert('Terms & Conditions', 'Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const amount = bookingType === 'Purchase' ? vehicle.price : 0;
    const bookingId = `B${Date.now()}`;

    // Navigate to payment screen
    navigation.navigate('Payment', {
      bookingId,
      amount,
      vehicleName: vehicle.name,
    });
  };

  const renderInput = (
    label: string,
    field: keyof typeof formData,
    placeholder: string,
    icon: string,
    keyboardType: any = 'default',
    multiline: boolean = false
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, multiline && styles.inputWrapperMultiline]}>
        <Ionicons name={icon as any} size={20} color={colors.systemGray} />
        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          placeholder={placeholder}
          placeholderTextColor={colors.systemGray2}
          value={formData[field]}
          onChangeText={(value) => updateField(field, value)}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
          autoCorrect={false}
        />
      </View>
    </View>
  );

  const getBookingTypeInfo = () => {
    switch (bookingType) {
      case 'Purchase':
        return {
          title: 'Purchase Vehicle',
          subtitle: 'Complete the form to finalize your purchase',
          icon: 'cart',
          color: colors.primary,
        };
      case 'Test Drive':
        return {
          title: 'Schedule Test Drive',
          subtitle: 'Book a test drive at your convenience',
          icon: 'car-sport',
          color: colors.success,
        };
      default:
        return {
          title: 'Book Vehicle',
          subtitle: 'Complete your booking',
          icon: 'calendar',
          color: colors.secondary,
        };
    }
  };

  const bookingInfo = getBookingTypeInfo();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerIcon}>
            <LinearGradient
              colors={[bookingInfo.color, bookingInfo.color + 'CC']}
              style={styles.headerIconGradient}
            >
              <Ionicons name={bookingInfo.icon as any} size={32} color={colors.white} />
            </LinearGradient>
          </View>
          <Text style={styles.headerTitle}>{bookingInfo.title}</Text>
          <Text style={styles.headerSubtitle}>{bookingInfo.subtitle}</Text>
        </View>

        {/* Vehicle Summary */}
        <View style={styles.vehicleCard}>
          <Image source={{ uri: vehicle.images[0] }} style={styles.vehicleImage} />
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleDetails}>
              {vehicle.year} • {vehicle.type} • {vehicle.fuelType}
            </Text>
            {bookingType === 'Purchase' && (
              <Text style={styles.vehiclePrice}>${vehicle.price.toLocaleString()}</Text>
            )}
            {bookingType === 'Test Drive' && (
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>FREE</Text>
              </View>
            )}
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {renderInput('Full Name', 'fullName', 'John Doe', 'person-outline')}
          {renderInput('Email Address', 'email', 'john@example.com', 'mail-outline', 'email-address')}
          {renderInput('Phone Number', 'phone', '+1 (555) 123-4567', 'call-outline', 'phone-pad')}

          {bookingType === 'Purchase' && (
            <>
              <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>Delivery Address</Text>
              {renderInput('Street Address', 'address', '123 Main Street', 'home-outline')}

              <View style={styles.rowInputs}>
                <View style={styles.rowInput}>
                  {renderInput('City', 'city', 'New York', 'location-outline')}
                </View>
                <View style={styles.rowInput}>
                  {renderInput('ZIP Code', 'zipCode', '10001', 'pin-outline', 'number-pad')}
                </View>
              </View>
            </>
          )}

          {bookingType === 'Test Drive' && (
            <>
              <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>Test Drive Details</Text>
              {renderInput(
                'Preferred Date',
                'preferredDate',
                'e.g., Dec 15, 2024 at 2:00 PM',
                'calendar-outline'
              )}
            </>
          )}

          <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>Additional Information</Text>
          {renderInput(
            'Notes (Optional)',
            'additionalNotes',
            'Any special requests or questions...',
            'document-text-outline',
            'default',
            true
          )}
        </View>

        {/* Terms & Conditions */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxActive]}>
            {agreedToTerms && (
              <Ionicons name="checkmark" size={18} color={colors.white} />
            )}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.termsLink}>Terms & Conditions</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Summary */}
        {bookingType === 'Purchase' && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Vehicle Price</Text>
              <Text style={styles.summaryValue}>${vehicle.price.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Processing Fee</Text>
              <Text style={styles.summaryValue}>$0</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotal}>Total Amount</Text>
              <Text style={styles.summaryTotalAmount}>${vehicle.price.toLocaleString()}</Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Submit Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitButtonText}>
              {bookingType === 'Purchase' ? 'Proceed to Payment' : 'Confirm Booking'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    padding: 20,
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
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerIcon: {
    marginBottom: 16,
  },
  headerIconGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...textPresets.title3,
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    ...textPresets.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  vehicleCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.systemGray6,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  vehicleName: {
    ...textPresets.headline,
    color: colors.text,
    marginBottom: 6,
  },
  vehicleDetails: {
    ...textPresets.subheadline,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  vehiclePrice: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: '700',
  },
  freeBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  freeBadgeText: {
    ...textPresets.caption1,
    color: colors.white,
    fontWeight: '700',
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionTitleMargin: {
    marginTop: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    ...textPresets.subheadline,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
  },
  inputWrapperMultiline: {
    height: 'auto',
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    ...textPresets.body,
    color: colors.text,
    padding: 0,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  rowInput: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.systemGray3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    ...textPresets.body,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  summaryTotal: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '700',
  },
  summaryTotalAmount: {
    ...textPresets.title3,
    color: colors.primary,
    fontWeight: '700',
  },
  bottomBar: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: '700',
  },
});

export default BookingScreen;
