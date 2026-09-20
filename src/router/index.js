/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const routesWithLayouts = routes.map(route => {
  // Verifica rotas de autenticação e aplica o layout 'auth'
  if (route.path === '/auth') {
    return {
      ...route,
      meta: {
        ...route.meta,
        layout: 'auth',
      },
    }
  }

  return route
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(
    [
      ...routesWithLayouts,
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/errors/NotFound.vue'),
        meta: {
          layout: 'auth',
        },
      },
    ]),

})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/professional/') {
    return next('/auth/sign-in')
  }
  next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
    else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
