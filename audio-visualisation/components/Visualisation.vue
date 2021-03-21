<template>
    <canvas ref="canvas" height="300" />
    <canvas ref="canvas2" height="300" />
</template>
<script setup>
import {ref, defineProps, onUpdated, onMounted} from 'vue';
const props = defineProps(['audioData', 'audioDataByFrequency', 'diff']);
const canvas = ref(null);
const canvas2 = ref(null);

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

    if (props.audioDataByFrequency) {
        draw2();
    }
}

let draw2 = () => {
    const height = canvas2.value.height;
    const width = canvas2.value.width;
    const context = canvas2.value.getContext('2d');
    const bufferLength = props.audioDataByFrequency.length;
    var barWidth = width / bufferLength * 1.5;
    var barHeight;
    

    context.clearRect(0, 0, width, height);

    for (var i = 0, x = 0; i < bufferLength; i++) {
        barHeight = props.audioDataByFrequency[i];

        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;

        context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        context.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 2;
    }
}

onMounted(()=>{
    canvas.value.width = window.innerWidth;
    canvas2.value.width = window.innerWidth;
})
onUpdated(()=>{
    draw();
});
</script>