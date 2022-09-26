<script setup lang="ts">
import Carousel, { ICarouselData } from './components/Carousel/index.vue'
import List from './components/List/index.vue'
import { ref } from 'vue';

const carouselData: Array<ICarouselData> = [
  {
    img: '/img/1.png',
    link: 'https://www.baidu.com'
  },
  {
    img: '/img/2.png'
  },
  {
    img: '/img/3.png'
  },
  {
    img: '/img/4.png'
  },  
]

const listData = ref<Array<Number>>([]);
const dataLength = 10000;

for(let i = 1; i <= dataLength; i++) {
    listData.value.push(i)
}
</script>

<template>
  <List
    width="200px"
    height="300px"
    :itemHeight="100"
    :data="listData"
    :redundancyPage="2">
    <template v-slot:default="{ data }">
      <div 
        class="item">
        {{data}}
    </div>
    </template>
  </List>
  <carousel :data="carouselData" width="400px" height="200px" />
</template>
<style> 
.item {
  height: 100px;
  box-shadow: inset 0 0 2px #000;
}
</style>