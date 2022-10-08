<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import  Auth, { useAuth } from '@/components/auth';

const userStore = useUserStore()
const { checkAuth } = useAuth()

const saveUser = () => {
    if (!userStore.user) {
        userStore.saveUserInfo({ name: 'tom', permissions: ['project', 'app', 'admin'] })
    } else {
        userStore.saveUserInfo(null)
    }
}

const code = `
<button v-if="checkAuth('project')">Project btn</button>
<auth :authority="['admin', 'app']">
    <button>Admin btn</button>
</auth>`

</script>
        
<template>
    <div class="actions">
        <button @click="saveUser">Toggle permisson</button>
        <button v-if="checkAuth('project')">Project btn</button>
        <auth :authority="['admin', 'app']">
            <button>Admin btn</button>
        </auth>
    </div>
    <pre>
        {{code}}
    </pre>
</template>
        
<style scoped>
.actions {
    display: flex;
    gap: 10px;
}
</style>
        