import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const SITE_NAME = 'Nabila Hannania'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { title: 'About' }
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import(/* webpackChunkName: "skills" */ '../views/SkillsView.vue'),
    meta: { title: 'Skills' }
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import(/* webpackChunkName: "experience" */ '../views/ExperienceView.vue'),
    meta: { title: 'Experience' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectView.vue'),
    meta: { title: 'Projects' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
    meta: { title: 'Contact' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // Only the query changed (e.g. project filter): keep the scroll position
    if (to.path === from.path) {
      return false
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} | ${SITE_NAME}`
    : `${SITE_NAME} — AI Engineer`
})

export default router
