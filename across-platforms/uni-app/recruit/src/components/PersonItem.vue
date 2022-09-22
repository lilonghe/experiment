<template>
    <view class="personItem" @click="handleViewDetail">
        <view class="title">
            <text class="job">{{user.job}}</text>
            <text class="offer">{{user.offer}}</text>
        </view>
        <view class="companyInfo">
            <text>{{user.company.name}}</text><text>{{user.company.peopleCount}}</text>
        </view>
        <view class="tags">
            <tag v-for="tag in user.tags" :text="tag" :key="tag" />
        </view>
        <view class="poster">
            <text>{{user.poster.name}}</text>
            <text>{{user.address}}</text>
        </view>
    </view>
</template>
<script setup lang="ts">
import Tag from './Tag.vue'
import { defineProps } from 'vue';

const { user } = defineProps(['user'])

const handleViewDetail = () => {
    uni.navigateTo({ url: '../job/index?id=' + user.id })
}

</script>
<style lang="scss" scoped>
.personItem {
    background-color: #FFF;
    padding: 15rpx 20rpx;
    border-radius: 10rpx;

    display: flex;
    flex-direction: column;
    gap: 12rpx;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .job {
        max-width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
    }

    .offer {
        color: coral;
    }
}

.companyInfo {
    display: flex;
    gap: 8rpx;
    font-size: 12px;
}

.tags {
    display: flex;
    gap: 8rpx;
}

.poster {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
}
</style>