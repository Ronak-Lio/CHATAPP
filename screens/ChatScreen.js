import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from "react-native";
import { LeftOutlined } from "@ant-design/icons";
import { Avatar } from "react-native-elements";
import Message from "../components/Chat/Message";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { selectChatName, selectRoomId } from "../slices/chatSlice";
import { db, firebase } from "../firebase";
import { selectName, selectUid } from "../slices/userSlice";
import { Platform } from "react-native";

const ChatScreen = () => {
  const navigation = useNavigation();
  const chatName = useSelector(selectChatName);
  const roomId = useSelector(selectRoomId);
  const uid = useSelector(selectUid);
  const [input, setInput] = useState();
  const name = useSelector(selectName);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("ChatName is ", chatName);
    if (roomId) {
      db.collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp" , "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [chatName, roomId]);

  useEffect(() => {
      
  } , [messages.length])

  const sendMessage = () => {
    console.log("Name is ", name);
    console.log("Message is ", input);
    // if (input !== "") {
    //   db.collection("users")
    //     .doc(uid)
    //     .collection("rooms")
    //     .doc(roomId)
    //     .collection("messages")
    //     .add({
    //       name: name,
    //       message: input,
    //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //       type: "text",
    //     });

    //   db.collection("users")
    //     .where("name", "==", chatName)
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         console.log("object", doc?.id);

    //         db.collection("users")
    //           .doc(doc.id)
    //           .collection("rooms")
    //           .where("name", "==", name)
    //           .get()
    //           .then((querySnapshot) => {
    //             querySnapshot.forEach((doc1) => {
    //               db.collection("users")
    //                 .doc(doc.id)
    //                 .collection("rooms")
    //                 .doc(doc1.id)
    //                 .collection("messages")
    //                 .add({
    //                   name: name,
    //                   message: input,
    //                   timestamp:
    //                     firebase.firestore.FieldValue.serverTimestamp(),
    //                   type: "text",
    //                 });
    //             });
    //           });
    //       });
    //     });
    //   setInput("");
    // }
    navigation.navigate("ImageUploadScreen")
  };

  

  return (
    <View style={styles.screen}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 25,
          paddingLeft: 5,
          backgroundColor: "white",
          paddingVertical: 10,
          alignItems: "center",
          marginTop : Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
        >
          <Image
            source={{
              uri: "https://cdn1.iconfinder.com/data/icons/basic-mobile-ios-android/24/Chevron-Left-512.png",
            }}
            style={{
              height: Platform.OS === "ios" ? 25 : 0,
              width: Platform.OS === "ios" ? 25 : 0,
              marginRight: 1,
            }}
          />
        </TouchableOpacity>
        <Avatar
          rounded
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLh5XlHTHdoofJEg3q3MPoHd7-eYYA1zWUA&usqp=CAU",
          }}
          size={40}
        />
        <View
          style={{
            marginLeft: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {chatName}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#4B8CEB",
          flex: 1,
        }}
      >
    <ScrollView vertical showsVericalScrollIndicator = {false}>
    {messages.map((message) => (
           <Message message = {message.data}/>
       ))}
    </ScrollView>
      </View>
      <View
        style={{
          borderTopColor: "gray",
          borderTopWidth: 1,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#E8E6E4",
        }}
      >
       <TouchableOpacity activeOpacity = {0.3} onPress={() => navigation.navigate("AttachScreen")}>
       <Image
         source = {{
           uri : "https://cdn-icons-png.flaticon.com/512/385/385487.png"
         }}
         style={{
          height: 24,
          width: 24,
          marginLeft: 5,
          marginRight: 5,
          marginTop: "auto",
          marginBottom: "auto",
        }}
        />
       </TouchableOpacity>
        <TextInput
          placeholderTextColor="#444"
          placeholder="Type a message"
          autoCapitalize="none"
          autoFocus={true}
          value={input}
          onChangeText={setInput}
          style={{
            height: 60,
            paddingLeft: 15,
            flex: 1,
          }}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
          <Image
            source={{
              uri: "https://static.thenounproject.com/png/383448-200.png",
            }}
            style={{
              height: 30,
              width: 30,
              marginRight: 5,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
  },
});
