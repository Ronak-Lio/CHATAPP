import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import ChatComponent from "../components/Home/ChatComponent";
import { useNavigation } from "@react-navigation/core";
import  {db , firebase} from "../firebase";
import { useSelector } from "react-redux";
import { selectUid, selectName , selectEmail} from "../slices/userSlice";
import { Platform } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const uid = useSelector(selectUid);
  const name = useSelector(selectName);
  const[rooms , setRooms] = useState([]);
  const email = useSelector(selectEmail);

  useEffect(() => {
    if (uid) {
      db.collection("users")
        .doc(uid)
        .collection("rooms")
        .onSnapshot((snapshot) =>
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );

        console.log(name);

        // console.log(email)
        
    }
  }, [uid , name]);
  

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      console.log("Signed Out Successfully!");
    } catch (error) {
      console.log(error)
    }
  } 
  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          backgroundColor: "#6EACFA",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          paddingHorizontal: 10,
          marginTop : Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection : "row",
            justifyContent : "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "black",
            }}
          >
            CHATAPP
          </Text>
          <TouchableOpacity onPress = {logout}>
              <View style = {{
                     backgroundColor : "white",
                     paddingHorizontal : 10,
                     paddingVertical : 5,
                     borderRadius : 20
              }}>
                  <Text style = {{
                      color: "black",
                  }}>{name}</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView vertical showsVericalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.push("AddNewChatScreen")}>
          <View
            style={{
              paddingVertical: 10,
              borderBottomColor: "lightgray",
              borderBottomWidth: 1,
              paddingLeft: 25,
            }}
          >
            <Text>Add new chat</Text>
          </View>
        </TouchableOpacity>
        {/* <ChatComponent />
        <ChatComponent />
        <ChatComponent />
        <ChatComponent /> */}
        {rooms.map((room) => (
          <ChatComponent name = {room.data.name} id = {room.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
