<template>
  <view class="content">
    <view class="personList">
      <person-item v-for="item in userList" :key="item.id" :user="item" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PersonItem from '../../components/PersonItem.vue';

const data = [{
  id: 1,
  tags: ['React', 'Redux', 'Webpack'],
  job: 'Frontend Developer',
  offer: '20-30K',
  company: {
    name:  '往前冲',
    peopleCount: '20-99人',
  },
  poster: {
    name: '王先生'
  },
  address: '上海市长宁区汶水路'
},{
  id: 2,
  tags: ['React', 'Rematch', 'Vite'],
  job: '前端开发工程师',
  offer: '15-30K',
  company: {
    name:  '往前冲',
    peopleCount: '20-99人',
  },
  poster: {
    name: '王先生'
  },
  address: '上海市青浦区盈港东路'
},{
  id: 3,
  tags: ['React', 'Rematch', 'Vite'],
  job: '前端开发工程师',
  offer: '30-60K',
  company: {
    name:  'LEGO Group',
    peopleCount: '200-999人',
  },
  poster: {
    name: 'Mrs. Li'
  },
  address: '上海市黄浦区'
},{
  id: 4,
  tags: ['React', 'Rematch', 'Vite'],
  job: '前端开发工程师',
  offer: '15-30K',
  company: {
    name:  'LSDSG',
    peopleCount: '20-99人',
  },
  poster: {
    name: 'Mr. Willian'
  },
  address: '上海市浦东陆家嘴'
}]
const userList = ref(data)

uni.setStorage({
  key: 'jobList',
  data: data
})
</script>

<style scoped lang="scss">
.content {
  padding: 20rpx $uni-spacing-row-base;
}

.personList {
  display: flex;
  gap: 15rpx;
  flex-direction: column;
}
</style>
