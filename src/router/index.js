import { createRouter, createWebHistory } from 'vue-router';
import AuthRegister from '../views/auth/AuthRegister.vue';
import AuthLogin from '../views/auth/AuthLogin.vue';
import ChatIndex from '../views/chat/ChatIndex.vue';

const routes = [
  {
    path: '/register',
    name: 'AuthRegister',
    component: AuthRegister
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin
  },
  {
    path: '/chat',
    name: 'ChatIndex',
    component: ChatIndex,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('accessToken');

  if (requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
