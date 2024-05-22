import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const Home = () => {
  const navigation = useNavigation();
  const [tours, setTours] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const getTicketPrice = (tourId) => {
    const ticket = tickets.find((ticket) => ticket.tour === tourId);
    return ticket ? ticket.price : 'N/A';
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Trang chủ',
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

    const fetchTours = async () => {
      try {
        const res = await fetch(`https://phamhuuquyet.pythonanywhere.com/tours/?page=${currentPage}`);
        const data = await res.json();
        setTours(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    const fetchTickets = async () => {
      try {
        const res = await fetch("https://phamhuuquyet.pythonanywhere.com/tickets/");
        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTours();
    fetchTickets();
  }, [currentPage]);

  const handleTourDetail = (tour) => {
    navigation.navigate('TourDetail', { tour });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    setIsMenuOpen(false);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={{ marginHorizontal: 10 }}>
            {tours.map((tour) => (
              <TouchableOpacity key={tour.id} onPress={() => handleTourDetail(tour)}>
                <Animatable.View animation="fadeInUp" duration={1000} style={styles.tourContainer}>
                  <Image source={{ uri: tour.image }} style={styles.image} />
                  <Text style={styles.title}>{tour.tour_name}</Text>
                  <Text style={styles.info}>Thời gian chuyến đi: {tour.duration}</Text>
                  <Text style={styles.info}>Ngày khởi hành: {tour.departure_date}</Text>
                  <Text style={styles.info}>Giá: {getTicketPrice(tour.id)} VND</Text>
                </Animatable.View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <Modal
        isVisible={isMenuOpen}
        backdropOpacity={0.5}
        onBackdropPress={handleMenuToggle}
        style={styles.modal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleNavigation('Home')}>
            <Text style={styles.menuItem}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('TravelNews')}>
            <Text style={styles.menuItem}>Đến trang tin tức</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        {currentPage > 1 && (
          <TouchableOpacity onPress={handlePrevPage} style={{ paddingHorizontal: 10 }}>
            <FontAwesome name="chevron-left" size={24} color="#007bff" />
          </TouchableOpacity>
        )}
        <Text style={{ marginHorizontal: 10 }}>{`Trang ${currentPage}`}</Text>
        {tours.length === itemsPerPage && !loading && (
          <TouchableOpacity onPress={handleNextPage} style={{ paddingHorizontal: 10 }}>
            <FontAwesome name="chevron-right" size={24} color="#007bff" />
          </TouchableOpacity>
        )}


      </View>
    </View>
  );
};

export default Home;
