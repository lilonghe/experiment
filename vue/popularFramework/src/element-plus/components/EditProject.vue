<script setup lang="ts">
import { ref, watch } from 'vue';
import {  ElDialog, ElForm, ElFormItem, ElInput, ElMessage, ElButton, FormInstance } from 'element-plus'
import { editProject, getProjectById } from '@/db'

const formState = ref({
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

</script>
<template>
    <el-dialog 
        v-model="props.visible" title="Edit" @ok="handleSubmit" @cancel="emit('cancel')">
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