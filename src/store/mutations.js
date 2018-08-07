import * as types from './mutation-types'

const mutations = {
    [types.SET_ALL_MOVIE](state,allMovie){
        state.allMovie = allMovie
    },
    [types.SET_ALL_MOVIE_BACKUP](state,allMovieBackUp){
        state.allMovieBackUp = allMovieBackUp
    },
    [types.SET_MOVIE_ITEM](state,movie){
        state.movie = movie
    },
    [types.SET_CURRENTINDEX](state,currentIndex){
        state.currentIndex = currentIndex
    },
    [types.SET_MANAGESTATUS](state,manageStatus){
        state.manageStatus = manageStatus
    }
}

export default mutations