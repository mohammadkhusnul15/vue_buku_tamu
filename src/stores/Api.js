const state = {
    url: process.env.VUE_APP_API_URL
}

const getters = {
    getUrl: state => state.url
}

export default {
    namespaced: true,
    state,
    getters
}