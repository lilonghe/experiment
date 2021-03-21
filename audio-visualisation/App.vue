<template>
  <div class="tabs">
    <div :class="{ active: tab=='microphone' }" @click="()=>tab='microphone'">Microphone</div>
    <div :class="{ active: tab=='local-file' }" @click="()=>tab='local-file'">Local File</div>
  </div>
  
  <ReadFile v-if="tab=='local-file'" />
  <Microphone v-if="tab=='microphone'" />
</template>

<script setup>
import Microphone from './components/Microphone.vue';
import ReadFile from './components/ReadFile.vue';
import { ref } from 'vue';
const tab = ref('microphone');
</script>
  
<style>
*{
  margin: 0; padding: 0; box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tabs {
  display: flex;
  text-align: center;
  justify-content: center;
}
.tabs > div {
  margin-left: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
.tabs > div.active {
  font-weight: bold;
}
</style>