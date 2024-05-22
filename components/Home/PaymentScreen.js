  import React from 'react';
  import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
  import { PaymentStyles } from './PaymentStyles'; // Import styles for payment screen

  // Define constant for screen name
  const INVOICE_DETAIL_SCREEN = 'InvoiceDetailScreen';

  const PaymentScreen = ({ navigation, route }) => {
    const { tour, isChildTicket, childPrice } = route.params;
  

    const handleSelectPaymentMethod = (paymentMethod) => {
      // Navigate to the invoice detail screen when the user selects a payment method
      navigation.navigate(INVOICE_DETAIL_SCREEN, { 
        tour: tour,
        paymentMethod: paymentMethod,
        isChildTicket: isChildTicket,
        childPrice: childPrice
      });
    };

    return (
      <ScrollView contentContainerStyle={PaymentStyles.container}>
        <Text style={PaymentStyles.title}>Chọn phương thức thanh toán</Text>
        <View style={PaymentStyles.paymentOptions}>
          <TouchableOpacity onPress={() => handleSelectPaymentMethod('MoMo')}>
            <Image
              source={require('../Picture/MoMo_Logo.png')}
              style={PaymentStyles.paymentMethodIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectPaymentMethod('ZaloPay')}>
            <Image
              source={require('../Picture/Logo-ZaloPay.jpg')}
              style={PaymentStyles.paymentMethodIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  export default PaymentScreen;
