import axios from 'axios'


export function request(config) {
  // return new Promise((resolve, reject) => {

    const instance = axios.create({
      // baseURL: 'http://127.0.0.1:8000/',
      // baseURL: 'http://123.207.0.32:8000/api/hy',
      baseURL: 'http://106.54.54.237:8000/api/hy',
      timeout: 100000,
    });

    instance.interceptors.request.use(config => {
      console.log(config);
      return config
    }, err => {
      console.log(err);
    });
    instance.interceptors.response.use(res => {
      console.log(res);
      // config.headers = {'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/api/goodsimage/'};
      return res.data
    }, err => {
      console.log(err);
    });
    return instance(config)
  // })
}

