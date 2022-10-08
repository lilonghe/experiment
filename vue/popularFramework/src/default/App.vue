<script setup lang="ts">
import AuthHelperVue from './AuthHelper.vue';
import AuthHelper from './AuthHelper.vue';
</script>
    
<template>
    <div class="content">
        <div>
            <h2>授权校验</h2>
            <AuthHelper />
        </div>
    </div>
</template>
    
<style scoped>
.actions {
    display: flex;
    gap: 10px;
}
</style>
    