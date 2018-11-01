import {saveLocation, clearLocation, saveSearch, clearSearches, deleteSearch} from "../assets/js/cache";
import * as types from './mutation-types'
import {getStore} from "../assets/js/util";
import axios from 'axios'

export const saveLocationHistory = function ({commit}, location) {
  commit(types.SET_LOCATION_HISTORY, saveLocation(location));
}

export const clearLocationHistory = function ({commit}) {
  commit(types.SET_LOCATION_HISTORY, clearLocation);
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearches);
}
/*获取用户信息*/
export const getUserInfo = function ({commit}, {user_id}) {
  if (!user_id) {
    return;
  }
  axios.get(`https://elm.cangdu.org/v1/user?user_id=${user_id}`)
    .then((res) => {
      if (res.status === 200) {
        commit(types.SET_USER_INFO, res.data);
      }
    });
}
