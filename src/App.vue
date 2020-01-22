<template>
  <div id="app">
    <layout-header/>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import LayoutHeader from '../src/components/LayoutHeader.vue'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      url: 'api/getUrl',
      token: 'auth/getToken',
      user: 'auth/getUser'
    })
  },
  methods: {
    ...mapMutations("auth", ["set_user", "set_token"])
  },
  created() {
    if(this.isAuth) {
      if(this.user.length == 0) {
        this.$http.get(`${this.url}user`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }).then(response => {
            this.set_user(response.data.data)
            console.log(this.user)
        })
      }
    }
  },
  components: {
    LayoutHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
