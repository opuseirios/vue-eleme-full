import storage from 'good-storage'

const LOCATION_KEY = '__location__';
const LOCATION_MAX_LEN = 15;


function insertArray(arr,val,compare,maxLen){
  const index = arr.findIndex(compare);
  if(index===0){
    return;
  }
  if(index>0){
    arr.splice(index,1)
  }
  arr.unshift(val);
  if(maxLen&&arr.length>maxLen){
    arr.pop();
  }
}

function deleteFromArray(arr,compare){
  const index = arr.findIndex(compare);
  if(index>-1){
    arr.splice(index,1);
  }
}

export function saveLocation (location){
  let locations = storage.get(LOCATION_KEY,[]);
  insertArray(locations,location,(item)=>{
    return item === location
  },LOCATION_MAX_LEN)
  storage.set(LOCATION_KEY,locations);
  return locations;
}

export function loadLoaction(){
  return storage.get(LOCATION_KEY,[]);
}

export function clearLocation(){
  storage.remove(LOCATION_KEY);
  return [];
}
