<template>
    <text class="tag">{{text}}</text>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const { text } = defineProps(['text']);

</script>
<style lang="scss">
.tag {
    background-color: #CCC;
    color: white;
    padding: 2rpx 6rpx;
    border-radius: 4rpx;
    font-size: 12px;
}
</style>