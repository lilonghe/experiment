<template>
    <a class="item" :style="{width, height}" :href="data.link">
        <img :src="data.img" :style="{width, height}" />
    </a>
</template>
<script setup lang="ts">
import { ICarouselData } from './index.vue';
import { defineProps, PropType } from 'vue';
const {
    width, height, data
} = defineProps({
    width: String,
    height: String,
    data: {
        type: Object as PropType<ICarouselData>,
        required: true
    }
})
</script>
<style scoped>
    .item, .item img {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>