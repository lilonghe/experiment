<template>
    <div>
        <button 
            @click="toggleAction"
            v-text="(audio?`Stop`:'Start')+' Record'" />
        <div>
            <Visualisation :audioData="audioData" :audioDataByFrequency="audioDataByFrequency" :diff="diff"/>
        </div>
    </div>
</template>
<script setup>
import {ref, onUnmounted} from 'vue';
import Visualisation from './Visualisation.vue';
const audioData = ref(null); 
const audioDataByFrequency = ref(null);
const diff = ref(null);
const audio = ref(null);

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 512;
let dataArray = new Uint8Array(analyser.frequencyBinCount);
let dataArrayByFrequency = new Uint8Array(analyser.frequencyBinCount);
let source = null;
let rafId = null;

let tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    analyser.getByteFrequencyData(dataArrayByFrequency);
    audioData.value = dataArray;
    audioDataByFrequency.value = dataArrayByFrequency;
    diff.value = Math.random();
    rafId = requestAnimationFrame(tick);
}

const toggleAction = () => {
    if (audio.value) {
      stop();
    } else {
      start();
    }
}
const start = async () => {
    audio.value = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
    source = audioContext.createMediaStreamSource(audio.value);
    source.connect(analyser);
    audioContext.resume();

    rafId = requestAnimationFrame(tick);
}

const stop = async () => {
    audio.value.getTracks().forEach(track => track.stop());
    audio.value = null;
    cancelAnimationFrame(rafId);
}

onUnmounted (() => {
    cancelAnimationFrame(rafId);
    analyser.disconnect();
    source?.disconnect();
})

</script>
