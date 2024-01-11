import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WriteView from '../views/routine-write.vue'
import ShareView from '../views/routine-share.vue'
import MainView from '../views/main.vue'
import MyRoutineView from '../views/my-routine.vue'
// import SettingsView from '../views/settings.vue'
import MyPageView from '../views/my-page.vue'
import LoginView from '../views/LoginView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/write',
    name: 'write',
    component: WriteView
  },
  {
    path: '/share',
    name: 'share',
    component: ShareView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/routine',
    name: 'routine',
    component: MyRoutineView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 로그인 유지
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    // 인증이 필요한 페이지에 접근하려고 할 때
    next('/login'); // 로그인 페이지로 리디렉션
  } else {
    next();
  }
});

export default router
