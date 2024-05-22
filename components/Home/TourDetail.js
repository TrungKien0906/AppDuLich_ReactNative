import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native';
import { TourDetailStyles } from '../Home/TourDetailStyles';
import { Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import { FontAwesome } from '@expo/vector-icons';

const TourDetail = ({ route }) => {
  const { tour } = route.params;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigation = useNavigation();
  const { width: contentWidth } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Thông tin tour',
      headerStyle: {
        backgroundColor: '#6200ea', // Màu nền cho header
      },
      headerTitleStyle: {
        color: '#fff', // Màu chữ cho header
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ marginLeft: 20 }}>
            <FontAwesome name="chevron-left" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleMenuToggle}>
          <View style={{ marginRight: 20 }}>
            <FontAwesome name="bars" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isMenuOpen]);

  const formatCurrency = (amount) => {
    return amount ? parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A';
  };

  const handleBookTicket = async () => {
    try {
      const res = await fetch(`https://phamhuuquyet.pythonanywhere.com/tickets/?tour=${tour.id}`);
      const data = await res.json();
      console.log('Fetched tickets data:', data);
   
      const filteredTickets = data.filter(ticket => ticket.tour === tour.id);
      setTickets(filteredTickets);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedTicket) {
      const totalPrice = ticketCount * parseFloat(selectedTicket.price);
      navigation.navigate('InvoiceDetailScreen', {
        tour: tour,
        ticketCount: ticketCount,
        totalPrice: totalPrice,
      });
      setShowModal(false);
    } else {
      console.error('Please select a ticket type before confirming booking.');
    }
  };

  const handleSendComment = () => {
    console.log('Comment:', comment);
    console.log('Rating:', rating);
  };

  const increaseCount = () => {
    setTicketCount(ticketCount + 1);
  };

  const decreaseCount = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    setIsMenuOpen(false);
  };

  return (
    <View style={TourDetailStyles.container}>
      <ScrollView contentContainerStyle={TourDetailStyles.scrollView}>
        <View style={TourDetailStyles.detailsContainer}>
          <Image source={{ uri: tour.image }} style={TourDetailStyles.image} />
          <View style={TourDetailStyles.detailsContainer}>
            <Text style={TourDetailStyles.title}>{tour.tour_name}</Text>
            <Text style={TourDetailStyles.info}>Thời gian chuyến đi: <Text style={TourDetailStyles.textLeft}>{tour.duration}</Text></Text>
            <Text style={TourDetailStyles.info}>Ngày khởi hành: <Text style={TourDetailStyles.textLeft}>{tour.departure_date}</Text></Text>
            <View>
              <HTML source={{ html: tour.description }} contentWidth={contentWidth} />
            </View>
            <TouchableOpacity style={TourDetailStyles.bookButton} onPress={handleBookTicket}>
              <Text style={TourDetailStyles.bookButtonText}>Đặt vé</Text>
            </TouchableOpacity>
            <TextInput
              style={TourDetailStyles.commentInput}
              placeholder="Nhập bình luận..."
              onChangeText={text => setComment(text)}
              value={comment}
            />
            <Rating
              type='star'
              ratingCount={5}
              imageSize={30}
              showRating
              fractions={1}
              startingValue={rating}
              onFinishRating={value => setRating(value)}
            />
            <TouchableOpacity style={TourDetailStyles.sendButton} onPress={handleSendComment}>
              <Text style={TourDetailStyles.sendButtonText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={showModal} backdropOpacity={0.5}>
          <View style={TourDetailStyles.modalContainer}>
            <Text style={TourDetailStyles.modalTitle}>Chọn loại vé</Text>
            {tickets && tickets.length > 0 ? (
              tickets.map(ticket => (
                <TouchableOpacity
                  key={ticket.id}
                  style={[
                    TourDetailStyles.ticketItem,
                    selectedTicket && selectedTicket.id === ticket.id && TourDetailStyles.selectedTicketItem
                  ]}
                  onPress={() => setSelectedTicket(ticket)}
                >
                  <Text style={TourDetailStyles.ticketTitle}>{ticket.title}</Text>
                  <Text style={TourDetailStyles.ticketPrice}>{formatCurrency(ticket.price)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Không có vé cho tour này.</Text>
            )}
            {selectedTicket && (
              <View style={TourDetailStyles.ticketQuantityContainer}>
                <Text style={TourDetailStyles.ticketQuantityLabel}>Số lượng vé:</Text>
                <View style={TourDetailStyles.ticketQuantityControls}>
                  <TouchableOpacity onPress={decreaseCount} style={TourDetailStyles.quantityButton}>
                    <Text style={TourDetailStyles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={TourDetailStyles.ticketQuantity}>{ticketCount}</Text>
                  <TouchableOpacity onPress={increaseCount} style={TourDetailStyles.quantityButton}>
                    <Text style={TourDetailStyles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <TouchableOpacity style={TourDetailStyles.modalOption} onPress={handleConfirmBooking}>
              <Text style={TourDetailStyles.modalOptionText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TourDetailStyles.modalCancel} onPress={() => setShowModal(false)}>
              <Text style={TourDetailStyles.modalCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>

      {isMenuOpen && (
        <View style={TourDetailStyles.menu}>
          <TouchableOpacity onPress={() => handleNavigation('Home')}>
            <Text style={TourDetailStyles.menuItem}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('TravelNews')}>
            <Text style={TourDetailStyles.menuItem}>Đến trang tin tức</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TourDetail;