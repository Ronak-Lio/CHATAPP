import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const AttachScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style = {{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width : "100%", 
            
        }}>
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
         <View style={{
              width : "100%",
              alignItems: "center"
         }}>
         <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("ImageUploadScreen")}
          >
            <View
              style={{
                backgroundColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 20,
                marginBottom: 15,
                width: 140,
                width : "100%",
              }}
            >
              <Text>Attach an Image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("VideoUploadScreen")}
        >
          <View
            style={{
              backgroundColor: "lightgray",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 20,
              marginBottom: 15,
              width: 140,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Attach a Video
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("UploadPdfScreen")}
        >
          <View
            style={{
              backgroundColor: "lightgray",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 20,
              marginBottom: 15,
              width: 140,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Attach a Pdf
            </Text>
          </View>
        </TouchableOpacity>
         </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AttachScreen;

const styles = StyleSheet.create({});
