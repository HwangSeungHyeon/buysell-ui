import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            isAccessAllowed: false,
        };
    },
    mutations: {
        allowAccess(state) {
            state.isAccessAllowed = true;
        },
        denyAccess(state) {
            state.isAccessAllowed = false;
        },
    },
    // actions와 getters를 필요에 따라 정의
});

export default store;