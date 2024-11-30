import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { router } from 'expo-router';

export default function TruckRequestPage() {
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [pickupTime, setPickupTime] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [error, setError] = useState('');

  const [isPickupPickerVisible, setPickupPickerVisible] = useState(false);
  const [isDeliveryPickerVisible, setDeliveryPickerVisible] = useState(false);

  const handlePickupConfirm = (date: any) => {
    setPickupTime(date);
    setPickupPickerVisible(false);
  };

  const handleDeliveryConfirm = (date: any) => {
    setDeliveryTime(date);
    setDeliveryPickerVisible(false);
  };

  const handleSubmit = () => {
    if (!location || !size || !weight) {
      setError('Please fill out all the details');
      return;
    }

    console.log('Truck request submitted', { location, size, weight, pickupTime, deliveryTime });
    router.push('/Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Please Add Truck Request Details</Text>
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Shipping Location</Text>
        <TextInput
          placeholder="Enter shipping location"
          style={styles.input}
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        <Text style={styles.inputLabel}>Weight (kg)</Text>
        <TextInput
          placeholder="Enter weight"
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />

        <Text style={styles.inputLabel}>Select Size</Text>
        <Picker
          selectedValue={size}
          style={styles.picker}
          onValueChange={(itemValue) => setSize(itemValue)}>
          <Picker.Item label="Select size" value="" />
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>

        <Text style={styles.inputLabel}>Select Pickup Time</Text>
        <TouchableOpacity onPress={() => setPickupPickerVisible(true)}>
          <Text style={styles.input}>{pickupTime.toLocaleString()}</Text>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Select Delivery Time</Text>
        <TouchableOpacity onPress={() => setDeliveryPickerVisible(true)}>
          <Text style={styles.input}>{deliveryTime.toLocaleString()}</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isPickupPickerVisible}
        mode="datetime"
        onConfirm={handlePickupConfirm}
        onCancel={() => setPickupPickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isDeliveryPickerVisible}
        mode="datetime"
        onConfirm={handleDeliveryConfirm}
        onCancel={() => setDeliveryPickerVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  form: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 20,
  },
  errorText: {
    color: '#ff5252',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
