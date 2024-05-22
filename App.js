import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import TourDetail from './components/Home/TourDetail';
import PaymentScreen from './components/Home/PaymentScreen';
import InvoiceDetailScreen from './components/Home/InvoiceDetailScreen';
import AdminHome from './components/Home/AdminHome';
import EmployeeHome from './components/Home/EmployeeHome';
import Report from './components/Home/Report';
import TravelNews from './components/Home/TravelNews';
import Apis , {endpoints} from './Apis';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerBackTitle: 'Back' }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TourDetail" component={TourDetail} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="InvoiceDetailScreen" component={InvoiceDetailScreen} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="TravelNews" component={TravelNews} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
