import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/home/home'
import City from './../views/city/city'
import Msite from './../views/msite/msite'
import Shop from './../views/shop/shop'
import Search from './../views/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/city/:id',
      component: City
    },
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/shop',
      component: Shop
    },
    {
      path: '/search/:location',
      component: Search
    }
  ]
})
