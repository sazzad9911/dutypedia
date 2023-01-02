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
import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";
import { getStream } from "../Utils";
import { useSelector } from "react-redux";
import Peer from "react-native-peerjs";
import { socket } from "../Class/socket";

export default function CallingScreen({ audio, user }) {
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videoOff, setVideoOff] = React.useState(false);
  const [audioOff, setAudioOff] = React.useState(false);
  const newUser = useSelector((state) => state.user);
  //const peerConnection=;
  //const localMediaStream=;

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:stun.dutybazar.com:5349",
          },
          {
            urls: "turn:turn.dutybazar.com:5349",
            username: "duty",
            credential: "1229",
          },
        ],
      },
    });

    peer.on("signal", (signal) => {
      socket?.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:stun.dutybazar.com:5349",
          },
          {
            urls: "turn:turn.dutybazar.com:5349",
            username: "duty",
            credential: "1229",
          },
        ],
      },
    });

    peer.on("signal", (signal) => {
      socket?.emit("returning signal", { signal, callerID });
    });
    console.log(incomingSignal)

    peer.signal(incomingSignal);

    return peer;
  }
  var peerConstraints = {
    iceServers: [
      {
        urls: "stun:stun.dutybazar.com:5349",
      },
      {
        urls: "turn:turn.dutybazar.com:5349",
        username: "duty",
        credential: "1229",
      },
    ],
    iceTransportPolicy: "all",
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require",
  };

  useEffect(() => {
    (async () => {
      let stream = await getStream();
      setLocalStream(stream);
      let peerConnection = new RTCPeerConnection( peerConstraints );
      //createPeer();
      //addPeer()
    })();
  }, []);

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
            width: width,
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
      <RTCPeerConnection />
      <MediaStream />
      <View>
        {remoteStream && (
          <RTCView
            style={{
              width: width,
              height: height - 20,
            }}
            resizeMode="cover"
            streamURL={remoteStream.toURL()}
          />
        )}
      </View>
      {!videoOff && (
        <View style={styles.selfVideoContainer}>
          {localStream && (
            <RTCView
              style={{
                width: 150,
                height: 250,
              }}
              streamURL={localStream.toURL()}
              resizeMode="cover"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          )}
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
