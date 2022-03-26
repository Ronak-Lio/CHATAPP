import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectChatName, selectRoomId } from "../slices/chatSlice";
import { db, firebase } from "../firebase";
import { selectName, selectUid } from "../slices/userSlice";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/core";

const UploadPdfScreen = () => {
  const [pdf, setPdf] = useState(null);
  const chatName = useSelector(selectChatName);
  const [pdfName, setPdfName] = useState("");
  const roomId = useSelector(selectRoomId);
  const uid = useSelector(selectUid);
  const name = useSelector(selectName);
  const navigation = useNavigation();

  const selectPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync();
    setPdf(result?.uri);
    setPdfName(result?.name);
    console.log("URI is ", result);
  };

  async function uploadPdfAsync() {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", pdf, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuidv4());
    const result = await uploadBytes(fileRef, blob);

    console.log("Result is ", result);

    // We're done with the blob, close and release it

    const pdfUri = await getDownloadURL(fileRef);

    console.log("Download Uri is ", pdfUri);

    if (pdfUri) {
      db.collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          name: name,
          //   message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: "pdf",
          pdfUri: pdfUri,
          pdfName: pdfName,
        });

      db.collection("users")
        .where("name", "==", chatName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("object", doc?.id);

            db.collection("users")
              .doc(doc.id)
              .collection("rooms")
              .where("name", "==", name)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc1) => {
                  db.collection("users")
                    .doc(doc.id)
                    .collection("rooms")
                    .doc(doc1.id)
                    .collection("messages")
                    .add({
                      name: name,
                      //   message: input,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                      type: "pdf",
                      pdfUri: pdfUri,
                      pdfName: pdfName,
                    });
                });
              });
          });
        });

      navigation.navigate("ChatScreen");
    }
  }

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
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
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button onPress={selectPdf} title="SELECT PDF"></Button>
          </View>
        </View>

        {pdf && (
          <View
            style={{
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {pdfName}
            </Text>
          </View>
        )}
        {pdf && (
          <TouchableOpacity activeOpacity={0.5} onPress={uploadPdfAsync}>
            <View
              style={{
                marginTop: 20,
                backgroundColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 20,
                marginTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : 0,
              }}
            >
              <Text>Upload</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadPdfScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    paddingTop: StatusBar.currentHeight,
  },
});
