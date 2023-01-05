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
  Alert,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import IconButton from "../components/IconButton";
const { width, height } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
//import { getStream } from "../Utils";
import { useSelector } from "react-redux";
import Peer from "react-native-peerjs";
import { socket } from "../Class/socket";
// import { RTCPeerConnection, RTCView, mediaDevices,
//   RTCIceCandidate,RTCSessionDescription } from "react-native-webrtc";
import { getUserInfo } from "../Class/member";
import ActivityLoader from "../components/ActivityLoader";
//import VideoCallingScreen from "./VideoCallingScreen";
import { url } from "../action";

export default function CallingScreen({ audio, user, setVisible }) {
  return null;
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [cachedRemotePC, setCachedRemotePC] = React.useState();
  const [status, setStatus] = React.useState({});
  const [videoOff, setVideoOff] = React.useState(false);
  const [audioOff, setAudioOff] = React.useState(false);
  const [remoteCandidates, setRemoteCandidates] = React.useState([]);
  const [peerConnection, setPeerConnection] = React.useState();
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
  function handleRemoteCandidate(iceCandidate, peerConnection) {
    iceCandidate = new RTCIceCandidate(iceCandidate);

    if (peerConnection.remoteDescription == null) {
      return remoteCandidates.push(iceCandidate);
    }

    return peerConnection.addIceCandidate(iceCandidate);
  }

  function processCandidates() {
    if (remoteCandidates.length < 1) {
      return;
    }

    remoteCandidates.map((candidate) =>
      peerConnection.addIceCandidate(candidate)
    );
    remoteCandidates = [];
  }

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    let cameraCount = 0;

    try {
      const devices = await mediaDevices.enumerateDevices();

      devices.map((device) => {
        if (device.kind != "videoinput") {
          return;
        }

        cameraCount = cameraCount + 1;
      });
    } catch (err) {
      // Handle Error
    }
    let mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: "user",
      },
    };
    let localMediaStream;
    let isVoiceOnly = false;

    try {
      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

      if (isVoiceOnly) {
        let videoTrack = await mediaStream.getVideoTracks()[0];
        videoTrack.enabled = false;
      }

      localMediaStream = mediaStream;
      setLocalStream(localMediaStream);
    } catch (err) {
      // Handle Error
    }
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
    let peerConnection = new RTCPeerConnection(configuration);

    peerConnection.addEventListener("connectionstatechange", (event) => {
      switch (peerConnection.connectionState) {
        case "closed":
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.addEventListener("icecandidate", (event) => {
      // When you find a null candidate then there are no more candidates.
      // Gathering of candidates has finished.
      if (!event.candidate) {
        return;
      }
      handleRemoteCandidate(event.candidate, peerConnection);
      // Send the event.candidate onto the person you're calling.
      // Keeping to Trickle ICE Standards, you should send the candidates immediately.
    });

    peerConnection.addEventListener("icecandidateerror", (event) => {
      // You can ignore some candidate errors.
      // Connections can still be made even when errors occur.
      console.warn(event);
    });

    peerConnection.addEventListener("iceconnectionstatechange", (event) => {
      switch (peerConnection.iceConnectionState) {
        case "connected":
          handleRemoteCandidate(event.candidate, peerConnection);
        case "completed":
          handleRemoteCandidate(event.candidate, peerConnection);
          // You can handle the call being connected here.
          // Like setting the video streams to visible.

          break;
      }
    });

    peerConnection.addEventListener("negotiationneeded", (event) => {
      // You can start the offer stages here.
      // Be careful as this event can be called multiple times.
    });

    peerConnection.addEventListener("signalingstatechange", (event) => {
      switch (peerConnection.signalingState) {
        case "closed":
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.addEventListener("addstream", (event) => {
      // Grab the remote stream from the connected participant.
      setRemoteStream(event.stream);
    });

    // Add our stream to the peer connection.
    localStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localStream));
    //peerConnection.addStream(localStream);
    setPeerConnection(peerConnection);
    let sessionConstraints = {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: true,
      },
    };

    try {
      const offerDescription = await peerConnection.createOffer(
        sessionConstraints
      );
      await peerConnection.setLocalDescription(offerDescription);

      // Send the offerDescription to the other participant.
    } catch (err) {
      // Handle Errors
    }
    try {
      // Use the received offerDescription
      const offerDescription = new RTCSessionDescription(offerDescription);
      await peerConnection.setRemoteDescription(offerDescription);

      const answerDescription = await peerConnection.createAnswer(
        sessionConstraints
      );
      await peerConnection.setLocalDescription(answerDescription);

      // Here is a good place to process candidates.
      processCandidates();

      // Send the answerDescription back as a response to the offerDescription.
    } catch (err) {
      // Handle Errors
    }
    try {
      // Use the received answerDescription
      const answerDescription = new RTCSessionDescription(answerDescription);
      await peerConnection.setRemoteDescription(answerDescription);
    } catch (err) {
      // Handle Error
    }

    //setCachedLocalPC(localPC);
    //setCachedRemotePC(remotePC);
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
      cachedLocalPC._unregisterEvents();
      cachedLocalPC.close();
    }
    if (cachedRemotePC) {
      cachedRemotePC._unregisterEvents();
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
    //console.log(remoteStream)
    (async () => {
      await startLocalStream();
      // await startCall()
    })();
  }, []);
  React.useEffect(() => {
    if (localStream) {
      startCall();
    }
  }, [localStream]);
  React.useEffect(() => {
    if (localStream) {
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
      socket?.on("callAccepted", (data) => {
        startCall();
      });
    }
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
      <View
        style={{
          backgroundColor: "black",
        }}
      >
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
