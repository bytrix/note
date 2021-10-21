import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import FlatToNested from 'flat-to-nested'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: ['a']
  },
  mutations: {
    GET_NOTES(state, payload) {
      const flatToNested = new FlatToNested({
        id: '_id',
        parent: 'parent_id',
      })
      state.notes = flatToNested.convert(payload)
    }
  },
  actions: {
    getNotes(context) {
      axios.get('/api/notes').then(({data}) => {
        context.commit('GET_NOTES', data.data)
      })
    },
    addNote(context) {
      axios.post('/api/notes').then(({data}) => {
        console.log('add note', data)
        context.commit('ADD_NOTE', data)
      })
    }
  },
  getters: {
    notes(state) {
      return state.notes
    }
  },
  modules: {
  }
})
