import { createRouter, createWebHashHistory } from "vue-router"
import useStore from "../store"

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

// 进入新路由时回到顶部, 路由回退时回到历史高度
Router.beforeEach((to, from) => {
  const store = useStore()
  const scrollNode = store.scrollNode
  if (!scrollNode) return

  if (to.fullPath === store.scrollData.routeHistory.at(-1)?.path) {
    const preRoute = store.scrollData.routeHistory.pop()
    scrollNode.scrollTo({ top: preRoute.scrollTop })
  } else {
    store.scrollData.routeHistory.push({
      path: from.fullPath,
      scrollTop: scrollNode.scrollTop
    })
    scrollNode.scrollTo({ top: 0 })
  }
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
