<template>
    <canvas ref="canvas" width="1000" height="300" />
</template>
<script setup>
import {ref, defineProps, onUpdated} from 'vue';
const props = defineProps(['audioData', 'diff']);
const canvas = ref(null);

let draw = () => {
    const height = canvas.value.height;
    const width = canvas.value.width;
    const context = canvas.value.getContext('2d');

    let x = 0;
    const sliceWidth = (width * 1.0) / props.audioData.length;
    context.lineWidth = 2;    
    context.strokeStyle = '#000000';    
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    for (const item of props.audioData) {
        const y = (item / 255.0) * height;
        context.lineTo(x, y);
        x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
}

onUpdated(()=>{
    draw();
});
</script>