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

const login = (resolve) => {
  import('cpnts/login/login').then((module) => {
    resolve(module)
  })
}

const admin = (resolve) => {
  import('cpnts/admin/admin').then((module) => {
    resolve(module)
  })
}

let routes = [
  {
    path: "/",
    redirect: '/home',
  },
  // 首页
  {
    path: '/home',
    component: home,
    children: [
      // 详情页
      {
        path: ':id',
        component: detail
      }
    ],
  },
  // 登录
  {
    path: '/login',
    component: login,
    beforeEnter: (to, from, next) => {
      let status = sessionStorage.getItem("user")
      if(status){
        next({ path: '/admin' })
      }else{
        next()
      }
      // sessionStorage.removeItem('user');
    }
  },
  // 管理后台
  {
    path: '/admin',
    component: admin,
  },
]

export default new Router({
  routes
})
