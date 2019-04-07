import Vue from 'vue';
import MainLayout from './components/layout/Main';
import router from './router';
import Vuex from 'vuex';
import './components';

Vue.config.productionTip = false;


const store = new Vuex.Store({
  state: {
    session: undefined
  },
  mutations: {
    setSessionUser (state, params) {
      state.session = params;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(MainLayout),
}).$mount('#app')
