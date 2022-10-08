<script setup lang="ts">
import { defineProps } from 'vue'
import { useAuth } from './useAuth';

const { checkAuth } = useAuth()

interface IProps {
    authority: string | string []
}

defineProps<IProps>()
</script>
<template>
    <template v-if="checkAuth(authority)">
        <slot></slot>
    </template>
</template>