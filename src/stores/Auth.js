const state = {
    token: localStorage.getItem('token'),
    user: []
}

const getters = {
    isAuth: state => state.token !== 'null' && state.token !== undefined && state.token !== null,
    getToken: state => state.token,
    getUser: state => state.user,
}

const mutations = {
    set_token(state, payload) {
        state.token = payload
    },
    set_user(state, payload) {
        state.user = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}