let axios = require('axios');
import {base_url} from './super.js';
export function getReqBookData(params){
    let config = {
        method: 'get',
        url: base_url()+"approve-data?filter="+params.filter,
      };
      return axios(config);
}
export function postReqBookData(id,data){
  let config = {
      method: 'post',
      url: base_url()+"approve/"+id+"/books",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);
}