import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "HomePage",
    components: {
      default: () => import("../views/HomePage/index.vue"),
      About: () => import("../views/AboutPage/index.vue"),
      Code: () => import("../views/CodePage/index.vue")
    }
  },
]

const Router = createRouter({
  history: createWebHistory(),
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
