import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = (resolve) => {
  import('cpnts/home/home').then((module) => {
    resolve(module)
  })
}

const detail = (resolve) => {
  import('cpnts/detail/detail').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/home',
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: ':id',
          component: detail
        }
      ]
    },
  ]
})
