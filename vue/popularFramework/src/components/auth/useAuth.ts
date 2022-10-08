import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

export function useAuth() {
    const userStore = useUserStore()
    const userPermission = computed<string[]>(() => {
        return userStore.user?.permissions || []
    })

    const checkAuth = (authority: string | string[]) => {
        // default is not limit
        if (!authority) return true;

        if (typeof authority === 'string') {
            if (userPermission.value.includes(authority)) {
                return true
            }
        } else if (Array.isArray(authority)) {
            // match anyone, or change to every as match everybody
            return authority.some(key => {
                return userPermission.value.includes(key)
            })
        }
        return false
    }

    return { checkAuth }
}