<template>
    <div class="carousel" :style="{ width, height }" v-if="data.length > 0">
        <div class="carousel-gallary" ref="carouselGallaryElement">
            <item :data="data[data.length - 1]" :width="width" :height="height" />
            <item 
                v-for="item in data"
                :key="item.img"
                :data="item"
                :width="width"
                :height="height" />
            <item :data="data[0]" :width="width" :height="height"  />
        </div>
        <div class="direction">
            <div class="prev" @click="jumpOffset(-1)"></div>
            <div class="next" @click="jumpOffset(1)"></div>
        </div>
        <Dots 
            :dot-style="{backgroundColor: '#000'}"
            :dot-active-style="{backgroundColor: '#FFF'}"
            :data="data" 
            :activeIndex="activeIndex" 
            @changeActive="updateActive" />
    </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue'
import Item from './Item.vue';
import Dots from './Dots.vue'

export interface ICarouselData {
    img: string
    link?: string
}

const { data, interval = 3000, width = '100%', height = '100%' } = defineProps({
    data: {
        type:  Array<ICarouselData>,
        required: true
    },
    width: String,
    height: String,
    interval: Number
})

const activeIndex = ref(0)
let intervalHandle: number;
let loopAnimationTimeoutHandler: number | undefined;
const carouselGallaryElement = ref<HTMLDivElement>()

const addAnimation = () => {
    if (carouselGallaryElement.value) {
        carouselGallaryElement.value.style.transition = 'all .3s';
    }
}

const moveView = (pos: number) => {
    if (carouselGallaryElement.value) {
        carouselGallaryElement.value.style.transform = `translateX(-${pos}px)`;
    }
}

const autoPlay = () => {
    intervalHandle && window.clearInterval(intervalHandle)
    intervalHandle = setInterval(() => {
        if (activeIndex.value == -1) {
            updateActive(0)
            return
        }
        if (activeIndex.value == data.length) {
            updateActive(1);
            return
        }

        updateActive(activeIndex.value + 1)
    }, interval)
}

const updateActive = (index: number) => {
    if (loopAnimationTimeoutHandler) return;
    autoPlay()

    // 避免快速切换时移动到错误位置
    if (index > data.length) {
        activeIndex.value = 1;
    } else if (index < -1) {
        activeIndex.value = data.length - 2;
    }   else {
        activeIndex.value = index;
    }

    if (carouselGallaryElement.value) {
        const { width } = carouselGallaryElement.value.getBoundingClientRect();
        let jumpPos = width * (activeIndex.value + 1);
        addAnimation();
        moveView(jumpPos);
    }

    // 走到最后或最前面元素时，前面动画结束后，跳到正确位置
    if (activeIndex.value >= data.length || activeIndex.value <= -1) {
        let jumpPos = 0;
        if (carouselGallaryElement.value) { 
            const { width } = carouselGallaryElement.value.getBoundingClientRect();
            jumpPos = width;
            if (activeIndex.value <= -1) {
                jumpPos = data.length * width;
                activeIndex.value = data.length - 1;
            } else {
                activeIndex.value = 0;
            }
        }
        
        loopAnimationTimeoutHandler = setTimeout(() => {
            loopAnimationTimeoutHandler = undefined
            if (carouselGallaryElement.value) { 
                carouselGallaryElement.value.style.transition = ''
                moveView(jumpPos);
            }
        }, 300)
        
    } else {
        addAnimation();
    }
}

const jumpOffset = (size: number) => {
    updateActive(activeIndex.value + size)
}

onMounted(() => {
    if (data.length <= 1) return;
    
    if (carouselGallaryElement.value) {
        const { width } = carouselGallaryElement.value.getBoundingClientRect();
        moveView(width);
        setTimeout(() => {
            addAnimation();
        })
    }
    autoPlay()
})

onUnmounted(() => {
    intervalHandle && window.clearInterval(intervalHandle)
    loopAnimationTimeoutHandler && window.clearTimeout(loopAnimationTimeoutHandler)
})

</script>
<style scoped>
.carousel {
    overflow: hidden;
    position: relative;
}

.carousel-gallary {
    display: flex;
}

.direction {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    display: none;
    justify-content: space-between;
}
.direction .prev, .direction .next {
    width: 20px;
    height: 30px;
    background-color: rgba(0,0,0,.3);
    cursor: pointer;
}

.carousel:hover .direction {
    display: flex;
}
</style>