let axios = require('axios');
import {base_url} from './super.js';
export function getUserBookData(userId){
    let config = {
        method: 'get',
        url: base_url()+"user/"+userId+"/books",
      };
      return axios(config);
}
export function getUserReqBookData(userId){
  let config = {
      method: 'get',
      url: base_url()+"user/"+userId+"/req-book",
    };
    return axios(config);
}