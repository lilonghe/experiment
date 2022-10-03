<script setup lang="ts">
import { ElCard, useFormItem } from 'element-plus'

// 神奇哎，下面可以直接使用 modelValue，就莫名其妙的可以使用了
defineProps({
    modelValue: String
})
const { formItem } = useFormItem()
const emit = defineEmits(['update:modelValue'])

const handleSelected = (val: string) => {
    emit('update:modelValue', val)
    formItem?.validate('blur')
}

</script>
<template>
    <div class="cardWrapper">
        <el-card @click="handleSelected('1')" :class="{active: modelValue === '1'}">
            Card 1
        </el-card>
        <el-card @click="handleSelected('2')" :class="{active: modelValue === '2'}">
            Card 2
        </el-card>
    </div>
</template>
<style scoped>
.cardWrapper {
    display: flex;
    gap: 1em;
}

.active {
    border-color: var(--el-color-primary);
}
</style>