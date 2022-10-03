<script setup lang="ts">
import { ref, watch } from 'vue';
import {  ElDialog, ElForm, ElFormItem, ElInput, ElMessage, ElButton, FormInstance } from 'element-plus'
import { editProject, getProjectById, IProject } from '@/db'
import FormItemCard from './FormItemCard.vue';

const formState = ref<IProject>({
    name: '',
    password: ''
})
const props = defineProps({
    visible: Boolean,
    projectId: String,
})
const emit = defineEmits(['ok', 'cancel'])
const formRef = ref<FormInstance>()

const loadData = () => {
    if (!props.projectId) return;
    let data = getProjectById(props.projectId)
    if (data) {
        formState.value = data
    }
}

watch([props], () => {
    const { visible, projectId } = props;
    if (visible && projectId) {
        loadData()
    }
})

const onFinsh = (values: any) => {
    editProject({ ...values, id: props.projectId })
    ElMessage.success(values.name + ' Congratulations!')
    emit('ok')
}

const handleSubmit = () => {
    formRef.value?.validate(isValid => {
        if (isValid) {
            onFinsh(formState.value)
        }
    });
}

/**
 * 令人费解的 API 设计
 * @close 始终有回调
 * :before-close 为什么是属性而不是事件呢
 *      只会在点击右上角关闭时触发
 * :model-value 使用了变量受控制，但是点击关闭竟然又不受控，所以要跑到 :before-close 去手动同步状态
 */
const handleClose = (done: () => void) => {
    console.log(':before-close')
    emit('cancel');
}

/**
 * @close 始终有回调
 */
const test = () => {
    console.log('@close')
}

</script>
<template>
    <el-dialog 
        :model-value="props.visible"
        :before-close="handleClose"
        @close="test"
        title="Edit">
        <el-form ref="formRef" class="createForm" :model="formState">
            <el-form-item label="Id">
                <span>{{projectId}}</span>
            </el-form-item>
            <el-form-item label="Project Name" prop="name" :rules="[
                {required: true, message: 'Input Project Name'}
            ]">
                <el-input v-model="formState.name" />
            </el-form-item>

            <el-form-item label="Password" prop="password" :rules="[
                {required: true, message: 'Input password'},
                {pattern: /^[a-z]{3,20}$/, message: 'Must a-z latter, and length 3 - 20'},
            ]">
                <el-input type="password" v-model="formState.password" />
            </el-form-item>

            <el-form-item label="Card" prop="card" :rules="[
                {required: true, message: 'Select card'},
            ]">
                <form-item-card v-model="formState.card" />
            </el-form-item>
        </el-form>

        <template #footer>
                <el-button @click="emit('cancel')">Cancel</el-button>
                <el-button type="primary" @click="handleSubmit">Ok</el-button>
        </template>
    </el-dialog>
</template>
<style scoped>
.createForm {
    max-width: 500px;
}

.actions {
    display: flex;
    gap: 20px;
}
</style>