import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import FlatToNested from 'flat-to-nested'

Vue.use(Vuex)

// const host = 'https://blog-api-2g8nea5tcfdeadd4-1304508799.ap-shanghai.app.tcloudbase.com'
const host = ''

export default new Vuex.Store({
  state: {
    notes: []
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
      axios.get(`${host}/api/notes`).then(({data}) => {
        context.commit('GET_NOTES', data.data)
      })
    },
    addNote(context, {payload}) {
      return axios.post(`${host}/api/notes`, payload).then(({data}) => {
        context.commit('ADD_NOTE', data)
      })
    },
    deleteNote(context, {payload}) {
      const { _id } = payload
      return axios.delete(`${host}/api/notes/${_id}`).then(({data}) => {
        context.commit('DELETE_NOTE', data)
      })
    }
  },
  getters: {
    notes(state) {
      const notes = state.notes
      if(notes instanceof Array) {
        return notes
      } else if(notes instanceof Object && notes._id) {
        return [notes]
      } else if(notes instanceof Object && !notes._id) {
        return notes.children
      } else {
        return []
      }
    }
  },
  modules: {
  }
})
