import * as types from './mutation-types'
import {setStore,removeStore} from "../assets/js/util";

const mutations = {
  [types.SET_LOCATION_HISTORY](state,locationHistory){
    state.locationHistory = locationHistory;
  },
  [types.SET_CURRENT_LOCATION](state,location){
    state.currentLocation = location;
  },
  [types.SET_SEARCH_HISTORY](state,searches){
    state.searchHistory = searches;
  },
  [types.SET_SHOP_DETAIL](state,shopDetail){
    state.shopDetail = shopDetail;
  },
  [types.SET_USER_INFO](state,info){
    state.userInfo = info;
    state.login = true;
    setStore('user_id',info.user_id);
  },
  [types.SET_USER_NAME](state,name){
    state.userInfo = Object.assign({},state.userInfo,{
      username:name
    })
  },
  [types.SET_LOG_OUT](state){
    state.userInfo = null;
    state.login = false;
    removeStore('user_id');
  }
}

export default mutations;
