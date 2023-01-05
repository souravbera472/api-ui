let axios = require('axios');
import {base_url} from './super.js';
export function getReqBookData(params){
    let config = {
        method: 'get',
        url: base_url()+"approve-data?filter="+params.filter,
      };
      return axios(config);
}
export function getReqRenewalBookData(params){
  let config = {
      method: 'get',
      url: base_url()+"req-renewal-books?filter="+params.filter+"&type="+params.type,
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

export function approveRenewalRequest(id,data,type){
  let config = {
      method: 'post',
      url: base_url()+"renewal/"+id+"/books?type="+type,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);
}

export function addNewBook(data){
  let config = {
      method: 'post',
      url: base_url()+"/add-book",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);
}