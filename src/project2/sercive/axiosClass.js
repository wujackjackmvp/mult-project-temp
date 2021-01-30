import axios from 'axios'
class AxiosService {
    constructor(options){
        let { baseURL, timeout, requestHandler, responseHanlder, errorHanlder } = options
        this.baseURL = baseURL
        this.timeout = timeout ? timeout : 60000
        this.requestHandler = requestHandler
        this.responseHanlder = responseHanlder
        this.errorHanlder = errorHanlder
    }
    create(){
        const service = axios.create({
            baseURL: this.baseURL, // api base_url
            timeout: this.timeout // 请求超时时间
        });
        service.interceptors.request.use(
            config => {
                return this.requestHandler(config)
            },
            err => Promise.reject(err))
        
        // http response 拦截器
        service.interceptors.response.use(
            response => {
                this.responseHanlder(response)
                return response
            },
            error => {
            // let message = error.response.data || error.response.message
            return this.errorHanlder(error)
        })        
        return service
    }
}

export default AxiosService