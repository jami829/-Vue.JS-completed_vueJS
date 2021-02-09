import Vue from "vue"
import Router from "vue-router"
import Main from "./components/Main.vue"


const Details = () => {
  //lazyload: 기본 path인 "/"에 연결된 모든 컴포넌트들을 모두 불러온 후 로딩하는 것이 아니라, 해당 라우트로 들어갈 시 해당 라우트에 연결된 컴포넌트들을 불러오게 한다.
  // 속도면에서 확연히 차이가 나기에 해당 라우팅을 선택.
  return import(/* webpackChunkName: "details" */ "./components/Details.vue")
}

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: "main",
      component: Main
    },
    {
      path: "/details/:id",
      name: "details",
      component: Details
    }
  ]
})