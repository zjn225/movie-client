import axios from 'axios'

import { HOST } from 'common/js/config'

export function getAllMovies(id) {
    const url = HOST + `/movies`
    return axios.get(url)
  }
  
export function getRelativeMovie(_id){
  const url = HOST + `/movies/${_id}`
  return axios.get(url)
}