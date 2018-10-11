import {loadLoaction} from "../assets/js/cache";

const state = {
  /*地址记录*/
  locationHistory:loadLoaction(),
  /*当前地址*/
  currentLocation:{},
}

export default state;
