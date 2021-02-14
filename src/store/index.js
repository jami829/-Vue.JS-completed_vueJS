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
    feedArr: [],
    ord: "asc"
  },

  mutations: {
    saveChecked: function (state, payload) {
      state.isChecked = payload
    },
    feeds: function (state, payload) {
      state.feedArr = [...state.feedArr, ...payload]
    },
    resetFeeds: function (state) {
      state.feedArr = []
    },
    handleOrd: function (state, payload) {
      state.ord = payload
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