import * as React from "react";
import { StyleSheet, Text, View, Image , Button } from "react-native";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/core";
import { setPdfUri } from "../../slices/chatSlice";
import { useDispatch } from "react-redux";
import { Video, AVPlaybackStatus } from "expo-av";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const openPdfLink = () => {
    dispatch(setPdfUri(message?.pdfUri));
    navigation.navigate("ViewPdfScreen");
  };

  return (
    <View
      style={{
        marginTop: 8,
        marginRight: 10,
        marginLeft: "auto",
        marginBottom: message?.type === "video"? 20 : 8,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          fontSize: 12,
          marginLeft: 2,
        }}
      >
        {message?.name}
      </Text>
      <View
        style={{
          backgroundColor: "white",
          marginRight: 5,
          padding: 10,
          marginLeft: "auto",
          borderRadius: 10,
        }}
      >
        {message?.imageUri && (
          <Image
            source={{ uri: message?.imageUri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        {message?.type === "text" && <Text>{message?.message}</Text>}

        {message?.type === "pdf" && (
          <TouchableOpacity onPress={openPdfLink}>
            <Text>{message?.pdfName}</Text>
          </TouchableOpacity>
        )}

        {
            message?.type === "video" && (
                <View style={styles.container}>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: message?.videoUri,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                {/* <View style={styles.buttons}>
                  <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                      status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                  />
                </View> */}
              </View>
            )
        }
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginBottom : 0
      },
      video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
});
