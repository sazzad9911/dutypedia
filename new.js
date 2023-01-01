const CallRoot = ({ roomID }) => {
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [peers, setPeers] = useState([]);
    const myVideo = useRef();
    const userVideo = useRef();
    const [myStream, setMyStream] = useState(null);
    const peersRef = useRef([]);
    const [audioInputDevices, setAudioInputDevices] = useState([]);
    const [selectedAudioInputDevices, setSelectedAudioInputDevices] =
      useState("");
    const [audioOutputDevices, setAudioOutputDevices] = useState([]);
    const [videoInputDevices, setVideoInputDevices] = useState([]);
    const [selectedVideoInputDevices, setSelectedVideoInputDevices] =
      useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [hideIcon, setHideIcon] = useState(false);
    const {
      hideCam,
      setHideCam,
      micOff,
      audioOnlyCall,
      setMicOff,
      endCall,
      setStreams,
    } = useContext(CallContext);
  
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
  
      peer.signal(incomingSignal);
  
      return peer;
    }
  
    const hideCamFn = () => {
      const videoTrack = myStream
        .getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = false;
      }
    };
  
    const showCamFn = () => {
      const videoTrack = myStream
        .getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = true;
      }
    };
  
    const micOffFn = () => {
      const audioTrack = myStream
        .getTracks()
        .find((track) => track.kind === "audio");
      audioTrack.enabled = false;
    };
    const micOnFn = () => {
      const audioTrack = myStream
        .getTracks()
        .find((track) => track.kind === "audio");
      audioTrack.enabled = true;
    };
  
    const attachSinkId = (element, sinkId) => {
      if (typeof element.sinkId !== "undefined") {
        element
          .setSinkId(sinkId)
          .then(() => {
            console.log(`Success, audio output device attached: ${sinkId}`);
          })
          .catch((error) => {
            let errorMessage = error;
            if (error.name === "SecurityError") {
              errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
            }
            console.error(errorMessage);
            // Jump back to first output device in the list as it's the default.
            //   audioOutputSelect.selectedIndex = 0;
          });
      } else {
        console.warn("Browser does not support output device selection.");
      }
    };
  
    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({ video: audioOnlyCall ? false : true, audio: true })
        .then((stream) => {
          setStreams((prevStrems) => [...prevStrems, stream]);
          setMyStream(stream);
          socket?.emit("join room", roomID);
          socket?.on("all users", (users) => {
            const peers = [];
            users.forEach((userID) => {
              const peer = createPeer(userID, socket?.id, stream);
              peersRef.current.push({
                peerID: userID,
                peer,
              });
              peers.push(peer);
            });
            setPeers(peers);
          });
  
          navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              setAudioInputDevices(
                devices.filter((device) => device.kind === "audioinput")
              );
              setAudioOutputDevices(
                devices.filter((device) => device.kind === "audiooutput")
              );
              setVideoInputDevices(
                devices.filter((device) => device.kind === "videoinput")
              );
            })
            .catch((error) => {
              console.log(error);
            });
  
          socket?.on("user joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
  
            setPeers((users) => [...users, peer]);
          });
  
          socket?.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            item.peer.signal(payload.signal);
          });
        });
  
      //Destroy peers
      return () => {
        peers.forEach((peer) => {
          peer.destroy();
        });
        if (myStream) {
          myStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      };
    }, []);
  
    useEffect(() => {
      if (myStream) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              deviceId: selectedVideoInputDevices
                ? { exact: selectedVideoInputDevices }
                : undefined,
            },
            audio: {
              deviceId: selectedAudioInputDevices
                ? { exact: selectedAudioInputDevices }
                : undefined,
            },
          })
          .then((stream) => {
            setStreams((prevStrems) => [...prevStrems, stream]);
  
            if (myStream) {
              const currentVideoTracks = myStream.getVideoTracks();
              const currentAudioTracks = myStream.getAudioTracks();
  
              myStream.removeTrack(currentVideoTracks[0]);
              myStream.addTrack(stream.getVideoTracks()[0]);
              myStream.removeTrack(currentAudioTracks[0]);
              myStream.addTrack(stream.getAudioTracks()[0]);
  
              peers.forEach((peer) => {
                peer.replaceTrack(
                  currentVideoTracks[0],
                  stream.getVideoTracks()[0],
                  myStream
                );
                console.log(peer);
                peer.replaceTrack(
                  currentAudioTracks[0],
                  stream.getAudioTracks()[0],
                  myStream
                );
              });
              // setMyStream(stream);
            }
          });
      }
    }, [selectedAudioInputDevices, selectedVideoInputDevices]);
  
    useEffect(() => {
      if (myStream) {
        myVideo.current.srcObject = myStream;
      }
    }, [myStream]);
  
    useEffect(() => {
      if (myStream) {
        if (hideCam) {
          hideCamFn();
        } else {
          showCamFn();
        }
      }
    }, [hideCam, myStream]);
  
    useEffect(() => {
      if (myStream) {
        if (micOff) {
          micOffFn();
        } else {
          micOnFn();
        }
      }
    }, [micOff, myStream]);
  
    useEffect(() => {
      const show = () => {
        setHideIcon(false);
      };
      window.addEventListener("mousemove", show);
      let timeOut = null;
      if (!hideIcon) {
        timeOut = setTimeout(() => {
          setHideIcon(true);
        }, 10000);
      }
      return () => {
        if (timeOut) {
          clearTimeout(timeOut);
        }
        window.removeEventListener("mousemove", show);
      };
    }, [hideIcon]);
  
    return (
      <div className="bg-black w-full h-full fixed inset-0 z-[999]">
        <video
          className="absolute z-10 right-4 top-4 h-36"
          muted
          ref={myVideo}
          autoPlay
          playsInline
        />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} userVideoRef={userVideo} />;
        })}
        <div
          className={`flex gap-4 items-end justify-center absolute z-10 bottom-16 left-1/2 -translate-x-1/2 ${
            hideIcon && "hidden"
          }`}
        >
          <button
            onClick={endCall}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-red-500 text-xl"
          >
            <MdCallEnd />
          </button>
          {!audioOnlyCall && (
            <button
              onClick={() => setHideCam(!hideCam)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl ${
                hideCam ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {hideCam ? <MdVideocamOff /> : <MdVideocam />}
            </button>
          )}
          <button
            onClick={() => setMicOff(!micOff)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl ${
              micOff ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {micOff ? <BsFillMicMuteFill /> : <BsFillMicFill />}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-white text-xl"
          >
            <HiCog />
          </button>
        </div>
        {showSettings && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white p-6 rounded-xl z-10">
            <button
              onClick={() => setShowSettings(false)}
              className="text-red-500 text-xl absolute right-4 top-4"
            >
              <IoMdCloseCircle />
            </button>
            <div className="grid gap-2">
              <p>Audio input source</p>
              <select
                value={selectedAudioInputDevices}
                onChange={(e) => setSelectedAudioInputDevices(e.target.value)}
                className="select select-bordered w-full rounded-none"
              >
                {audioInputDevices.map((device, index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label || `Microphone ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 mt-4">
              <p>Audio output destination</p>
              <select
                onChange={(e) => attachSinkId(userVideo.current, e.target.value)}
                className="select select-bordered w-full rounded-none"
              >
                {audioOutputDevices.map((device, index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label || `Speaker ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
            {!audioOnlyCall && (
              <div className="grid gap-2 mt-4">
                <p>Video source</p>
                <select
                  value={selectedVideoInputDevices}
                  onChange={(e) => setSelectedVideoInputDevices(e.target.value)}
                  className="select select-bordered w-full rounded-none"
                >
                  {videoInputDevices.map((device, index) => (
                    <option key={index} value={device.deviceId}>
                      {device.label || `Camera ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default CallRoot;