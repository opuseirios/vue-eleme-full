import * as types from './mutation-types'

const mutations = {
  [types.SET_LOCATION_HISTORY](state,locationHistory){
    state.locationHistory = locationHistory;
  }
}

export default mutations;
