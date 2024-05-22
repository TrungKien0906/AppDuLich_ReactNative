import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginStyles } from '../Login/LoginStyles';
import { Picker } from '@react-native-picker/picker';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('khachhang');
  const [isLoading, setIsLoading] = useState(false);

  // Tạo đối tượng lưu trữ thông tin của các tài khoản giả
  const fakeAccounts = {
    'khachhang': { username: 'khachhang', password: '123456', role: 'khachhang' },
    'admin': { username: 'admin', password: '123', role: 'admin' }
  };

  const login = async () => {
    if (!username || !password) {
      Alert.alert('Login Error', 'Vui lòng điền tên đăng nhập và mật khẩu.');
      return;
    }

    setIsLoading(true);
    try {
      // Kiểm tra thông tin đăng nhập với các tài khoản giả
      const user = fakeAccounts[username];
      if (!user || user.password !== password) {
        throw new Error('Invalid username or password');
      }

      // Lưu mã thông báo vào AsyncStorage (giả sử không cần mã thông báo ở đây)

      // Kiểm tra vai trò của người dùng và điều hướng tới trang tương ứng
      if (user.role === 'khachhang') {
        navigation.navigate('Home'); // Điều hướng tài khoản khách đến trang Home
      } else if (user.role === 'admin') {
        navigation.navigate('AdminHome'); // Điều hướng tài khoản admin đến trang AdminHome
      }
    } catch (error) {
      Alert.alert('Login Error', 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>ĐĂNG NHẬP</Text>
      <View style={loginStyles.inputContainer}>
        <TextInput
          style={loginStyles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput 
          style={loginStyles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Picker
          style={loginStyles.picker}
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Khách hàng" value="khachhang" />
          <Picker.Item label="Nhân viên" value="nhanvien" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>
      <View style={loginStyles.buttonContainer}>
        {isLoading ? (
          <TouchableOpacity style={loginStyles.button} disabled={true}>
            <ActivityIndicator size="small" color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={loginStyles.button} onPress={login}>
            <Text style={loginStyles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={loginStyles.button} onPress={handleRegister}>
          <Text style={loginStyles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
