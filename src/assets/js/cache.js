import storage from 'good-storage'

const LOCATION_KEY = '__location__';
const LOCATION_MAX_LEN = 15;
const SEARCH_KEY = '__search__';
const SEARCH_MAX_LEN = 15;


function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

/*保存地址*/
export function saveLocation(location) {
  let locations = storage.get(LOCATION_KEY, []);
  insertArray(locations, location, (item) => {
    return item === location
  }, LOCATION_MAX_LEN)
  storage.set(LOCATION_KEY, locations);
  return locations;
}

export function loadLoaction() {
  return storage.get(LOCATION_KEY, []);
}

export function clearLocation() {
  storage.remove(LOCATION_KEY);
  return [];
}

/*保存搜索记录*/
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  insertArray(searches, query, (item) => {
    return item === query
  }, LOCATION_MAX_LEN)
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function loadSearches() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, (item) => {
    return item === query;
  })
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function clearSearches() {
  storage.remove(SEARCH_KEY);
  return [];
}
