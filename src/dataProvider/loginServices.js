var axios = require('axios');

export function checkLogin(data){
    var config = {
        method: 'post',
        url: "http://192.168.0.236:8080/login?userName="+data.userName+"&password="+data.password,
        //headers: { },
      };
      return axios(config);
};
export function getAllBook(params){
    var config = {
        method: 'get',
        url: "http://192.168.0.236:8080/all-book?limit="+params.limit+"&offset="+params.offset
        +"&filter="+params.filter+"&sortBy="+params.sortBy+"&sortOrder="+params.sortOrder,
        headers: { },
      };
      return axios(config);
}