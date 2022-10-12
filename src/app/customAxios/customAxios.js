import axios from 'axios'

let customAxios = axios.create()
  
  //- or after instance has been created
  
  //- or before a request is made
  // using Interceptors
  customAxios.interceptors.request.use(config => {
    config.headers.post['Access-Control-Allow-Origin'] = 'https://crudcrud.com/';
    config.headers.post['withCredentials'] = true;
    config.headers.post['Access-Control-Allow-Credentials'] = true;
    config.headers.post['Content-Type'] = "application/json";
    config.headers.post['Cross-Origin-Resource-Policy'] = "cross-origin";
    config.headers.post['mode'] = "no-cors";


    
    return config;
  });

  export default customAxios