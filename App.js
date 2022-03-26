import { StatusBar } from 'expo-status-bar';
import React , {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import {Provider} from "react-redux";
import { store } from './store';
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from "@react-navigation/stack"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import { useSelector } from 'react-redux';
import { selectUid } from './slices/userSlice';
import LoginScreen from './screens/LoginScreen';
import AuthNavigation from './AuthNavigation';
import {firebase} from "./firebase"
// import {useDispatch} from "react-redux"


export default function App() {

  const Stack = createStackNavigator();
  
  // const dispatch = useDispatch()


  


  return (
   <Provider store = {store}>
    <AuthNavigation/>
   </Provider>
  );
}

