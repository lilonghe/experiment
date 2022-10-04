<template>
    <div>
        <div>
            <template v-if="data.children">
                <span v-if="expanded" @click="handleExpand(false)">▽</span>
                <span v-if="!expanded" @click="handleExpand(true)">▷</span>
            </template>
            <span>{{data.title}}</span>
        </div>
        <div class="childern" v-if="data.children && expanded">
            <tree-node 
                v-for="item in data.children" 
                :key="item.key"
                :data="item"
                :expanded="expandKeys.includes(item.key)"
                />
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { ITreeNode } from './index'
interface IProps {
    data: ITreeNode;
    expanded: boolean
}
const props = defineProps<IProps>()
// const emits = defineEmits(['expand'])
const expandKeys: string[] = inject('expandKeys', [])
const handleTreeExpand = inject('handleExpand', (key: string, expand: boolean, data: ITreeNode) => {})

const handleExpand = (expand: boolean) => {
    handleTreeExpand(props.data.key, expand, props.data)
    // emits('expand', props.data.key, expand, props.data)
}
</script>
<style scoped>
.childern {
    padding-left: 20px;
}
</style>

<!-- 
    1. 组件可以自引用：tree-node 使用 tree-node
    2. 跨层级事件传递貌似有点问题？因为没地方拿到函数的引用
 -->