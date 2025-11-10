import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// User Screens
import HomeScreen from '../screens/user/HomeScreen';
import BrowseScreen from '../screens/user/BrowseScreen';
import VehicleDetailScreen from '../screens/user/VehicleDetailScreen';
import SearchScreen from '../screens/user/SearchScreen';
import BookingScreen from '../screens/user/BookingScreen';
import RentalScreen from '../screens/user/RentalScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import BookingHistoryScreen from '../screens/user/BookingHistoryScreen';
import PaymentScreen from '../screens/user/PaymentScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminVehiclesScreen from '../screens/admin/AdminVehiclesScreen';
import AdminAddVehicleScreen from '../screens/admin/AdminAddVehicleScreen';
import AdminEditVehicleScreen from '../screens/admin/AdminEditVehicleScreen';
import AdminBookingsScreen from '../screens/admin/AdminBookingsScreen';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  VehicleDetail: { vehicleId: string };
  Search: undefined;
  Booking: { vehicleId: string; bookingType: 'Purchase' | 'Rental' | 'Test Drive' };
  Rental: { vehicleId: string };
  Payment: { bookingId: string; amount: number; vehicleName: string };
  BookingHistory: undefined;
  AdminEditVehicle: { vehicleId: string };
  AdminAddVehicle: undefined;
};

export type TabParamList = {
  Home: undefined;
  Browse: undefined;
  Profile: undefined;
  AdminDashboard: undefined;
  AdminVehicles: undefined;
  AdminBookings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.systemGray,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-sport" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.systemGray,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AdminVehicles"
        component={AdminVehiclesScreen}
        options={{
          tabBarLabel: 'Vehicles',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-sport" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AdminBookings"
        component={AdminBookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsAdmin={setIsAdmin} />}
        </Stack.Screen>
        <Stack.Screen name="MainApp">
          {() => (isAdmin ? <AdminTabs /> : <UserTabs />)}
        </Stack.Screen>
        <Stack.Screen
          name="VehicleDetail"
          component={VehicleDetailScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: true,
            headerTitle: 'Search Vehicles',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            headerShown: true,
            headerTitle: 'Book Vehicle',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Rental"
          component={RentalScreen}
          options={{
            headerShown: true,
            headerTitle: 'Rent Vehicle',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            headerShown: true,
            headerTitle: 'Payment',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="BookingHistory"
          component={BookingHistoryScreen}
          options={{
            headerShown: true,
            headerTitle: 'Booking History',
          }}
        />
        <Stack.Screen
          name="AdminAddVehicle"
          component={AdminAddVehicleScreen}
          options={{
            headerShown: true,
            headerTitle: 'Add Vehicle',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AdminEditVehicle"
          component={AdminEditVehicleScreen}
          options={{
            headerShown: true,
            headerTitle: 'Edit Vehicle',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
