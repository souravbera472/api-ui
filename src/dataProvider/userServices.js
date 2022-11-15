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

export function postUserReqBookData(userId,data){
  let config = {
      method: 'post',
      url: base_url()+"user/"+userId+"/req-book",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);
}
export function getNotificationCount(userId){
  let config = {
      method: 'get',
      url: base_url()+"user/"+userId+"/notification",
    };
    return axios(config);
}
export function removeReqBooks(userId,bookIds){
  let config = {
      method: 'delete',
      url: base_url()+"user/"+userId+"/remove-req-book",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : bookIds
    };
    return axios(config);
}