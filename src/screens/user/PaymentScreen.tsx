import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google';

const PaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { bookingId, amount, vehicleName } = route.params;

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(formatCardNumber(cleaned));
    }
  };

  const handleExpiryChange = (text: string) => {
    const formatted = formatExpiryDate(text);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCvv(cleaned);
    }
  };

  const validatePayment = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        Alert.alert('Invalid Card', 'Please enter a valid card number');
        return false;
      }
      if (!cardName.trim()) {
        Alert.alert('Invalid Name', 'Please enter the cardholder name');
        return false;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        Alert.alert('Invalid Expiry', 'Please enter a valid expiry date');
        return false;
      }
      if (!cvv || cvv.length < 3) {
        Alert.alert('Invalid CVV', 'Please enter a valid CVV');
        return false;
      }
    }
    return true;
  };

  const processPayment = () => {
    if (!validatePayment()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Payment Successful!',
        `Your payment of $${amount.toLocaleString()} has been processed successfully.`,
        [
          {
            text: 'View Booking',
            onPress: () => {
              navigation.reset({
                index: 1,
                routes: [
                  { name: 'MainApp' },
                  { name: 'BookingHistory' },
                ],
              });
            },
          },
          {
            text: 'Go Home',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
              });
            },
          },
        ]
      );
    }, 2000);
  };

  const renderPaymentMethodButton = (
    method: PaymentMethod,
    icon: string,
    label: string
  ) => {
    const isSelected = selectedMethod === method;
    return (
      <TouchableOpacity
        key={method}
        style={[styles.methodButton, isSelected && styles.methodButtonActive]}
        onPress={() => setSelectedMethod(method)}
      >
        <View style={[styles.methodIcon, isSelected && styles.methodIconActive]}>
          <Ionicons
            name={icon as any}
            size={24}
            color={isSelected ? colors.white : colors.primary}
          />
        </View>
        <Text style={[styles.methodLabel, isSelected && styles.methodLabelActive]}>
          {label}
        </Text>
        {isSelected && (
          <View style={styles.methodCheck}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Payment Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryHeader}>
              <Ionicons name="shield-checkmark" size={32} color={colors.white} />
              <Text style={styles.summaryTitle}>Secure Payment</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryContent}>
              <Text style={styles.vehicleLabel}>Vehicle</Text>
              <Text style={styles.vehicleValue}>{vehicleName}</Text>
            </View>
            <View style={styles.summaryAmount}>
              <Text style={styles.amountLabel}>Total Amount</Text>
              <Text style={styles.amountValue}>${amount.toLocaleString()}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methodsGrid}>
            {renderPaymentMethodButton('card', 'card', 'Card')}
            {renderPaymentMethodButton('paypal', 'logo-paypal', 'PayPal')}
            {renderPaymentMethodButton('apple', 'logo-apple', 'Apple Pay')}
            {renderPaymentMethodButton('google', 'logo-google', 'Google Pay')}
          </View>
        </View>

        {/* Card Details Form */}
        {selectedMethod === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            <View style={styles.formCard}>
              {/* Card Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="card-outline" size={20} color={colors.systemGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor={colors.systemGray2}
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    keyboardType="number-pad"
                    maxLength={19}
                  />
                  {cardNumber.length > 0 && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  )}
                </View>
              </View>

              {/* Card Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={colors.systemGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={colors.systemGray2}
                    value={cardName}
                    onChangeText={setCardName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Expiry & CVV */}
              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, styles.rowInput]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="calendar-outline" size={20} color={colors.systemGray} />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor={colors.systemGray2}
                      value={expiryDate}
                      onChangeText={handleExpiryChange}
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, styles.rowInput]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.systemGray} />
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor={colors.systemGray2}
                      value={cvv}
                      onChangeText={handleCvvChange}
                      keyboardType="number-pad"
                      secureTextEntry
                      maxLength={4}
                    />
                  </View>
                </View>
              </View>

              {/* Save Card */}
              <TouchableOpacity
                style={styles.saveCardContainer}
                onPress={() => setSaveCard(!saveCard)}
              >
                <View style={[styles.checkbox, saveCard && styles.checkboxActive]}>
                  {saveCard && <Ionicons name="checkmark" size={16} color={colors.white} />}
                </View>
                <Text style={styles.saveCardText}>Save card for future payments</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Other Payment Methods Info */}
        {selectedMethod !== 'card' && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={48} color={colors.primary} />
              <Text style={styles.infoTitle}>
                {selectedMethod === 'paypal' && 'PayPal Payment'}
                {selectedMethod === 'apple' && 'Apple Pay'}
                {selectedMethod === 'google' && 'Google Pay'}
              </Text>
              <Text style={styles.infoText}>
                You will be redirected to complete your payment securely.
              </Text>
            </View>
          </View>
        )}

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Ionicons name="lock-closed" size={16} color={colors.success} />
          <Text style={styles.securityText}>
            Your payment information is secure and encrypted
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomBar}>
        {isProcessing ? (
          <View style={styles.processingContainer}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons name="sync" size={32} color={colors.primary} />
            </Animated.View>
            <Text style={styles.processingText}>Processing Payment...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.payButton}
            onPress={processPayment}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.success, colors.success + 'CC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.payGradient}
            >
              <Ionicons name="lock-closed" size={20} color={colors.white} />
              <Text style={styles.payButtonText}>Pay ${amount.toLocaleString()}</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryGradient: {
    padding: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  summaryTitle: {
    ...textPresets.title3,
    color: colors.white,
    fontWeight: 700,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 16,
  },
  summaryContent: {
    marginBottom: 20,
  },
  vehicleLabel: {
    ...textPresets.subheadline,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 6,
  },
  vehicleValue: {
    ...textPresets.headline,
    color: colors.white,
    fontWeight: 600,
  },
  summaryAmount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    ...textPresets.callout,
    color: colors.white,
    fontWeight: 600,
  },
  amountValue: {
    ...textPresets.title2,
    color: colors.white,
    fontWeight: 700,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...textPresets.title3,
    color: colors.text,
    marginBottom: 16,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  methodButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  methodIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.systemGray6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodIconActive: {
    backgroundColor: colors.primary,
  },
  methodLabel: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: 600,
  },
  methodLabelActive: {
    color: colors.primary,
  },
  methodCheck: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    ...textPresets.subheadline,
    color: colors.text,
    fontWeight: 600,
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
  input: {
    flex: 1,
    ...textPresets.body,
    color: colors.text,
    padding: 0,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  rowInput: {
    flex: 1,
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
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
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  saveCardText: {
    ...textPresets.body,
    color: colors.text,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: 600,
    marginTop: 16,
    marginBottom: 8,
  },
  infoText: {
    ...textPresets.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success + '15',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  securityText: {
    ...textPresets.subheadline,
    color: colors.success,
    fontWeight: 600,
  },
  bottomBar: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  payGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  payButtonText: {
    ...textPresets.headline,
    color: colors.white,
    fontWeight: 700,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  processingText: {
    ...textPresets.callout,
    color: colors.primary,
    fontWeight: 600,
  },
});

export default PaymentScreen;
