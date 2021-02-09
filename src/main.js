import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store/index' // 모든 컴포넌트의 중앙통제소격인 main.js에 vuex 저장소를 설정해놔야 한다. 각 컴포넌트에 import할 필요 없음.

//! main.js안에 적용 및 삽입되어있는것은 각 컴포넌트에서 $를 사용해 불러올 수 있다.  

Vue.prototype.$axios = axios; // prototype에 axios를 추가하여 Vue 인스턴스 내부안에서 별도로 import없이 this.$axios로 사용가능

Vue.config.productionTip = false


new Vue({
  router,
  store,  // 저장소를 vue를 생성할 때 하나의 값으로 삽입하기.
  render: h => h(App),
}).$mount('#app')
