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
import { getStream } from "../Utils";
import { useSelector } from "react-redux";
import Peer from "react-native-peerjs";
import { socket } from "../Class/socket";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
import { getUserInfo } from "../Class/member";
import ActivityLoader from "../components/ActivityLoader";

export default function CallingScreen({ audio, user, setVisible }) {
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [cachedRemotePC, setCachedRemotePC] = React.useState();
  const [status, setStatus] = React.useState({});
  const [videoOff, setVideoOff] = React.useState(false);
  const [audioOff, setAudioOff] = React.useState(false);
  const newUser = useSelector((state) => state.user);
  //const peerConnection=;//
  //const localMediaStream=;//
  const [isMuted, setIsMuted] = React.useState(false);
  const [UserData, setUserData] = React.useState();
  React.useEffect(() => {
    getUserInfo(newUser.token, user).then((res) => {
      setUserData(res.data.user);
    });
  }, []);

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? "front" : "environment";
    const videoSourceId = devices.find(
      (device) => device.kind === "videoinput" && device.facing === facing
    );
    const facingMode = isFront ? "user" : "environment";
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async () => {
    // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
    const configuration = {
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
    };
    const localPC = new RTCPeerConnection(configuration);
    const remotePC = new RTCPeerConnection(configuration);

    // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
    localPC.onicecandidate = (e) => {
      try {
        console.log("localPC icecandidate:", e.candidate);
        if (e.candidate) {
          remotePC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
      }
    };
    remotePC.onicecandidate = (e) => {
      try {
        console.log("remotePC icecandidate:", e.candidate);
        if (e.candidate) {
          localPC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding localPC iceCandidate: ${err}`);
      }
    };
    remotePC.onaddstream = (e) => {
      console.log("remotePC tracking with ", e);
      if (e.stream && remoteStream !== e.stream) {
        console.log("RemotePC received the stream", e.stream);
        setRemoteStream(e.stream);
      }
    };

    // AddTrack not supported yet, so have to use old school addStream instead
    localStream
      .getTracks()
      .forEach((track) => localPC.addTrack(track, localStream));
    //localPC.addStream(localStream);
    try {
      const offer = await localPC.createOffer();
      console.log("Offer from localPC, setLocalDescription");
      await localPC.setLocalDescription(offer);
      console.log("remotePC, setRemoteDescription");
      await remotePC.setRemoteDescription(localPC.localDescription);
      console.log("RemotePC, createAnswer");
      const answer = await remotePC.createAnswer();
      console.log(`Answer from remotePC: ${answer.sdp}`);
      console.log("remotePC, setLocalDescription");
      await remotePC.setLocalDescription(answer);
      console.log("localPC, setRemoteDescription");
      await localPC.setRemoteDescription(remotePC.localDescription);
    } catch (err) {
      console.error(err);
    }
    setCachedLocalPC(localPC);
    setCachedRemotePC(remotePC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) return;
    localStream.getAudioTracks().forEach((track) => {
      console.log(track.enabled ? "muting" : "unmuting", " local track", track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const closeStreams = () => {
    if (localStream) {
      localStream.getTracks().map((track) => track.stop());
    }
    if (cachedLocalPC) {
      //cachedLocalPC._unregisterEvents();
      cachedLocalPC.close();
    }
    if (cachedRemotePC) {
      //cachedRemotePC._unregisterEvents();
      cachedRemotePC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedRemotePC();
    setCachedLocalPC();
    return;
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    if (cachedRemotePC) {
      cachedRemotePC.removeStream(remoteStream);
      cachedRemotePC.close();
    }
  };
  const endCall = () => {
    if (setVisible) {
      setVisible();
    }
    socket?.emit("endCall", user);
    closeStreams();
  };
  React.useEffect(() => {
    (async () => {
      await startLocalStream();
      // await startCall()
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      //await startLocalStream();
      if (localStream) {
        await startCall();
      }
    })();
  }, [localStream]);
  React.useEffect(() => {
    socket?.on("callEnded", (data) => {
      if (setVisible) {
        setVisible();
      }
      closeStreams();
    });
    socket?.on("callRejected", (data) => {
      if (setVisible) {
        setVisible();
      }
      closeStreams();
    });
  }, []);
  if (!UserData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }

  if (audio) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {remoteStream && (
          <RTCView
            style={{
              width: 0,
              height: 0,
            }}
            resizeMode="cover"
            streamURL={remoteStream.toURL()}
          />
        )}
        {localStream && (
          <RTCView
            style={{
              width: 0,
              height: 0,
            }}
            streamURL={localStream.toURL()}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
        <Avatar
          style={{
            width: 80,
            height: 80,
          }}
          source={{ uri: UserData ? UserData.profilePhoto : null }}
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
              toggleMute();
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
            onPress={() => {
              endCall();
            }}
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
      <View style={{}}>
        {remoteStream && (
          <RTCView
            style={{
              width: width,
              height: height - 20,
              backgroundColor: "black",
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
              switchCamera();
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
              toggleMute();
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
            onPress={() => {
              endCall();
            }}
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
