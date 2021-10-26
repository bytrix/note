import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import FlatToNested from 'flat-to-nested'

Vue.use(Vuex)

// const host = 'https://blog-api-2g8nea5tcfdeadd4-1304508799.ap-shanghai.app.tcloudbase.com'
const host = ''

export default new Vuex.Store({
  state: {
    notes: [],
    note: {}
  },
  mutations: {
    GET_NOTES(state, payload) {
      state.notes = payload
    },
    GET_NOTE(state, payload) {
      if(!payload) return
      const { data } = payload
      if(data.length === 1) {
        state.note = data[0]
      } else {
        state.note = {}
      }
    }
  },
  actions: {
    getNotes(context) {
      axios.get(`${host}/api/notes`).then(({data}) => {
        context.commit('GET_NOTES', data.data)
      })
    },
    getNote(context, {payload}) {
      const { _id } = payload
      axios.get(`${host}/api/notes/${_id}`).then(({data}) => {
        context.commit('GET_NOTE', data)
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
      const flatToNested = new FlatToNested({
        id: '_id',
        parent: 'parent_id',
      })
      const notes = flatToNested.convert(state.notes)
      if(notes instanceof Array) {
        return notes
      } else if(notes instanceof Object && notes._id) {
        return [notes]
      } else if(notes instanceof Object && !notes._id) {
        return notes.children
      } else {
        return []
      }
    },
    note(state) {
      return state.note
    }
  },
  modules: {
  }
})
