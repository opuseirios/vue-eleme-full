import axios from 'axios'
import {getStore} from "./util";

export function getUserInfo() {
  const userId = getStore('user_id');
  if(!userId){
    return
  }
  let userInfo = null;
   axios.get(`https://elm.cangdu.org/v1/user?user_id=${userId}`)
    .then((res)=>{
      if(res.status === 200){
        userInfo = res.data;
        console.log(userInfo);
        return userInfo;
      }
    });
}

