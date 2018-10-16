import {saveLocation,clearLocation,saveSearch,clearSearches,deleteSearch} from "../assets/js/cache";
import * as types from './mutation-types'

export const saveLocationHistory = function({commit},location){
  commit(types.SET_LOCATION_HISTORY,saveLocation(location));
}

export const clearLocationHistory = function({commit}){
  commit(types.SET_LOCATION_HISTORY,clearLocation);
}

export const saveSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}
export const deleteSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}
export const clearSearchHistory = function({commit}){
  commit(types.SET_SEARCH_HISTORY,clearSearches);
}
