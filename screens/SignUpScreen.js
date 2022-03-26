import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import SignUpForm from '../components/SignUpForm';

const SignUpScreen = () => {
    return (
        <View style = {styles.screen}>
            <View style={styles.container}>
                <View>
                    <Text style = {{
                        textAlign : 'center',
                        fontWeight : 'bold',
                        fontSize : 20
                    }}>
                        CHATAPP
                    </Text>
                </View>

                <SignUpForm/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
      backgroundColor: "white",
      flex: 1,
    },
    container: {
      display : "flex",
      justifyContent: "center",
      flex: 1,
      paddingHorizontal: 12,
    //   backgroundColor: "#5A9AFA",
    },
  });

export default SignUpScreen

