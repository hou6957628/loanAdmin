/**
 * api接口统一管理
 */
import {get, post} from "./http";
//请求产品列表接口
export const getProductList = p =>get("http://47.93.234.167:31999/flowPool/admin/product/list",p);
//产品上下架接口
export const obtainedProduct = p =>post("http://47.93.234.167:31999/flowPool/admin/product/obtainedProduct",p);
