import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login'
// import home from '@/home'
// import accountCenter from '@/components/accountCenter'
// import statisticalCenter from '@/components/statisticalCenter'
// import productList from '@/components/productList'
// import addHomeProductList from '@/components/addHomeProductList'
// import editorHomeProductList from '@/components/editorHomeProductList'
// import addProduct from '@/components/addProduct'
// import addBannerProduct from '@/components/addBannerProduct'
// import addIconProduct from '@/components/addIconProduct'
// import addIconProduct2 from '@/components/addIconProduct2'
// import addIconProduct3 from '@/components/addIconProduct3'
// import addIconProduct4 from '@/components/addIconProduct4'
// import addProductList from '@/components/addProductList'
// import productStatistics from '@/components/productStatistics'
// import operation from '@/components/operation'
// import editorBannerProduct from '@/components/editorBannerProduct'
// import editorIconProduct from '@/components/editorIconProduct'
// import editorIconProduct2 from '@/components/editorIconProduct2'
// import editorIconProduct3 from '@/components/editorIconProduct3'
// import editorIconProduct4 from '@/components/editorIconProduct4'
// import editorProduct from '@/components/editorProduct'
// import editorProductList from '@/components/editorProductList'
// import pageStatisticalCenter from '@/components/pageStatisticalCenter'
// import channelLatitude from '@/components/channelLatitude'
// import productLatitude from '@/components/productLatitude'
//小锦鲤
// import addIcon1List from '@/components/flowPool/addIcon1List'
// import addIcon2List from '@/components/flowPool/addIcon2List'
// import addIcon3List from '@/components/flowPool/addIcon3List'
// import addIcon4List from '@/components/flowPool/addIcon4List'
// import addIcon5List from '@/components/flowPool/addIcon5List'
// import addLookList from '@/components/flowPool/addLookList'
// import editorIcon1List from '@/components/flowPool/editorIcon1List'
// import editorIcon2List from '@/components/flowPool/editorIcon2List'
// import editorIcon3List from '@/components/flowPool/editorIcon3List'
// import editorIcon4List from '@/components/flowPool/editorIcon4List'
// import editorIcon5List from '@/components/flowPool/editorIcon5List'
// import editorLookList from '@/components/flowPool/editorLookList'
// import trapezoidal from '@/components/trapezoidal'
// import IntoStatistical from '@/components/IntoStatistical'
//
// import Recharge from '@/components/Recharge'
import axios from 'axios'

import qs from 'qs';

