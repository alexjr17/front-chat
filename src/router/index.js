import { createRouter, createWebHistory } from 'vue-router';
import AuthRegister from '@/views/auth/AuthRegister.vue';
import AuthLogin from '@/views/auth/AuthLogin.vue';
import ChatIndex from '@/views/chat/ChatIndex.vue';

const routes = [
  {
    path: '/register',
    name: 'AuthRegister',
    component: AuthRegister,
    meta: { requiresGuest: true } // Indica que esta ruta debería ser accesible solo para usuarios no autenticados
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin,
    meta: { requiresGuest: true } // Indica que esta ruta debería ser accesible solo para usuarios no autenticados
  },
  {
    path: '/chat',
    name: 'ChatIndex',
    component: ChatIndex,
    meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
  },
  {
    path: '/:pathMatch(.*)*', // Ruta comodín para capturar todas las rutas no existentes
    redirect: '/login' // Redirige al login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const token = localStorage.getItem('accessToken');

  // If the route requires authentication and there's no token, redirect to login
  if (requiresAuth && !token) {
    next('/login');
  } 
  // If the route is for guests (login or register) and the user is already authenticated, redirect to chat
  else if (requiresGuest && token) {
    next('/chat');
  } 
  // If the route does not require authentication, proceed as normal
  else {
    next();
  }
});

export default router;
