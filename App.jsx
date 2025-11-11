import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const App = () => {
  const [screen, setScreen] = useState('login');

  if (screen === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>Vehicle App</Text>
          <TouchableOpacity style={styles.button} onPress={() => setScreen('home')}>
            <Text style={styles.buttonText}>Login as User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => setScreen('admin')}>
            <Text style={styles.buttonText}>Login as Admin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>Available Vehicles</Text>
          {['Toyota Camry - $30,000', 'Honda Civic - $25,000', 'Tesla Model 3 - $45,000'].map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{item}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => setScreen('login')}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'admin') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>Admin Dashboard</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Total Vehicles: 30</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Total Bookings: 15</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setScreen('login')}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 40, color: '#007AFF' },
  header: { fontSize: 24, fontWeight: '600', padding: 20, color: '#000' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: 200, alignItems: 'center', marginVertical: 10 },
  buttonSecondary: { backgroundColor: '#34C759' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  card: { backgroundColor: '#f5f5f5', padding: 20, marginHorizontal: 20, marginVertical: 10, borderRadius: 10 },
  cardText: { fontSize: 16, color: '#000' },
});

export default App;
