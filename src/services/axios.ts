import AXIOS, {AxiosInstance, RawAxiosRequestConfig, AxiosResponse} from "axios";

class Axios {
    private AxiosInstance: AxiosInstance | null = null;

    private get instance(): AxiosInstance {
        return this.AxiosInstance !== null ? this.AxiosInstance : this.createAxiosInstance();
    }

    createAxiosInstance() {
        const axiosInstance = AXIOS.create({
            baseURL: process.env.REACT_APP_REQRES_API_URL,
          })

          axiosInstance.interceptors.request.use((config) => {

            return config;
          }, (err) => Promise.reject(err));

          axiosInstance.interceptors.response.use(
            (response) => response,
            (err) => Promise.reject(err)
          );

          this.AxiosInstance = axiosInstance;

          return axiosInstance
    }

    request(config: RawAxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.request(config);
      }
}

const axios = new Axios();

export default axios;