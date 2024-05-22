import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const EmployeeHome = () => {
  const navigation = useNavigation();

  // Danh sách các tour du lịch (giả định)
  const tours = [
    { id: 1, title: 'Tour du lịch đảo Bình Ba', price: '2.100.000 đ', date: '3 ngày 2 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/tour-binh-ba-1.jpg') },
    { id: 2, title: 'Tour du lịch Bà Nà Hill', price: '1.900.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/banahill.png') },
    { id: 3, title: 'Tour du lịch Côn Đảo', price: '3.400.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/con_dao.jpg') },
    { id: 4, title: 'Tour du lịch Đà Lạt', price: '2.900.000 đ', date: '3 ngày 2 đêm',phuongtien:'Xe máy lạnh',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/DaLat.jpg') },
    { id: 5, title: 'Tour du lịch Động Phong Nha', price: '2.300.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/DongPhongNha.jpg') },
    { id: 6, title: 'Tour du lịch Đồng Tháp', price: '2.100.000 đ', date: '3 ngày 2 đêm',phuongtien:'Xe máy lạnh',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/DongThap.jpg') },
    { id: 7, title: 'Tour du lịch Vịnh Hạ Long', price: '4.900.000 đ', date: '3 ngày 2 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/Ha_long.jpg') },
    { id: 8, title: 'Tour du lịch Hà Nội', price: '3.500.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/HaNoi.jpg') },
    { id: 9, title: 'Tour du lịch Hội An', price: '5.200.000 đ', date: '3 ngày 2 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/hoi_an.jpg') },
    { id: 10, title: 'Tour du lịch Nha Trang', price: '2.400.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/Nha_trang.jpg') },
    { id: 11, title: 'Tour du lịch Singapore', price: '12.900.000 đ', date: '4 ngày 3 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/singapore_13tr.jpg') },
    { id: 12, title: 'Tour du lịch Thái Lan', price: '6.100.000 đ', date: '5 ngày 4 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/ThaiLanh_6tr.jpg') },
    { id: 13, title: 'Tour du lịch Úc', price: '57.000.000 đ', date: '4 ngày 3 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/Uc_57trieu.jpg') },
    { id: 14, title: 'Tour du lịch Vĩnh Long', price: '2.500.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/VinhLong.jpg') },
    { id: 15, title: 'Tour du lịch Mỹ Tho', price: '1.400.000 đ', date: '2 ngày 1 đêm', phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/mytho.jpg') },
    { id: 16, title: 'Tour du lịch Quy Nhơn', price: '3.200.000 đ', date: '3 ngày 2 đêm', phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/quynhon.png') },
    { id: 17, title: 'Tour du lịch Sa Pa', price: '5.400.000 đ', date: '2 ngày 1 đêm', phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/sapa.jpg') },
    { id: 18, title: 'Tour du lịch Tây Nguyên', price: '4.600.000 đ', date: '4 ngày 3 đêm', phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/TayNguyen.png') },
    { id: 19, title: 'Tour du lịch Tiền Giang', price: '3.200.000 đ', date: '2 ngày 1 đêm',phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024' ,image: require('../Picture/TienGiang.jpg') },
    { id: 20, title: 'Tour du lịch Đảo Nam Du', price: '4.900.000 đ', date: '2 ngày 1 đêm', phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/DaoNamDu.jpg') },
    { id: 21, title: 'Tour du lịch Đà Nẵng', price: '3.900.000 đ', date: '2 ngày 1 đêm', phuongtien:'Xe máy lạnh - Tàu',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'01/05/2024',image: require('../Picture/danang.png') },
    { id: 22, title: 'Tour du lịch Núi Bà Đen', price: '2.300.000 đ', date: '2 ngày 1 đêm', phuongtien:'Xe máy lạnh',Noikhoihanh:'Tp.Hồ Chí Minh',Ngaykhoihanh:'03/05/2024',image: require('../Picture/nuibaden.jpg') },
  ];

  // Xử lý khi người dùng nhấp vào một tour du lịch để xem thông tin chi tiết
  const handleTourDetail = (tour) => {
    // Chuyển hướng đến màn hình chi tiết tour với thông tin của tour được chọn
    navigation.navigate('TourDetail', { tour });
  };

  // Render danh sách tour du lịch
  const renderTours = () => {
    return tours.map(tour => (
      <TouchableOpacity key={tour.id} onPress={() => handleTourDetail(tour)}>
        <View style={styles.tourContainer}>
          <Image source={tour.image} style={styles.image} />
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.info}>Giá: {tour.price}</Text>
          <Text style={styles.info}>Thời gian chuyến đi: {tour.date}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {renderTours()}
    </ScrollView>
  );
};

export default EmployeeHome;
