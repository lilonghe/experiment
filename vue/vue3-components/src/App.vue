<script setup lang="ts">
import Carousel, { ICarouselData } from './components/Carousel/index.vue'
import List from './components/List/index.vue'
import { ref } from 'vue';
import { Tree, ITreeNode } from './components/Tree';

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

const treeData: Array<ITreeNode> = [
  {
    key: "1", title: "1-1",
    children: [
      { key: "12", title: '1-2-1'},
      { key: "13", title: '1-2-2'},
      { 
        key: "14", title: '1-2-3', 
        children: [
          {key: "141", title: '1-2-3-1'},
          {
            key: "142", title: '1-2-3-2', 
            children: [
              { key: "1421", title: '1-2-3-2-1'}, 
              { key: "1422", title: '1-2-3-2-2'}, 
              { key: "1423", title: '1-2-3-2-3'}, 
            ]
          },
          {key: "143", title: '1-2-3-4'}
        ]
      },
    ]
  }
]
</script>

<template>
  <tree :treeData="treeData" :defaultExpandedKeys="['1', '14']" />
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