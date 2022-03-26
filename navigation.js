import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer} from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ChatScreen from './screens/ChatScreen'
import AddNewchatScreen from './screens/AddNewchatScreen'
import ImageUploadScreen from './screens/ImageUploadScreen'
import UploadPdfScreen from './screens/UploadPdfScreen'
import ViewPdfScreen from './screens/ViewPdfScreen'
import AttachScreen from './screens/AttachScreen'
import VideoUploadScreen from './screens/VideoUploadScreen'



const Stack = createStackNavigator()

const screenOptions = {
    headerShown : false
}


export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
         initialRouteName = 'HomeScreen'
         screenOptions = {screenOptions}>
             <Stack.Screen name = 'HomeScreen' component = {HomeScreen}/>
             <Stack.Screen name = 'ChatScreen' component = {ChatScreen}/>
             <Stack.Screen name = 'AddNewChatScreen' component = {AddNewchatScreen}/>
             <Stack.Screen name = 'ImageUploadScreen' component = {ImageUploadScreen}/>
             <Stack.Screen name = 'UploadPdfScreen' component = {UploadPdfScreen}/>
             <Stack.Screen name = 'ViewPdfScreen' component = {ViewPdfScreen}/>
             <Stack.Screen name = 'AttachScreen' component = {AttachScreen}/>
             <Stack.Screen name = 'VideoUploadScreen' component = {VideoUploadScreen}/>
         </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator
         initialRouteName = 'LoginScreen'
         screenOptions = {screenOptions}>
             <Stack.Screen name = 'LoginScreen' component = {LoginScreen}/>
             <Stack.Screen name = 'SignUpScreen' component = {SignUpScreen}/>
         </Stack.Navigator>
    </NavigationContainer>
)

