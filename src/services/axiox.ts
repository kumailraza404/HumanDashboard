import { googleLogout } from "@react-oauth/google";
import axios, { AxiosError, AxiosResponse } from "axios";
import { signOut } from "../store/slice/userSlice";
import { store } from "../store/store";

class Axios {
  static instance: any;
  static async init() {
    this.instance = axios.create();

    // Add a request interceptor
    this.instance.interceptors.request.use(
      function (config: any) {
        console.log("running before request is sent");
        // Do something before request is sent
        const token = localStorage.getItem("token")?.replace(/"/g, "");

        console.log(token, "token");
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      function (error: AxiosError) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        // Do something with response data
        // store.dispatch(signOut());
        return response;
      },
      function (error: AxiosError) {
        // Do something with response error
        if (error.response?.status === 401) {
          // handle unauthorized error
          console.log("eroor unauthorized");
          store.dispatch(signOut());
          googleLogout();
        }
        return Promise.reject(error);
      },
    );
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
