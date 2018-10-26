import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/home/home'
import City from './../views/city/city'
import Msite from './../views/msite/msite'
import Shop from './../views/shop/shop'
import Search from './../views/search/search'
import ShopDetail from './../views/shop/children/shopDetail/shopDetail'
import Food from './../views/food/food'
import Profile from './../views/profile/profile'
import Login from './../views/login/login'
import Forget from './../views/forget/forget'

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
      component: Shop,
      children: [
        {
          path: '/shop/shopDetail',
          component: ShopDetail
        }
      ]
    },
    {
      path: '/search/:location',
      component: Search
    },
    {
      path: '/food',
      component: Food
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/forget',
      component: Forget
    }
  ]
})
