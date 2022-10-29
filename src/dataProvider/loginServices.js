let axios = require('axios');
import {base_url} from './super.js';
export function checkLogin(data){
    let config = {
        method: 'post',
        url: base_url()+"login?userName="+data.userName+"&password="+data.password,
      };
      return axios(config);
}
export function registrationData(data){
  let config = {
      method: 'post',
      url: base_url()+"registration",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);
}
export function getAllBook(params){
    let config = {
        method: 'get',
        url: base_url()+"all-book?limit="+params.limit+"&offset="+params.offset
        +"&filter="+params.filter+"&sortBy="+params.sortBy+"&sortOrder="+params.sortOrder,
        headers: { },
      };
      return axios(config);
}