import { StyleSheet } from 'react-native';

export const PaymentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentMethodIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
