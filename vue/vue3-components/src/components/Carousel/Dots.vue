<template>
    <ul class="dots">
        <li 
            v-for="(_,i) in data" 
            :key="i" 
            :class="{active: activeIndex === i}"
            @click="emit('changeActive', i)"
            :style="{...dotStyle, ...(activeIndex === i ? dotActiveStyle:{})}"></li>
    </ul>
</template>
<script setup lang="ts">
import { ICarouselData } from './index.vue'
import { CSSProperties, PropType } from 'vue'

const emit = defineEmits(['changeActive'])

const { data, activeIndex } = defineProps({
    data: {
        type:  Array<ICarouselData>,
        required: true
    },
    activeIndex: {
        type: Number,
        required: true,
    },
    dotStyle: Object as PropType<CSSProperties>,
    dotActiveStyle: Object as PropType<CSSProperties>,
})

const checkActive = (i: number) => {
    // if (activeIndex === i || (activeIndex <= -1 && i === data.length - 1) || )
}
</script>
<style scoped>
.dots {
    list-style: none;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    justify-content: space-between;
    padding: 0;
    gap: 10px;
    margin: 0;
}
.dots li {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
}
.dots li.active {
    background-color: #CCC;
}
</style>