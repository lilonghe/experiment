<template>
    <Visualisation :audioData="audioData" :diff="diff"/>
</template>
<script setup>
import {ref, defineProps, onMounted, onUnmounted, watchEffect} from 'vue';
import Visualisation from './Visualisation.vue';
const props = defineProps(['audio']);
const audioData = ref(new Uint8Array(0)); 
const diff=ref(null);

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const dataArray = new Uint8Array(analyser.frequencyBinCount);
const source = audioContext.createMediaStreamSource(props.audio);
source.connect(analyser);
let rafId = null;

let tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    audioData.value = dataArray;
    // 不知道为什么不做更新，子组件使用 watch 也不行，所以增加一个协助更新的变量
    diff.value = Math.random();
    rafId = requestAnimationFrame(tick);
}

onMounted(() => {
    source.connect(analyser);
    rafId = requestAnimationFrame(tick);
})

onUnmounted (() => {
    cancelAnimationFrame(rafId);
    analyser.disconnect();
    source.disconnect();
})

</script>
