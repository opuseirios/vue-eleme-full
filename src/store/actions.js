import {saveLocation,clearLocation} from "../assets/js/cache";
import * as types from './mutation-types'

export const saveLocationHistory = function({commit},location){
  commit(types.SET_LOCATION_HISTORY,saveLocation(location));
}

export const clearLocationHistory = function({commit}){
  commit(types.SET_LOCATION_HISTORY,clearLocation);
}
