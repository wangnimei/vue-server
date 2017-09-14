import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      item: null
    },
    actions: {
      fetchItem ({ commit }) {
        return axios.get('http://localhost:3000/api').then((res) => {
          commit('setItem', res.data)
        })
      }
    },
    mutations: {
      setItem (state, data) {
        state.item = data
      }
    }
  })
}
