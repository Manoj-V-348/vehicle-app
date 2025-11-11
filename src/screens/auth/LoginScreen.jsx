import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { textPresets } from '../../theme/typography';
import Button from '../../components/Button';


const LoginScreen= ({ navigation, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    // Mock authentication
    if (email.toLowerCase() === 'admin@vehicleapp.com') {
      setIsAdmin(true);
      navigation.replace('MainApp');
    } else {
      setIsAdmin(false);
      navigation.replace('MainApp');
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="car-sport" size={64} color={colors.white} />
              </View>
              <Text style={styles.title}>Vehicle App</Text>
              <Text style={styles.subtitle}>Your premium vehicle marketplace</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={colors.systemGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={colors.systemGray2}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.systemGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={colors.systemGray2}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.systemGray}
                  />
                </TouchableOpacity>
              </View>

              <Button
                title="Sign In"
                onPress={handleLogin}
                size="large"
                style={styles.loginButton}
              />

              <View style={styles.demoContainer}>
                <Text style={styles.demoText}>Demo Accounts:</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEmail('user@example.com');
                    setPassword('password');
                  }}
                  style={styles.demoButton}
                >
                  <Text style={styles.demoButtonText}>User Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEmail('admin@vehicleapp.com');
                    setPassword('admin123');
                  }}
                  style={styles.demoButton}
                >
                  <Text style={styles.demoButtonText}>Admin Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    ...textPresets.largeTitle,
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    ...textPresets.body,
    color: colors.white,
    opacity: 0.9,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...textPresets.body,
    color: colors.text,
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    marginTop: 8,
    backgroundColor: colors.white,
  },
  demoContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  demoText: {
    ...textPresets.callout,
    color: colors.white,
    marginBottom: 12,
    opacity: 0.9,
  },
  demoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 6,
  },
  demoButtonText: {
    ...textPresets.subheadline,
    color: colors.white,
    fontWeight: '600',
  },
});

export default LoginScreen;
