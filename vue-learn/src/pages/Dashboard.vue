<template>
  <div id="app">
      <h2 v-if="user">this is {{user.nickname}}</h2>
      <ul>
          <li v-for="item in postList"><router-link :to="{ path:'/post/'+item.id }">{{item.title}}</router-link></li>
      </ul>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import { getPostList, getSessionUser } from '../utils/services';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Dashboard',
  components: { Button },
  data(){
      return {
          postList: []
      }
  },
    computed: mapState({
        user: state => state.session,
    }),
    methods: {
        ...mapMutations({
            setSessionUser: 'setSessionUser' // map `this.add()` to `this.$store.commit('increment')`
        })
    },
    created: async function () {
        const user = this.user;
        if (!user) {
            const {err, data} = await getSessionUser();
            if (!err) {
                this.setSessionUser(data)
            }
        }

        // console.log('user => ', this.user)

        const {err, data} = await getPostList();
        if (!err) {
            this.postList = data;
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
