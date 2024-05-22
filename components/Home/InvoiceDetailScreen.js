import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { InvoiceDetailScreenStyles } from '../Home/InvoiceDetailScreenStyles';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons'; 

const InvoiceDetailScreen = ({ route }) => {
  const navigation = useNavigation(); 
  const { tour, ticketCount, totalPrice } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: 'Thông tin thanh toán', 
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="black" style={InvoiceDetailScreenStyles.backButton} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleMenuToggle}>
          <View style={{ marginRight: 20 }}>
            <FontAwesome name="bars" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#6200ea', // Màu nền cho header
      },
      headerTitleStyle: {
        color: '#fff', // Màu chữ cho header
      },
    });
  }, [navigation]); 
 const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOpenPaymentApp = () => {
  
    if (selectedPaymentMethod === 'MoMo') {
      Linking.openURL('momo://');
    } else if (selectedPaymentMethod === 'ZaloPay') {
      Linking.openURL('zalopay://app');
    }
  };

  return (
    <View style={InvoiceDetailScreenStyles.container}>
      <Text style={InvoiceDetailScreenStyles.title}>Thông tin đặt vé</Text>
      <Text style={InvoiceDetailScreenStyles.info}>Tour: {tour.tour_name}</Text>
      <Text style={InvoiceDetailScreenStyles.info}>Số lượng vé: {ticketCount}</Text>
      <Text style={InvoiceDetailScreenStyles.info}>Tổng giá tiền: {totalPrice} VND</Text>

    
      <RNPickerSelect
        onValueChange={(value) => setSelectedPaymentMethod(value)}
        items={[
          { label: 'MoMo', value: 'MoMo' },
          { label: 'ZaloPay', value: 'ZaloPay' }
        ]}
        style={{
          inputIOS: InvoiceDetailScreenStyles.dropdownText,
          inputAndroid: InvoiceDetailScreenStyles.dropdownText,
        }}
        value={selectedPaymentMethod}
      />

     
      <TouchableOpacity style={InvoiceDetailScreenStyles.paymentButton} onPress={handleOpenPaymentApp} disabled={!selectedPaymentMethod}>
        <Text style={InvoiceDetailScreenStyles.paymentButtonText}>Thanh toán</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default InvoiceDetailScreen;
