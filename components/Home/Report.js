import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

const Report = () => {
    const navigation = useNavigation();
    const [selectedPeriod, setSelectedPeriod] = useState('month'); // Mặc định chọn theo tháng
  
    // Hàm xử lý khi người dùng chọn khoảng thời gian (tháng, quý, năm)
    const handlePeriodChange = (period) => {
      setSelectedPeriod(period);
      // Viết logic để lấy dữ liệu thống kê tương ứng với khoảng thời gian được chọn từ backend
    };
  
    return (
      <View>
        <Text>Thống kê báo cáo</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => handlePeriodChange('month')}>
            <Text style={{ fontWeight: selectedPeriod === 'month' ? 'bold' : 'normal' }}>Tháng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePeriodChange('quarter')}>
            <Text style={{ fontWeight: selectedPeriod === 'quarter' ? 'bold' : 'normal' }}>Quý</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePeriodChange('year')}>
            <Text style={{ fontWeight: selectedPeriod === 'year' ? 'bold' : 'normal' }}>Năm</Text>
          </TouchableOpacity>
        </View>
        
        {/* Biểu đồ */}
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={350}
          height={220}
          yAxisLabel="VNĐ "
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };
  export default Report;