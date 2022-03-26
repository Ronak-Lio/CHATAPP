import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectChatName, selectRoomId } from "../slices/chatSlice";
import { db, firebase } from "../firebase";
import { selectName, selectUid } from "../slices/userSlice";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/core";
import { Video, AVPlaybackStatus } from "expo-av";


export default function VideoUploadScreen() {
  const [uploadVideo, setUploadVideo] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const chatName = useSelector(selectChatName);
  const roomId = useSelector(selectRoomId);
  const uid = useSelector(selectUid);
  const name = useSelector(selectName);
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setUploadResult(result);

    if (!result.cancelled){
      if(result.type === "video"){
        setUploadVideo(result?.uri);
      }else{
        Alert.alert("Please re-select video") 
      }
    }
  };

  async function uploadVideoAsync() {
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
      xhr.open("GET", uploadVideo, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), "ronak1234");
    const result = await uploadBytes(fileRef, blob);

    console.log(result);

    console.log("UploadResult is ", uploadResult);

    // We're done with the blob, close and release it
    if (uploadResult?.type === "video") {
      const videoUri = await getDownloadURL(fileRef);

      console.log("Download Uri is ", videoUri);

      if (videoUri) {
        db.collection("users")
          .doc(uid)
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add({
            name: name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            type: "video",
            videoUri: videoUri,
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
                        timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
                        type: "video",
                        videoUri: videoUri,
                      });
                  });
                });
            });
          });

        navigation.navigate("ChatScreen");
      }
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ flex: 1, paddingTop: 50, alignItems: "center" }}>
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
            <Button title="Pick a Video" onPress={pickVideo} />
          </View>
        </View>
        {uploadVideo && (
          <View style={styles.container}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: uploadVideo,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
        )}
        {uploadVideo && (
          <TouchableOpacity activeOpacity={0.5} onPress = {uploadVideoAsync}>
            <View
              style={{
                marginTop: 0,
                backgroundColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 35,
                borderRadius: 20,
              }}
            >
              <Text>Send</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop : 40,
    marginBottom : 40
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  }
});
