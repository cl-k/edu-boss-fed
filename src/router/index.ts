import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true // 自定义数据
    }, // meta 默认就是一个空对象
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () =>
          import(
            /* webpackChunkName: 'allocMenu' */ '@/views/role/alloc-menu.vue'
          ),
        meta: {
          requiresAuth: true
        },
        props: true // 将路由路径参数映射到组件的 props 数据中，前提是路由动态路径参数名称与子组件的 props 参数一致
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () =>
          import(
            /* webpackChunkName: 'menuCreateEdit' */ '@/views/menu/create.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () =>
          import(
            /* webpackChunkName: 'menuCreateEdit' */ '@/views/menu/edit.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          )
      },
      {
        path: '/resourceCategory',
        name: 'resource-category',
        component: () =>
          import(
            /* webpackChunkName: 'resourceCategory' */ '@/views/resource/category.vue'
          )
      },
      {
        path: '/course',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () =>
          import(
            /* webpackChunkName: 'courseCreate' */ '@/views/course/create.vue'
          )
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () =>
          import(
            /* webpackChunkName: 'courseEdit' */ '@/views/course/edit.vue'
          ),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () =>
          import(
            /* webpackChunkName: 'courseSection' */ '@/views/course/section.vue'
          ),
        props: true
      },
      {
        path: '/course/:courseId/vedio',
        name: 'course-vedio',
        component: () =>
          import(
            /* webpackChunkName: 'courseVedio' */ '@/views/course/vedio.vue'
          ),
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advertSpace' */ '@/views/advert-space/index.vue'
          )
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
// to: 要去哪里的路由信息
// from: 从哪里来的路由信息
// next： 通行的标志
router.beforeEach((to, from, next) => {
  // console.log('to => ', to)
  // console.log('from => ', from)

  // to.matched 是一个数组（匹配到的是路由记录）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 没有登陆状态，跳转到登录页面
      next({
        name: 'login',
        query: {
          // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next() // 允许通过
  }

  // // 路由守卫中一定要调用 next，否则页面无法展示
  // next()

  // 这种方式太死板
  // if (to.path !== '/login') {
  //   // 校验登陆状态
  // }
})

export default router
