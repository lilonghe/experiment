import { defineStore } from "pinia";

export interface IUser {
    name: string;
    permissions: string[];
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as IUser | null
        }
    },
    actions: {
        saveUserInfo(user: IUser | null) {
            this.user = user
        }
    }
})