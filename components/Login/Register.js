import React, { useEffect ,useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { registerStyles } from './RegisterStyles'; // Import styles
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState('khachhang'); // Default to customer

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://phamhuuquyet.pythonanywhere.com/users/', {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
        role: 'khachhang' // Thêm trường role với giá trị là 'khachhang'
      });
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login'); // Chuyển hướng đến trang đăng nhập sau khi tạo tài khoản thành công
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  const picker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Yêu cầu quyền truy cập!");
    } else {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.cancelled) {
        setAvatar(res.uri); // Cập nhật trạng thái avatar với URI của ảnh đã chọn
      }
    }
  }
  useEffect(() => {
    navigation.setOptions({
      title: 'Đăng ký',
      headerStyle: {
        backgroundColor: '#6200ea', // Màu nền cho header
      },
      headerTitleStyle: {
        color: '#fff', // Màu chữ cho header
      },
  
    })});
  return (
    <ImageBackground source={require('../Picture/AnhNenLogin2.jpg')} style={registerStyles.backgroundImage}>
      <View style={registerStyles.container}>
        <Text style={registerStyles.title}>Đăng ký</Text>
        <View style={registerStyles.inputContainer}>
          <TextInput
            style={registerStyles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={registerStyles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={registerStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={registerStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={registerStyles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={registerStyles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {role === 'khachhang' && (
            <View>
              <TouchableOpacity onPress={picker} style={registerStyles.button}>
                <Text style={registerStyles.buttonText}>Chọn ảnh</Text>
              </TouchableOpacity>
              {avatar && (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: 100, height: 100, margin: 10 }}
                />
              )}
            </View>
          )}
        </View>
        <TouchableOpacity style={registerStyles.button} onPress={handleRegister}>
          <Text style={registerStyles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={registerStyles.link}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Register;
