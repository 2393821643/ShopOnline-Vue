import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome'
import UserLoginByCode from '@/views/UserLoginByCode'
import UserLoginByPassword from '@/views/UserLoginByPassword'
import ChangePassword from '@/views/ChangePassword'
import Menu from '@/views/Menu'
import SearchGoods from '@/views/SearchGoods'
import FlashGoods from '@/views/FlashGoods'
import NewGoods from '@/views/NewGoods'
import ShopCart from '@/views/ShopCart'
import MyOrders from '@/views/MyOrders'
import UserMessage from '@/views/UserMessage'
import AdminLogin from '@/views/AdminLogin'
import AdminMenu from '@/views/AdminMenu'
import AdminSearch from '@/views/AdminSearch'
import AdminFindGoodsId from '@/views/AdminFindGoodsId'
import AdminAddGoods from '@/views/AdminAddGoods'
import AdminFindOrdersId from '@/views/AdminFindOrdersId'
import AdminFindOrdersUser from '@/views/AdminFindOrdersUser'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/code-login',
    name: 'UserLoginByCode',
    component: UserLoginByCode
  },
  {
    path: '/password-login',
    name: 'UserLoginByPassword',
    component: UserLoginByPassword
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/search',
    name: 'SearchGoods',
    component: SearchGoods
  },
  {
    path: '/flash',
    name: 'FlashGoods',
    component: FlashGoods
  },
  {
    path: '/new-goods',
    name: 'NewGoods',
    component: NewGoods
  },
  {
    path: '/shop-cart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: MyOrders
  },
  {
    path: '/user-message',
    name: 'UserMessage',
    component: UserMessage
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin-menu',
    name: 'AdminMenu',
    component: AdminMenu
  },
  {
    path: '/admin-search',
    name: 'AdminSearch',
    component: AdminSearch
  },
  {
    path: '/admin-find-goods-id',
    name: 'AdminFindGoodsId',
    component: AdminFindGoodsId
  },
  {
    path: '/admin-add-goods',
    name: 'AdminAddGoods',
    component: AdminAddGoods
  },
  {
    path: '/admin-find-orders-id',
    name: 'AdminFindOrdersId',
    component: AdminFindOrdersId
  },
  {
    path: '/admin-find-orders-user',
    name: 'AdminFindOrdersUser',
    component: AdminFindOrdersUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
