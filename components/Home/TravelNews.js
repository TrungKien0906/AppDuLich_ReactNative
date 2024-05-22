import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

const TravelNews = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const windowWidth = useWindowDimensions().width; // Lấy kích thước của cửa sổ

  useEffect(() => {
    navigation.setOptions({
      title: 'Tin tức du lịch',
      headerStyle: {
        backgroundColor: '#6200ea', // Màu nền cho header
      },
      headerTitleStyle: {
        color: '#fff', // Màu chữ cho header
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="white" style={styles.icon} />
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
    fetchNewsData();
  }, [navigation]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchNewsData = async () => {
    try {
      const response = await fetch('https://phamhuuquyet.pythonanywhere.com/news/');
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const handleNewsDetail = (id) => {
    
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {newsData.map((news) => (
          <TouchableOpacity key={news.id} onPress={() => handleNewsDetail(news.id)} style={styles.newsItem}>
            <View>
              <Image source={{ uri: news.image }} style={styles.newsImage} />
            </View>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <HTML source={{ html: news.content }} contentWidth={windowWidth} />

          </TouchableOpacity>
        ))}
      </ScrollView>

      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.menuItem}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TravelNews')}>
            <Text style={styles.menuItem}>Đến trang tin tức</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Màu nền mới cho container
  },
  scrollView: {
    padding: 10,
  },
  newsItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff', // Màu nền của newsItem
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 10,
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
});

export default TravelNews;
