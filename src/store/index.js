import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
  

const actions = {}

const mutations = {
    getUserInfo(state){
        return state.userInfo
    },
    setUserInfo(state,newInfo){
        state.userInfo = newInfo
    },
    setUserPasswd(state,newPasswd){
        state.userInfo.password = newPasswd
    },
    getTerm(state){
        return state.term
    },
    setTerm(state,newTerm){
        state.term = newTerm
    }
}

const state = {
    userInfo:{},
    term:{}
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    plugins: [
        
        createPersistedState({
        storage: window.sessionStorage,
        reducer(data) {
            return {
                // 设置只储存state中的myData
                userInfo: data.userInfo,
                term : data.term
            }
        }
    })]
})

export default store