import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {  // data
    isChecked: [
      { id: 1, checked: true },
      { id: 2, checked: true },
      { id: 3, checked: true },
    ],
    feedArr: []
  },

  mutations: {
    saveChecked: function (state, payload) {
      state.isChecked = payload
    },
    feeds: function (state, payload) {
      state.feedArr = [...state.feedArr, ...payload]
    },
    ressetFeeds: function (state) {
      state.feedArr = []

    }
  },
  getters: {
    descFeeds: state => {
      return state.feedArr.slice().reverse()
    }
  },
  actions: {

  },


  // plugins: [createPersistedState()]


})