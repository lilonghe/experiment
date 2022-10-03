<script setup lang="ts">
import { reactive } from 'vue';
import { Form, FormItem, Input, Button, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { createProject } from '../../db'

const router = useRouter()
const formState = reactive({
    name: '',
    password: '',
    deep: {
        a1: '',
        a2: '',
    }
})


const onFinsh = (values: any) => {
    message.success(values.name + ' Congratulations!')
    createProject(values)
    router.push('/')
}
</script>
<template>
    <Form 
        class="createForm"
        name="create"
        :model="formState"
        @finish="onFinsh">
        <FormItem
            label="Project Name"
            name="name"
            :rules="[
                {required: true, message: 'Input Project Name'}
            ]">
            <Input v-model:value="formState.name" />
        </FormItem>

        <FormItem
            label="Password"
            name="password"
            :rules="[
                {required: true, message: 'Input password'},
                {pattern: /^[a-z]{3,20}$/, message: 'Must a-z latter, and length 3 - 20'},
            ]">
            <Input type="password" v-model:value="formState.password" />
        </FormItem>

        <FormItem
            label="Deep"
            :name="['deep','a1']">
            <Input v-model:value="formState.deep.a1" />
        </FormItem>
        <FormItem
            label="Deep"
            :name="['deep', 'a2']">
            <Input v-model:value="formState.deep.a2" />
        </FormItem>

        <FormItem>
            <div class="actions">
                <Button type="primary" html-type="submit">Submit</Button>
                <router-link to="./"><Button>Back</Button></router-link>
            </div>
        </FormItem>
    </Form>
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