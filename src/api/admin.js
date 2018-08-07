import axios from 'axios'
import { HOST } from 'common/js/config'

// 创建axios实例
const service = axios.create({
    baseURL: HOST, // node环境的不同，对应不同的baseURL
    timeout: 5000, // 请求的超时时间
    //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    // headers: {  
    // "Content-Type": "application/x-www-form-urlencoded"
    // },
    // withCredentials: true // 允许携带cookie
})


export function loginRequest(data) {
    const url = HOST + `/admin/login`
    return service.post(url, data)
}

export function getAllMoviesList() {
    const url = HOST + `/admin/movie/list`
    return service.get(url)
}

export function deleteMovie(id) {
    const url = HOST + `/admin/movies?id=${id}`
    return service.delete(url)
}

export function updateMovieItem(data) {
    const url = HOST + `/admin/movieItem`
    return service.put(url,data)
}