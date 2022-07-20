import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    components: {
      default: () => import("../views/layout/index.vue"),
      About: () => import("../views/AboutPage/index.vue"),
      Code: () => import("../views/CodePage/index.vue")
    },
    children: [
      {
        path: '',
        name: "HomePage",
        component: () => import("../views/HomePage/index.vue")
      },
      {
        path: 'detail/:id',
        name: 'DetailPage',
        props: route => ({ id: route.params.id }),
        component: () => import('../views/DetailPage/index.vue')
      }
    ]
  },
]

const Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default Router

// 侧边抽屉列表
// title 保持 2~3 个字
export const drawerList = [
  {
    name: 'About',
    title: '关于',
  },
  {
    name: 'Code',
    title: '代码库',
  }
]
