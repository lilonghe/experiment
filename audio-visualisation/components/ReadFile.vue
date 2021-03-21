<template>
    <div>
        <input @change="changeFile" type="file" accept=".mp3,.m4a" />
        <div>
            <Visualisation :audioData="audioData" :audioDataByFrequency="audioDataByFrequency" :diff="diff"/>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import Visualisation from './Visualisation.vue';
const audioData = ref(null);
const audioDataByFrequency = ref(null);
const diff = ref(null);
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 512;
let dataArray = new Uint8Array(analyser.frequencyBinCount);
let dataArrayByFrequency = new Uint8Array(analyser.frequencyBinCount);
let source = null;
let rafId = null;


const changeFile = (e) => {
    const file = e.target.files[0];

    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (event) => {
        destoryPlayer();
        connectAudio(event.target.result)
    }
}

const connectAudio = (data) => {
    source = audioContext.createBufferSource();
    audioContext.decodeAudioData(data, (buffer)=>{
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        source.buffer = buffer;
        source.start();
        rafId = requestAnimationFrame(tick);
    });

}

let tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    analyser.getByteFrequencyData(dataArrayByFrequency);
    audioData.value = dataArray;
    audioDataByFrequency.value = dataArrayByFrequency;
    diff.value = Math.random();
    rafId = requestAnimationFrame(tick);
}

onUnmounted (() => {
    destoryPlayer();
});

let destoryPlayer = () => {
    cancelAnimationFrame(rafId);
    analyser.disconnect();
    source?.disconnect();
}
</script>