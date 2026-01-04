import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AdminPanel from './components/AdminPanel.vue'
import AdminLogin from './components/AdminLogin.vue'
import LearnMore from './components/LearnMore.vue'
import GivingPage from './components/GivingPage.vue'
import OurPastors from './components/OurPastors.vue'
import BlogPage from './components/BlogPage.vue'
import BlogPostDetail from './components/BlogPostDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/about',
    redirect: { name: 'Home', hash: '#about' }
  },
  {
    path: '/history',
    name: 'History',
    component: LearnMore
  },
  {
    path: '/pastors',
    name: 'Pastors',
    component: OurPastors
  },
  {
    path: '/giving',
    name: 'Giving',
    component: GivingPage
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostDetail
  },
  {
    path: '/livestream',
    redirect: { name: 'Home', hash: '#live' }
  },
  {
    path: '/sermons',
    redirect: { name: 'Home', hash: '#sermons' }
  },
  {
    path: '/contact',
    redirect: { name: 'Home', hash: '#contact' }
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// Navigation guard for admin route
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Authentication check removed - should be handled by backend session
    // For now, allow access (implement proper session-based auth)
    next()
  } else {
    next()
  }
})

export default router
