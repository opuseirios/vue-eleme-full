import * as types from './mutation-types'

const mutations = {
  [types.SET_LOCATION_HISTORY](state,locationHistory){
    state.locationHistory = locationHistory;
  },
  [types.SET_CURRENT_LOCATION](state,location){
    state.currentLocation = location;
  }
}

export default mutations;
