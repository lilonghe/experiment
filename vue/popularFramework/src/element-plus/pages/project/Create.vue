<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';
import { createProject } from '@/db'

const router = useRouter()
const formState = reactive({
    name: '',
    password: '',
    deep: {
        a1: '',
        a2: '',
    }
})
const formRef = ref<FormInstance>()

const onFinsh = () => {
    formRef.value?.validate(isValid => {
        if (isValid) {
            console.log(formState)
            ElMessage.success(formState.name + ' Congratulations!')
            createProject(formState)
            router.push('/')
        }
    })
}
</script>
<template>
    <el-form 
        class="createForm"
        :model="formState"
        ref="formRef">
        <el-form-item
            label="Project Name"
            prop="name"
            :rules="[
                {required: true, message: 'Input Project Name'}
            ]">
            <el-input v-model="formState.name" />
        </el-form-item>

        <el-form-item
            label="Password"
            prop="password"
            :rules="[
                {required: true, message: 'Input password'},
                {pattern: /^[a-z]{3,20}$/, message: 'Must a-z latter, and length 3 - 20'},
            ]">
            <el-input type="password" v-model="formState.password" />
        </el-form-item>

        <el-form-item
            label="Deep"
            :prop="['deep','a1']">
            <el-input v-model="formState.deep.a1" />
        </el-form-item>
        <el-form-item
            label="Deep"
            :prop="['deep', 'a2']">
            <el-input v-model="formState.deep.a2" />
        </el-form-item>

        <el-form-item>
            <div class="actions">
                <el-button type="primary" @click="onFinsh">Submit</el-button>
                <router-link to="./"><el-button>Back</el-button></router-link>
            </div>
        </el-form-item>
    </el-form>
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