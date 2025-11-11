import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import { getCurrentUser } from '../../data/mockUsers';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';



const ProfileScreen= ({ navigation }) => {
  const user = getCurrentUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const renderMenuItem = (
    icon,
    title,
    subtitle?: string,
    onPress?: () => void,
    showArrow = true,
    rightComponent?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.systemGray} />
      ))}
    </TouchableOpacity>
  );

  const renderSwitchItem = (
    icon,
    title,
    subtitle,
    value,
    onValueChange: (value) => void
  ) => (
    renderMenuItem(
      icon,
      title,
      subtitle,
      undefined,
      false,
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.systemGray4, true: colors.primary }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.systemGray4}
      />
    )
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <Image
              source={{ uri: user.profileImage || 'https://i.pravatar.cc/300?img=12' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <View style={styles.memberBadge}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.memberText}>Premium Member</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={18} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Bookings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Activity</Text>
          <View style={styles.menuCard}>
            {renderMenuItem(
              'calendar',
              'Booking History',
              'View all your bookings',
              () => navigation.navigate('BookingHistory')
            )}
            {renderMenuItem(
              'heart',
              'Favorites',
              'Your saved vehicles',
              () => Alert.alert('Coming Soon', 'Favorites feature coming soon!')
            )}
            {renderMenuItem(
              'star',
              'My Reviews',
              'Reviews you have written',
              () => Alert.alert('Coming Soon', 'Reviews feature coming soon!')
            )}
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.menuCard}>
            {renderMenuItem(
              'person',
              'Personal Information',
              'Update your details',
              () => Alert.alert('Coming Soon', 'Edit profile feature coming soon!')
            )}
            {renderMenuItem(
              'card',
              'Payment Methods',
              'Manage your payment options',
              () => Alert.alert('Coming Soon', 'Payment methods feature coming soon!')
            )}
            {renderMenuItem(
              'location',
              'Saved Addresses',
              'Your delivery addresses',
              () => Alert.alert('Coming Soon', 'Saved addresses feature coming soon!')
            )}
            {renderMenuItem(
              'lock-closed',
              'Security',
              'Password and authentication',
              () => Alert.alert('Coming Soon', 'Security settings coming soon!')
            )}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuCard}>
            {renderSwitchItem(
              'notifications',
              'Push Notifications',
              'Receive booking updates',
              notificationsEnabled,
              setNotificationsEnabled
            )}
            {renderSwitchItem(
              'moon',
              'Dark Mode',
              'Switch to dark theme',
              darkModeEnabled,
              setDarkModeEnabled
            )}
            {renderSwitchItem(
              'navigate',
              'Location Services',
              'Find nearby vehicles',
              locationEnabled,
              setLocationEnabled
            )}
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          <View style={styles.menuCard}>
            {renderMenuItem(
              'help-circle',
              'Help Center',
              'FAQs and support',
              () => Alert.alert('Help Center', 'Contact support at support@vehicleapp.com')
            )}
            {renderMenuItem(
              'document-text',
              'Terms & Conditions',
              'Read our terms',
              () => Alert.alert('Terms & Conditions', 'Terms and conditions will be displayed here.')
            )}
            {renderMenuItem(
              'shield-checkmark',
              'Privacy Policy',
              'How we protect your data',
              () => Alert.alert('Privacy Policy', 'Privacy policy will be displayed here.')
            )}
            {renderMenuItem(
              'information-circle',
              'About',
              'Version 1.0.0',
              () => Alert.alert('About', 'Online Vehicle App v1.0.0\n\nMade with love.')
            )}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Version 1.0.0</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.white,
  },
  headerTitle: {
    ...textPresets.title2,
    color: colors.text,
  },
  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  profileGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.white,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    ...textPresets.title3,
    color: colors.white,
    marginBottom: 4,
  },
  profileEmail: {
    ...textPresets.subheadline,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  memberText: {
    ...textPresets.caption1,
    color: colors.white,
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...textPresets.title3,
    color: colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    ...textPresets.caption1,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...textPresets.headline,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.systemGray6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...textPresets.callout,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    ...textPresets.footnote,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.danger,
    gap: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    ...textPresets.callout,
    color: colors.danger,
    fontWeight: '700',
  },
  footer: {
    ...textPresets.caption2,
    color: colors.systemGray,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default ProfileScreen;
