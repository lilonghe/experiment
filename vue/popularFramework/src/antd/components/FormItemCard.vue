<script setup lang="ts">
import { Form, Card } from 'ant-design-vue'

// 神奇哎，下面可以直接使用 modelValue，就莫名其妙的可以使用了
defineProps({
    value: String
})
const formItem = Form.useInjectFormItemContext();
const emit = defineEmits(['update:value'])

const handleSelected = (val: string) => {
    emit('update:value', val)
    formItem.onFieldChange()
}

</script>
<template>
    <div class="cardWrapper">
        <card @click="handleSelected('1')" :class="{active: value === '1'}">
            Card 1
        </card>
        <card @click="handleSelected('2')" :class="{active: value === '2'}">
            Card 2
        </card>
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