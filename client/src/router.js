import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Calendar from './views/Calendar.vue'
import Todo from './views/Todo.vue'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'about',
      component: About
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/:date',
      name: 'todo',
      component: Todo
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },

  ]
})
