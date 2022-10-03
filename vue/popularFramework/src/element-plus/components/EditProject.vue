<script setup lang="ts">
import { ref, watch } from 'vue';
import { Form, FormItem, Input, message, Modal } from 'ant-design-vue';
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
const formRef = ref()

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
    message.success(values.name + ' Congratulations!')
    emit('ok')
}

const handleSubmit = () => {
    formRef.value.validateFields()
        .then((values: any) => {
            onFinsh(values)
        })
}

</script>
<template>
    <Modal v-model:visible="props.visible" title="Edit" @ok="handleSubmit" @cancel="emit('cancel')">
        <Form ref="formRef" class="createForm" name="create" :model="formState" @finish="onFinsh">
            <FormItem label="Id">
                <span>{{projectId}}</span>
            </FormItem>
            <FormItem label="Project Name" name="name" :rules="[
                {required: true, message: 'Input Project Name'}
            ]">
                <Input v-model:value="formState.name" />
            </FormItem>

            <FormItem label="Password" name="password" :rules="[
                {required: true, message: 'Input password'},
                {pattern: /^[a-z]{3,20}$/, message: 'Must a-z latter, and length 3 - 20'},
            ]">
                <Input type="password" v-model:value="formState.password" />
            </FormItem>
        </Form>
    </Modal>
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