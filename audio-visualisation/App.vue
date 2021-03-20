<template>
  <button 
    @click="toggleAction"
    v-text="(audio?`Stop`:'Start')+' Record'" />

  <Analyser v-if="audio" :audio="audio"/>
</template>

<script setup>
import Analyser from './components/Analyser.vue';
  import { ref, reactive } from 'vue';
  const audio = ref(null);
  const toggleAction = () => {
    if (audio.value) {
      stop();
    } else {
      start();
    }
  }
  const start = async () => {
    let a = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    audio.value = a;
  }

  const stop = async () => {
    audio.value.getTracks().forEach(track => track.stop());
    audio.value = null;
  }
</script>
  

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>