Vue.use(Router);
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token=='') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      Router.replace({
        path: '/login'
      })
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          Router.replace({
            path: '/login',
            query: {redirect: Router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

// Vue.prototype.baseUrl="60.205.216.141";
Vue.prototype.baseUrl="47.93.234.167:31999";
// Vue.prototype.baseUrl="192.168.20.190:2881";
// Vue.prototype.baseUrl="192.168.20.216:9999";
Vue.prototype.uurl="window.location.origin";

const vueRouter = new Router({
  routes: [
    {
      path: '*',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
    },
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/home'],resolve),
    },
    {
      path: '/productList/:name',
      name: 'productList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/productList'],resolve),
    },
    {
      path: '/productList',
      name: 'productList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/productList'],resolve),
    },
    {
      path: '/addHomeProductList',
      name: 'addHomeProductList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addHomeProductList'],resolve),
    },
    {
      path: '/editorHomeProductList/:id',
      name: 'editorHomeProductList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorHomeProductList'],resolve),
    },
    {
      path: '/accountCenter',
      name: 'accountCenter',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/accountCenter'],resolve),
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addProduct'],resolve),
    },
    {
      path: '/editorProduct',
      name: 'editorProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorProduct'],resolve),
    },
    {
      path: '/statisticalCenter',
      name: 'statisticalCenter',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/statisticalCenter'],resolve),
    },
    {
      path: '/addBannerProduct',
      name: 'addBannerProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addBannerProduct'],resolve),
    },
    {
      path: '/addIconProduct',
      name: 'addIconProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addIconProduct'],resolve),
    },
    {
      path: '/addIconProduct2',
      name: 'addIconProduct2',
      meta: {
        requireAuth: true
      },
      component:resolve => require(['@/components/addIconProduct2'],resolve),
    },
    {
      path: '/addIconProduct3',
      name: 'addIconProduct3',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addIconProduct3'],resolve),
    },
    {
      path: '/addIconProduct4',
      name: 'addIconProduct4',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addIconProduct4'],resolve),
    },
    {
      path: '/addProductList',
      name: 'addProductList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/addProductList'],resolve),
    },
    {
      path: '/productStatistics/:id',
      name: 'productStatistics',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/productStatistics'],resolve),
    },
    {
      path: '/operation/:id/:countType',
      name: 'operation',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/operation'],resolve),
    },
    {
      path: '/Recharge/:id',
      name: 'Recharge',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/Recharge'],resolve),
    },
    {
      path: '/editorBannerProduct/:id',
      name: 'editorBannerProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorBannerProduct'],resolve),
    },
    {
      path: '/editorIconProduct/:id',
      name: 'editorIconProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorIconProduct'],resolve),
    },
    {
      path: '/editorIconProduct2/:id',
      name: 'editorIconProduct2',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorIconProduct2'],resolve),
    },
    {
      path: '/editorIconProduct3/:id',
      name: 'editorIconProduct3',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorIconProduct3'],resolve),
    },
    {
      path: '/editorIconProduct4/:id',
      name: 'editorIconProduct4',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorIconProduct4'],resolve),
    },
    {
      path: '/editorProduct/:id',
      name: 'editorProduct',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorProduct'],resolve),
    },
    {
      path: '/editorProductList/:id',
      name: 'editorProductList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/editorProductList'],resolve),
    },
    {
      path: '/pageStatisticalCenter',
      name: 'pageStatisticalCenter',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/pageStatisticalCenter'],resolve),
    },
    {
      path: '/productLatitude',
      name: 'productLatitude',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/productLatitude'],resolve),
    },
    {
      path: '/channelLatitude',
      name: 'channelLatitude',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/channelLatitude'],resolve),
    },
    {
      path: '/addIcon1List',
      name: 'addIcon1List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/addIcon1List'],resolve),
    },
    {
      path: '/addIcon2List',
      name: 'addIcon2List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/addIcon2List'],resolve),
    },
    {
      path: '/addIcon3List',
      name: 'addIcon3List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/addIcon3List'],resolve),
    },
    {
      path: '/addIcon4List',
      name: 'addIcon4List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/addIcon4List'],resolve),
    },
    {
      path: '/addIcon5List',
      name: 'addIcon5List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/addIcon5List'],resolve),
    },
    {
      path: '/addLookList',
      name: 'addLookList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/addLookList'],resolve),
    },
    {
      path: '/editorIcon1List/:id',
      name: 'editorIcon1List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/editorIcon1List'],resolve),
    },
    {
      path: '/editorIcon2List/:id',
      name: 'editorIcon2List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/editorIcon2List'],resolve),
    },
    {
      path: '/editorIcon3List/:id',
      name: 'editorIcon3List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/editorIcon3List'],resolve),
    },
    {
      path: '/editorIcon4List/:id',
      name: 'editorIcon4List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/editorIcon4List'],resolve),
    },
    {
      path: '/editorIcon5List/:id',
      name: 'editorIcon5List',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/editorIcon5List'],resolve),
    },
    {
      path: '/editorLookList/:id',
      name: 'editorLookList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/flowPool/editorLookList'],resolve),
    },
    {
      path: '/trapezoidal/:name1/:name2',
      name: 'trapezoidal',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/trapezoidal'],resolve),
    },
    {
      path: '/IntoStatistical',
      name: 'IntoStatistical',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/components/IntoStatistical'],resolve),
    },
  ],

});
vueRouter.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("token")) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        // query: {redirect: vueRouter.currentRoute.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
export default vueRouter



