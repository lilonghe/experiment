<script setup>
import { ref, onMounted } from 'vue';
import io from "socket.io-client";

const PC_CONFIG = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = "http://localhost:8080";


const isConnectedVideo = ref(false);
const videoStream = ref();
const videoElement = ref();
const connectLoading = ref(false);

const remoteVideoElement = ref();

const socketInfo = ref();
const peerConnection = ref();

const connectVideo = async () => {
  if (connectLoading.value) return;

  connectLoading.value = true;
  navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(stream => {
    isConnectedVideo.value = true;
    videoElement.value.srcObject = stream;
    videoElement.value.onloadedmetadata = () => {
      videoElement.value.play();
    };

    videoStream.value = stream;

    // webrtc
    stream.getTracks().forEach(track => {
        peerConnection.value.addTrack(track, stream);
    });
    peerConnection.value.onicecandidate = (e) => {
        if (e.candidate) {
            console.log("onicecandidate");
            socketInfo.value.emit("candidate", e.candidate);
        }
    };
    peerConnection.value.ontrack = (ev) => {
        console.log("add remotetrack success");
        if (remoteVideoElement.value) {
          remoteVideoElement.value.srcObject = ev.streams[0];
        }
    };
    socketInfo.value.emit("join_room", {
        room: "1234",
    });
  }).catch(err => {
    alert(err.name + ': ' + err.message);
  }).finally(() => {
    connectLoading.value = false;
  });
}

const disconnectedVideo = () => {
  if (connectLoading.value) return;

  videoStream.value.getTracks().forEach(track => {
    track.stop();
  });
  isConnectedVideo.value = false;
}

const createOffer = async () => {
    console.log("create offer");
    if (!(peerConnection.value && socketInfo.value)) return;
    try {
      const sdp = await peerConnection.value.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnection.value.setLocalDescription(new RTCSessionDescription(sdp));
      socketInfo.value.emit("offer", sdp);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp) => {
    if (!(peerConnection.value && socketInfo.value)) return;
    try {
      await peerConnection.value.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("answer set remote description success");
      const mySdp = await peerConnection.value.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      console.log("create answer");
      await peerConnection.value.setLocalDescription(new RTCSessionDescription(mySdp));
      socketInfo.value.emit("answer", mySdp);
    } catch (e) {
      console.error(e);
    }
  };

onMounted(() => {
    socketInfo.value = io.connect(SOCKET_SERVER_URL);
    peerConnection.value = new RTCPeerConnection(PC_CONFIG);

    socketInfo.value.on("all_users", allUsers => {
        if (allUsers.length > 0) {
            createOffer();
        }
    });

    socketInfo.value.on("getOffer", sdp => {
        console.log("get offer");
        createAnswer(sdp);
    });

    socketInfo.value.on("getAnswer", sdp => {
        peerConnection.value.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socketInfo.value.on("getCandidate", async candidate => {
        await peerConnection.value.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("candidate add success");
    });

    socketInfo.value.on("room_full", () => {
        console.log('room full')
    })

    connectVideo();
})
</script>

<template>
  <!-- <div class="actions">
    <button :disabled="connectLoading" v-if="!isConnectedVideo" @click="connectVideo">Connect</button>
    <button :disabled="connectLoading" v-if="isConnectedVideo" @click="disconnectedVideo">Stop</button>
    <span v-if="connectLoading" class="connectLoading">Loading</span>
  </div> -->
  <div>
    <video ref="videoElement" autoplay></video>
    <video ref="remoteVideoElement" autoplay></video>
  </div>
</template>

<style scoped>
.actions {
  text-align: left;
}
video {
  width: 500px;
  height: 300px;
  margin-top: 10px;
  background: black;
  margin-right: 10px;
}

.connectLoading {
  margin-left: 10px;
}
</style>
