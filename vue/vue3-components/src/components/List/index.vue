<template>
    <div 
        v-on:scroll="handleScroll"
        class="wrapper" 
        ref="wrapper"
        :style="{width, height}">
        <div :style="{paddingTop: paddingTop +'px', paddingBottom: paddingBottom + 'px'}">
            <div 
                :style="{height: itemHeight + 'px'}"
                v-for="(item, i) in data?.slice(startIndex, endIndex + 1)" 
                :key="item">
                <slot :data="item"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
const { itemHeight, data, width, height, redundancyPage = 1 } = defineProps({
    width: String,
    height: String,
    itemHeight: {
        type: Number,
        required: true
    },
    data: {
        type: Array<any>,
        required: true,
    },
    // 冗余展示，避免滚动时闪烁
    redundancyPage: Number
})

const wrapper = ref<HTMLDivElement>()
const startIndex = ref(0)
const endIndex = ref(0)
const paddingTop = ref(0)
const paddingBottom = ref(0)

const getViewRange = (scrollTop: number = 0) => {
    if (!wrapper.value) return;
    const { height } = wrapper.value.getBoundingClientRect();

    const pageSize = Number((height / itemHeight).toFixed());
    const viewRangeSize = pageSize * redundancyPage;

    startIndex.value = Math.max(Math.floor(scrollTop / itemHeight), 0);
    endIndex.value = Math.min(startIndex.value + viewRangeSize, data.length - 1);

    paddingTop.value = startIndex.value * itemHeight
    paddingBottom.value = (data.length - 1 - endIndex.value) * itemHeight;
}
    
const handleScroll = () => {
    if (wrapper.value) {
        getViewRange(wrapper.value.scrollTop)
    }
}

onMounted(() => {
    getViewRange()
})

</script>
<style scoped>
.wrapper {
    overflow-y: scroll;
}
</style>