import { StyleSheet } from 'react-native';

export const InvoiceDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCFFFF', // Đổi màu nền thành màu xám nhạt
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff', // Đổi màu tiêu đề thành màu xanh đậm
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 18,
    marginBottom: 20,
  },
  dropdownContainer: {
    marginTop: 10,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownItem: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#007bff', // Đổi màu nút thanh toán thành màu xanh đậm
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1, // Đảm bảo menu luôn nằm trên cùng
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2, // Đảm bảo nút menu luôn nằm trên cùng
  },
  
});
