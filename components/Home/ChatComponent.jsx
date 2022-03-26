import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setChatName, setRoomId } from "../../slices/chatSlice";
import { selectUid } from "../../slices/userSlice";
import { db } from "../../firebase";

const ChatComponent = ({ name, id }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const uid = useSelector(selectUid);
  const [messages , setMessages] = useState([]);

  useEffect(() => {
    if (name && id && uid) {
      db.collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp" , "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [name , id , uid]);

  useEffect(() => {
     console.log(messages)
  } , [messages.length])

  const goToChatScreen = () => {
    navigation.navigate("ChatScreen");
    dispatch(setChatName(name));
    dispatch(setRoomId(id));
  };

  return (
    <TouchableOpacity onPress={goToChatScreen}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingVertical: 10,
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingLeft: 15,
        }}
      >
        <Avatar
          rounded
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLh5XlHTHdoofJEg3q3MPoHd7-eYYA1zWUA&usqp=CAU",
          }}
          size={50}
        />
        <View
          style={{
            marginLeft: 30,
          }}
        >
          <Text style={{ marginBottom: 5 }}>{name}</Text>
          <Text>{messages[0]?.data?.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({});
