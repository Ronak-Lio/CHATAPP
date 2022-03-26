import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { StyleSheet, Text, TextInput, View, Image , StatusBar , SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { db, firebase } from "../firebase";
import { useSelector } from "react-redux";
import { selectUid, selectName } from "../slices/userSlice";
import { Alert } from "react-native";
import { Platform } from "react-native";

const AddNewchatScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const uid = useSelector(selectUid);
  const name = useSelector(selectName);

  const addNewChat = () => {
    db.collection("users")
      .where("name", "==", input)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty === false) {
          db.collection("users").doc(uid).collection("rooms").add({
            name: input,
          });

          db.collection("users")
            .where("name", "==",input)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log("object", doc?.id);
                db.collection("users").doc(doc.id).collection("rooms").add({
                  name: name,
                });
              });
            });
        }else{
            Alert.alert("Please re-enter username")
        }
        querySnapshot.forEach((doc) => {
          console.log("object", doc?.id);
        });
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 25,
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingVertical: 10,
          paddingBottom: 15,
          display: "flex",
          flexDirection: "row",
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
              height: 20,
              width: 20,
              marginRight: 20,
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
          }}
        >
          Add new chat
        </Text>
      </View>
      <View>
        <TextInput
          placeholderTextColor="#444"
          placeholder="Enter name of user"
          autoCapitalize="none"
          textContentType="username"
          value={input}
          onChangeText={setInput}
          style={{
            borderColor: "lightgray",
            borderWidth: 1,
            paddingHorizontal: 10,
            marginTop: 35,
            marginHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
          }}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={addNewChat}>
          <View
            style={{
              backgroundColor: "#4096F7",
              marginHorizontal: 15,
              marginTop: 15,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              Chat
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddNewchatScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
