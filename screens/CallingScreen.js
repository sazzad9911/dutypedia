import React, { useState, useEffect, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import IconButton from "../components/IconButton";
const { width, height } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
// import {
//   ScreenCapturePickerView,
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   registerGlobals,
// } from "react-native-webrtc";

export default function CallingScreen({ audio, user }) {
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videoOff, setVideoOff] = React.useState(false);
  const [audioOff, setAudioOff] = React.useState(false);

  //   const pc = useRef();
  //   const config = {
  //     iceServers: [
  //       {
  //         urls: "stun:stun.dutybazar.com:5349",
  //       },
  //       {
  //         urls: "turn:turn.dutybazar.com:5349",
  //         username: "duty",
  //         credential: "1229",
  //       },
  //     ],
  //     iceCandidatePoolSize: 10,
  //   };

  //   const startWebcam = async () => {
  //     pc.current = new RTCPeerConnection(config);
  //     const local = await mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     pc.current.addStream(local);
  //     setLocalStream(local);

  //     const remote = new MediaStream();
  //     setRemoteStream(remote);

  //     // Push tracks from local stream to peer connection
  //     local.getTracks().forEach((track) => {
  //       pc.current.getLocalStreams()[0].addTrack(track);
  //     });

  //     // Pull tracks from peer connection, add to remote video stream
  //     pc.current.ontrack = (event) => {
  //       event.streams[0].getTracks().forEach((track) => {
  //         remote.addTrack(track);
  //       });
  //     };

  //     pc.current.onaddstream = (event) => {
  //       setRemoteStream(event.stream);
  //     };
  //   };
  //   const startCall = async () => {
  //     const channelDoc = firestore().collection("channels").doc();
  //     const offerCandidates = channelDoc.collection("offerCandidates");
  //     const answerCandidates = channelDoc.collection("answerCandidates");

  //     setChannelId(channelDoc.id);

  //     pc.current.onicecandidate = async (event) => {
  //       if (event.candidate) {
  //         await offerCandidates.add(event.candidate.toJSON());
  //       }
  //     };

  //     //create offer
  //     const offerDescription = await pc.current.createOffer();
  //     await pc.current.setLocalDescription(offerDescription);

  //     const offer = {
  //       sdp: offerDescription.sdp,
  //       type: offerDescription.type,
  //     };

  //     await channelDoc.set({ offer });

  //     // Listen for remote answer
  //     channelDoc.onSnapshot((snapshot) => {
  //       const data = snapshot.data();
  //       if (!pc.current.currentRemoteDescription && data?.answer) {
  //         const answerDescription = new RTCSessionDescription(data.answer);
  //         pc.current.setRemoteDescription(answerDescription);
  //       }
  //     });

  //     // When answered, add candidate to peer connection
  //     answerCandidates.onSnapshot((snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type === "added") {
  //           const data = change.doc.data();
  //           pc.current.addIceCandidate(new RTCIceCandidate(data));
  //         }
  //       });
  //     });
  //   };
  //   const joinCall = async () => {
  //     const channelDoc = firestore().collection("channels").doc(channelId);
  //     const offerCandidates = channelDoc.collection("offerCandidates");
  //     const answerCandidates = channelDoc.collection("answerCandidates");

  //     pc.current.onicecandidate = async (event) => {
  //       if (event.candidate) {
  //         await answerCandidates.add(event.candidate.toJSON());
  //       }
  //     };

  //     const channelDocument = await channelDoc.get();
  //     const channelData = channelDocument.data();

  //     const offerDescription = channelData.offer;

  //     await pc.current.setRemoteDescription(
  //       new RTCSessionDescription(offerDescription)
  //     );

  //     const answerDescription = await pc.current.createAnswer();
  //     await pc.current.setLocalDescription(answerDescription);

  //     const answer = {
  //       type: answerDescription.type,
  //       sdp: answerDescription.sdp,
  //     };

  //     await channelDoc.update({ answer });

  //     offerCandidates.onSnapshot((snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type === "added") {
  //           const data = change.doc.data();
  //           pc.current.addIceCandidate(new RTCIceCandidate(data));
  //         }
  //       });
  //     });
  //   };
  if (audio) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            width: 80,
            height: 80,
          }}
          source={{ uri: user ? user.profilePhoto : null }}
        />
        <View
          style={{
            height: "50%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 10,
            }}
          >
            8:23
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "33%",
            justifyContent: "space-between",
            width:width
          }}
        >
         
          <IconButton
            onPress={() => {
              setAudioOff((val) => !val);
            }}
            style={[
              styles.button,
              {
                backgroundColor: "#008080",
              },
            ]}
            LeftIcon={() => (
              <FontAwesome
                name={audioOff ? "microphone-slash" : "microphone"}
                size={24}
                color="white"
              />
            )}
          />
          <IconButton
            style={[
              styles.button,
              {
                backgroundColor: "#FF0000",
              },
            ]}
            LeftIcon={() => <Zocial name="call" size={24} color="white" />}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Video
          ref={video}
          style={{
            width: width,
            height: height - 20,
          }}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          resizeMode="cover"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      {!videoOff && (
        <View style={styles.selfVideoContainer}>
          <Video
            ref={video}
            style={{
              width: 150,
              height: 250,
            }}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.427)",
          paddingVertical: 10,
          width: width,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              textAlign: "center",
            }}
          >
            8:23
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "20%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onPress={() => {
              setVideoOff((val) => !val);
            }}
            style={[
              styles.button,
              {
                backgroundColor: "#808000",
              },
            ]}
            LeftIcon={() => (
              <Feather
                name={videoOff ? "video-off" : "video"}
                size={24}
                color="white"
              />
            )}
          />
          <IconButton
            onPress={() => {
              setAudioOff((val) => !val);
            }}
            style={[
              styles.button,
              {
                backgroundColor: "#008080",
              },
            ]}
            LeftIcon={() => (
              <FontAwesome
                name={audioOff ? "microphone-slash" : "microphone"}
                size={24}
                color="white"
              />
            )}
          />
          <IconButton
            style={[
              styles.button,
              {
                backgroundColor: "#FF0000",
              },
            ]}
            LeftIcon={() => <Zocial name="call" size={24} color="white" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="position"
    >
      <SafeAreaView>
        {localStream && (
          <RTCView
            ref={pc}
            streamURL={localStream?.toURL()}
            style={{}}
            objectFit="cover"
            mirror
          />
        )}

        {remoteStream && (
          <RTCView
            streamURL={remoteStream?.toURL()}
            style={{}}
            objectFit="cover"
            mirror
          />
        )}
        <View style={{}}>
          {!webcamStarted && (
            <Button title="Start webcam" onPress={startWebcam} />
          )}
          {webcamStarted && <Button title="Start call" onPress={startCall} />}
          {webcamStarted && (
            <View style={{ flexDirection: "row" }}>
              <Button title="Join call" onPress={joinCall} />
              <TextInput
                value={channelId}
                placeholder="callId"
                minLength={45}
                style={{ borderWidth: 1, padding: 5 }}
                onChangeText={(newText) => setChannelId(newText)}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  selfVideoContainer: {
    width: 150,
    height: 200,
    overflow: "hidden",
    backgroundColor: "black",
    position: "absolute",
    bottom: 120,
    left: 0,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
