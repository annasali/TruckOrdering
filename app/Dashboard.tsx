import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Request {
  id: string;
  location: string;
  size: string;
  weight: string;
  status: string;
  pickupTime: string;
  deliveryTime: string;
}

export default function Dashboard() {
  const [requests, setRequests] = useState<Request[]>([]); // Specify the type of requests
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Simulate API response
      const mockData: Request[] = [
        {
          id: '1',
          location: 'New York',
          size: 'Medium',
          weight: '500kg',
          status: 'Pending',
          pickupTime: '2024-12-01 10:00 AM',
          deliveryTime: '2024-12-01 04:00 PM',
        },
        {
          id: '2',
          location: 'San Francisco',
          size: 'Large',
          weight: '1000kg',
          status: 'In Progress',
          pickupTime: '2024-12-02 08:00 AM',
          deliveryTime: '2024-12-02 03:00 PM',
        },
        {
          id: '3',
          location: 'Chicago',
          size: 'Small',
          weight: '300kg',
          status: 'Delivered',
          pickupTime: '2024-11-30 09:00 AM',
          deliveryTime: '2024-11-30 01:00 PM',
        },
      ];
      setRequests(mockData); // This works because the types match
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Request }) => (
    <View style={styles.requestItem}>
      <Text style={styles.label}>Location: <Text style={styles.value}>{item.location}</Text></Text>
      <Text style={styles.label}>Size: <Text style={styles.value}>{item.size}</Text></Text>
      <Text style={styles.label}>Weight: <Text style={styles.value}>{item.weight}</Text></Text>
      <Text style={styles.label}>Pickup Time: <Text style={styles.value}>{item.pickupTime}</Text></Text>
      <Text style={styles.label}>Delivery Time: <Text style={styles.value}>{item.deliveryTime}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{item.status}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard - Request Status</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  requestItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  pending: {
    color: '#f39c12',
  },
  inprogress: {
    color: '#3498db',
  },
  delivered: {
    color: '#2ecc71',
  },
});
