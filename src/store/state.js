import {loadLoaction,loadSearches} from "../assets/js/cache";

const state = {
  /*地址记录*/
  locationHistory:loadLoaction(),
  /*当前地址*/
  currentLocation:{},
  /*搜索记录*/
  searchHistory:loadSearches(),
  /*店铺信息*/
  shopDetail:{}
}

export default state;
