import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

class Axios {
  static instance: any;

  static async init() {
    this.instance = axios.create();

    // Add a request interceptor
    this.instance.interceptors.request.use(function (config: any) {
      console.log("running before request is sent")
      // Do something before request is sent
      // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      config.headers['Content-Type'] = 'application/json';
      return config;
    }, function (error: AxiosError) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.instance.interceptors.response.use(function (response: AxiosResponse) {
      console.log("running after request is sent")

      // Do something with response data
      return response;
    }, function (error:AxiosError) {
      // Do something with response error
      if (error.response?.status === 401) {
        // handle unauthorized error
      }
      return Promise.reject(error);
    });
  }

  static async get(url: string) {
    try {
      const response = await this.instance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async post(url: string, data: any) {
    try {
      const response = await this.instance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async put(url: string, data: any) {
    try {
      const response = await this.instance.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(url: string) {
    try {
      const response = await this.instance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

Axios.init();

export default Axios;
