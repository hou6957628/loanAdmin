import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/home'
import accountCenter from '@/components/accountCenter'
import statisticalCenter from '@/components/statisticalCenter'
import productList from '@/components/productList'
import addHomeProductList from '@/components/addHomeProductList'
import editorHomeProductList from '@/components/editorHomeProductList'
import addProduct from '@/components/addProduct'
import addBannerProduct from '@/components/addBannerProduct'
import addIconProduct from '@/components/addIconProduct'
import addIconProduct2 from '@/components/addIconProduct2'
import addIconProduct3 from '@/components/addIconProduct3'
import addIconProduct4 from '@/components/addIconProduct4'
import addProductList from '@/components/addProductList'
import productStatistics from '@/components/productStatistics'
import operation from '@/components/operation'
import editorBannerProduct from '@/components/editorBannerProduct'
import editorIconProduct from '@/components/editorIconProduct'
import editorIconProduct2 from '@/components/editorIconProduct2'
import editorIconProduct3 from '@/components/editorIconProduct3'
import editorIconProduct4 from '@/components/editorIconProduct4'
import editorProduct from '@/components/editorProduct'
import editorProductList from '@/components/editorProductList'
import Recharge from '@/components/Recharge'
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

Vue.prototype.baseUrl="60.205.216.141";
// Vue.prototype.baseUrl="39.107.228.38:31999";
// Vue.prototype.baseUrl="192.168.20.216:9999";
Vue.prototype.uurl="window.location.origin";

const vueRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: home
    },
    {
      path: '/productList/:name',
      name: 'productList',
      meta: {
        requireAuth: true
      },
      component: productList
    },
    {
      path: '/productList',
      name: 'productList',
      meta: {
        requireAuth: true
      },
      component: productList
    },
    {
      path: '/addHomeProductList',
      name: 'addHomeProductList',
      meta: {
        requireAuth: true
      },
      component: addHomeProductList
    },
    {
      path: '/editorHomeProductList/:id',
      name: 'editorHomeProductList',
      meta: {
        requireAuth: true
      },
      component: editorHomeProductList
    },
    {
      path: '/accountCenter',
      name: 'accountCenter',
      meta: {
        requireAuth: true
      },
      component: accountCenter
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      meta: {
        requireAuth: true
      },
      component: addProduct
    },
    {
      path: '/editorProduct',
      name: 'editorProduct',
      meta: {
        requireAuth: true
      },
      component: editorProduct
    },
    {
      path: '/statisticalCenter',
      name: 'statisticalCenter',
      meta: {
        requireAuth: true
      },
      component: statisticalCenter
    },
    {
      path: '/addBannerProduct',
      name: 'addBannerProduct',
      meta: {
        requireAuth: true
      },
      component: addBannerProduct
    },
    {
      path: '/addIconProduct',
      name: 'addIconProduct',
      meta: {
        requireAuth: true
      },
      component: addIconProduct
    },
    {
      path: '/addIconProduct2',
      name: 'addIconProduct2',
      meta: {
        requireAuth: true
      },
      component: addIconProduct2
    },
    {
      path: '/addIconProduct3',
      name: 'addIconProduct3',
      meta: {
        requireAuth: true
      },
      component: addIconProduct3
    },
    {
      path: '/addIconProduct4',
      name: 'addIconProduct4',
      meta: {
        requireAuth: true
      },
      component: addIconProduct4
    },
    {
      path: '/addProductList',
      name: 'addProductList',
      meta: {
        requireAuth: true
      },
      component: addProductList
    },
    {
      path: '/productStatistics/:id',
      name: 'productStatistics',
      meta: {
        requireAuth: true
      },
      component: productStatistics
    },
    {
      path: '/operation/:id/:countType',
      name: 'operation',
      meta: {
        requireAuth: true
      },
      component: operation
    },
    {
      path: '/Recharge/:id',
      name: 'Recharge',
      meta: {
        requireAuth: true
      },
      component: Recharge
    },
    {
      path: '/editorBannerProduct/:id',
      name: 'editorBannerProduct',
      meta: {
        requireAuth: true
      },
      component: editorBannerProduct
    },
    {
      path: '/editorIconProduct/:id',
      name: 'editorIconProduct',
      meta: {
        requireAuth: true
      },
      component: editorIconProduct
    },
    {
      path: '/editorIconProduct2/:id',
      name: 'editorIconProduct2',
      meta: {
        requireAuth: true
      },
      component: editorIconProduct2
    },
    {
      path: '/editorIconProduct3/:id',
      name: 'editorIconProduct3',
      meta: {
        requireAuth: true
      },
      component: editorIconProduct3
    },
    {
      path: '/editorIconProduct4/:id',
      name: 'editorIconProduct4',
      meta: {
        requireAuth: true
      },
      component: editorIconProduct4
    },
    {
      path: '/editorProduct/:id',
      name: 'editorProduct',
      meta: {
        requireAuth: true
      },
      component: editorProduct
    },
    {
      path: '/editorProductList/:id',
      name: 'editorProductList',
      meta: {
        requireAuth: true
      },
      component: editorProductList
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



