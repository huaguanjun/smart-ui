import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  // 自动生成路由 - 开始
  {
    path: '/-test-page',
    name: 'TestPage',
    component: () => import('../views/TestPage/index.vue'),
    meta: {
      title: 'TestPage'
    }
  },
// 自动生成路由 - 结束
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
