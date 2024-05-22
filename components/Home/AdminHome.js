import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AdminHome = () => {
    const navigation = useNavigation();
    const [tours, setTours] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [newTourData, setNewTourData] = useState({
        tour_name: '',
        description: '',
        departure_date: '',
        duration: '',
        remaining_quantity: '',
        image: null,
    });
    const [editedTourData, setEditedTourData] = useState({
        id: null,
        tour_name: '',
        description: '',
        departure_date: '',
        duration: '',
        remaining_quantity: '',
        image: null,
    });
    const [selectedTourToDelete, setSelectedTourToDelete] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            title: 'Trang chủ Admin',
            headerStyle: {
                backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color="white" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('TravelNews')}>
                    <FontAwesome name="newspaper-o" size={24} color="white" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            ),
        });

        fetchTours();
    }, [navigation, currentPage]);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const loadTours = async () => {
        try {
            const res = await fetch("https://phamhuuquyet.pythonanywhere.com/tours/");
            const data = await res.json();
            setTours(data.results);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const handlePickImage = async (setImage) => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Yêu cầu cấp quyền', 'Cho phép cấp quyền truy cập máy ảnh');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleTourDetail = (tour) => {
        navigation.navigate('TourDetail', { tour });
    };
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

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        setLoading(true);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
        setLoading(true);
    };
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleEditModal = () => {
        setIsEditModalVisible(!isEditModalVisible);
    };

    const toggleDeleteModal = () => {
        setIsDeleteModalVisible(!isDeleteModalVisible);
    };

    const handleCreateTour = async () => {
        try {
            const formData = new FormData();
            formData.append('tour_name', newTourData.tour_name);
            formData.append('description', newTourData.description);
            formData.append('departure_date', newTourData.departure_date);
            formData.append('duration', newTourData.duration);
            formData.append('remaining_quantity', newTourData.remaining_quantity);
            
            // Thực hiện yêu cầu POST mà không thêm tiêu đề Authorization
            const response = await fetch("https://phamhuuquyet.pythonanywhere.com/tours/", {
                method: 'POST',
                body: formData,
            });
    
            const responseData = await response.json();
            console.log('Create Tour Response:', responseData);
    
            if (response.ok) {
                // Xử lý phản hồi thành công
                Alert.alert('Thành công', 'Tạo tour thành công', [{ text: 'OK', onPress: () => { loadTours(); toggleModal(); } }]);
                setNewTourData({
                    tour_name: '',
                    description: '',
                    departure_date: '',
                    duration: '',
                    remaining_quantity: '',
                    image: null,
                });
            } else {
                // Xử lý phản hồi lỗi
                Alert.alert('Lỗi', `Không thể tạo tour: ${responseData.message || 'Lỗi không xác định'}`);
            }
        } catch (error) {
            // Xử lý lỗi mạng
            console.error('Lỗi khi tạo tour:', error);
            Alert.alert('Lỗi', 'Không thể tạo tour');
        }
    };
    


    const handleEditTour = (tour) => {
        setEditedTourData(tour);
        toggleEditModal();
    };

    const handleSaveEditedTour = async () => {
        try {
            const formData = new FormData();
            formData.append('tour_name', editedTourData.tour_name);
            formData.append('description', editedTourData.description);
            formData.append('departure_date', editedTourData.departure_date);
            formData.append('duration', editedTourData.duration);
            formData.append('remaining_quantity', editedTourData.remaining_quantity);

            if (editedTourData.image && !editedTourData.image.includes('http')) {
                const fileType = editedTourData.image.split('.').pop();
                formData.append('image', {
                    uri: editedTourData.image,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            const response = await fetch(`https://phamhuuquyet.pythonanywhere.com/tours/${editedTourData.id}/`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                Alert.alert('Success', 'Tour updated successfully', [{ text: 'OK', onPress: () => { loadTours(); toggleEditModal(); } }]);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', `Failed to update tour: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating tour:', error);
            Alert.alert('Error', 'Failed to update tour');
        }
    };

    const handleDeleteTour = (tourId) => {
        setSelectedTourToDelete(tours.find(tour => tour.id === tourId));
        toggleDeleteModal();
    };

    const confirmDeleteTour = async () => {
        try {
            const response = await fetch(`https://phamhuuquyet.pythonanywhere.com/tours/${selectedTourToDelete.id}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Alert.alert('Success', 'Tour deleted successfully', [{ text: 'OK', onPress: () => { loadTours(); toggleDeleteModal(); } }]);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', `Failed to delete tour: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting tour:', error);
            Alert.alert('Error', 'Failed to delete tour');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {tours.map(tour => (
                    <TouchableOpacity key={tour.id} onPress={() => handleTourDetail(tour)}>
                        <View style={styles.tourContainer}>
                            <Image source={{ uri: tour.image }} style={styles.image} />
                            <Text style={styles.title}>{tour.tour_name}</Text>
                            <Text style={styles.info}>Số lượng còn lại: {tour.remaining_quantity}</Text>
                            <Text style={styles.info}>Ngày khởi hành: {tour.departure_date}</Text>
                            <Text style={styles.info}>Thời lượng: {tour.duration}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.editButton} onPress={() => handleEditTour(tour)}>
                                    <Text style={styles.buttonText}>Sửa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTour(tour.id)}>
                                    <Text style={styles.buttonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput style={styles.input} placeholder="Tên tour" value={newTourData.tour_name} onChangeText={(text) => setNewTourData({ ...newTourData, tour_name: text })} />
                        <TextInput style={styles.input} placeholder="Mô tả" value={newTourData.description} onChangeText={(text) => setNewTourData({ ...newTourData, description: text })} />
                        <TextInput style={styles.input} placeholder="Ngày khởi hành" value={newTourData.departure_date} onChangeText={(text) => setNewTourData({ ...newTourData, departure_date: text })} />
                        <TextInput style={styles.input} placeholder="Thời lượng" value={newTourData.duration} onChangeText={(text) => setNewTourData({ ...newTourData, duration: text })} />
                        <TextInput style={styles.input} placeholder="Số lượng còn lại" value={newTourData.remaining_quantity} onChangeText={(text) => setNewTourData({ ...newTourData, remaining_quantity: text })} />
                        <TouchableOpacity style={styles.imagePicker} onPress={() => handlePickImage((image) => setNewTourData({ ...newTourData, image }))}>
                            <Text style={styles.imagePickerText}>Chọn ảnh</Text>
                        </TouchableOpacity>
                        {newTourData.image && (
                            <Image source={{ uri: newTourData.image }} style={styles.previewImage} />
                        )}
                        <Button title="Tạo tour" onPress={handleCreateTour} />
                        <Button title="Đóng" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={isEditModalVisible} onRequestClose={toggleEditModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput style={styles.input} placeholder="Tên tour" value={editedTourData.tour_name} onChangeText={(text) => setEditedTourData({ ...editedTourData, tour_name: text })} />
                        <TextInput style={styles.input} placeholder="Mô tả" value={editedTourData.description} onChangeText={(text) => setEditedTourData({ ...editedTourData, description: text })} />
                        <TextInput style={styles.input} placeholder="Ngày khởi hành" value={editedTourData.departure_date} onChangeText={(text) => setEditedTourData({ ...editedTourData, departure_date: text })} />
                        <TextInput style={styles.input} placeholder="Thời lượng" value={editedTourData.duration} onChangeText={(text) => setEditedTourData({ ...editedTourData, duration: text })} />
                        <TextInput style={styles.input} placeholder="Số lượng còn lại" value={editedTourData.remaining_quantity} onChangeText={(text) => setEditedTourData({ ...editedTourData, remaining_quantity: text })} />
                        <TouchableOpacity style={styles.imagePicker} onPress={() => handlePickImage((image) => setEditedTourData({ ...editedTourData, image }))}>
                            <Text style={styles.imagePickerText}>Chọn ảnh</Text>
                        </TouchableOpacity>
                        {editedTourData.image && (
                            <Image source={{ uri: editedTourData.image }} style={styles.previewImage} />
                        )}
                        <Button title="Lưu" onPress={handleSaveEditedTour} />
                        <Button title="Đóng" onPress={toggleEditModal} />
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={isDeleteModalVisible} onRequestClose={toggleDeleteModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Bạn có chắc chắn muốn xóa tour này không?</Text>
                        <Button title="Xóa" onPress={confirmDeleteTour} />
                        <Button title="Hủy" onPress={toggleDeleteModal} />
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.menuIcon} onPress={handleMenuToggle}>
                <FontAwesome name="bars" size={24} color="white" />
            </TouchableOpacity>
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

export default AdminHome;
