import * as types from './mutation-types'

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
  }
}

export default mutations;
