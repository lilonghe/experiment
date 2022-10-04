<template>
    <tree-node 
        v-for="item in treeData" 
        :key="item.key"
        :data="item"
        :expanded="expandKeys.includes(item.key)"
         />
</template>
<script setup lang="ts">
import TreeNode from './TreeNode.vue'
import { ITreeNode } from './index'
import { ref, provide } from 'vue';

const { defaultExpandedKeys = [] } = defineProps({
    treeData: Array<ITreeNode>,
        defaultExpandedKeys: Array<string>
})

const expandKeys = ref(defaultExpandedKeys);

const handleExpand = (key: string, isExpand: boolean, data: ITreeNode) => {
    if (isExpand) {
        if (!expandKeys.value.includes(key)) {
            expandKeys.value.push(key);
        }
    } else {
        let i = expandKeys.value.findIndex(item => item === key);
        if (i != -1) {
            expandKeys.value.splice(i, 1);
        }
    }
}

provide('expandKeys', expandKeys);
provide('handleExpand', handleExpand)
</script>