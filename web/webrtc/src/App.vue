<script setup>
import { ref } from 'vue';

const isConnectedVideo = ref(false);
const videoStream = ref();
const videoElement = ref();
const connectLoading = ref(false);

const connectVideo = async () => {
  if (connectLoading.value) return;

  connectLoading.value = true;
  navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
    isConnectedVideo.value = true;
    videoElement.value.srcObject = stream;
    videoElement.value.onloadedmetadata = () => {
      videoElement.value.play();
    };

    videoStream.value = stream;
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
</script>

<template>
  <div class="actions">
    <button :disabled="connectLoading" v-if="!isConnectedVideo" @click="connectVideo">Connect</button>
    <button :disabled="connectLoading" v-if="isConnectedVideo" @click="disconnectedVideo">Stop</button>
    <span v-if="connectLoading" class="connectLoading">Loading</span>
  </div>
  <div>
    <video ref="videoElement"></video>
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
}

.connectLoading {
  margin-left: 10px;
}
</style>
