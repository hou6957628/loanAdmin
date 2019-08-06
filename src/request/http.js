// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs';
import Vue from "vue"; // 引入qs模块，用来序列化post类型的数据，后面会提到

axios.defaults.timeout = 10000;//设置统一的超时时间10s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Authorization'] = localStorage.token;
axios.defaults.headers.get['Authorization'] = localStorage.token;
//post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，
//即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
/**
 * get 方法，对应get请求
 * @param url  请求的url地址
 * @param parmas 请求时携带的参数
 */
export function get(url, parmas) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: parmas
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param url 请求的url地址
 * @param parmas 请求时携带的参数
 * @returns {Promise<any>}
 */
export function post(url, parmas) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(parmas))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      })
  })
}
