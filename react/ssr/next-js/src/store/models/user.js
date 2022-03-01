export const user = {
    state: {
        userinfo: null,
    },
    reducers: {
        saveUserinfo(state, payload) {
            return {
                ...state,
                userinfo: payload,
            }
        }
    },
    effects: () => ({
        async fetchUserinfo(payload) {
            const res = await fetch(`http://rap2api.taobao.org/app/mock/262830/login`)
            const data = await res.json();
            this.saveUserinfo(data.data);
        }
    })
}