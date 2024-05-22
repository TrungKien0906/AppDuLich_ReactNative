import { StyleSheet } from 'react-native';

export const TourDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
  },
  textLeft: {
    textAlign: 'left',
  },
  bookButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#007bff', // Màu nền của modalOption
  },
  modalOptionText: {
    fontSize: 16,
    color: '#fff', // Màu chữ của modalOption
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
  },
  counterButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  modalCancel: {
    width: '100%',
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#f00',
    borderRadius: 5,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    width: 200,
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
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedTicketItem: {
    backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  ticketQuantityContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  ticketQuantityLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  ticketQuantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 20,
  },
  ticketQuantity: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  ticketItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketTitle: {
    fontSize: 16,
  },
  ticketPrice: {
    fontSize:   16,
    color: '#333',
  },
  ticketItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns items with equal space between them
    alignItems: 'center', // Aligns items vertically
  },
  ticketTitle: {
    flex: 1, // Makes the title take up all available space
    fontSize: 16,
  },
  ticketPrice: {
    fontSize: 16,
    color: '#333',
  },
  
});

