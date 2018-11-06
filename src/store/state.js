import {loadLoaction,loadSearches,loadAddress} from "../assets/js/cache";

const state = {
  /*地址记录*/
  locationHistory:loadLoaction(),
  /*当前地址*/
  currentLocation:{},
  /*搜索记录*/
  searchHistory:loadSearches(),
  /*店铺信息*/
  shopDetail:{},
  /*用户信息*/
  userInfo: {},
  /*购物车*/
  cartList: [],
  /*添加详细地址*/
  addAddress:'',
  /*地址列表*/
  addressList:loadAddress()
}

export default state;
