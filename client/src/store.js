import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks:''
  },  
  mutations: {
    setTask(state,payload){
      state.tasks = payload
    }
  },
  actions: {
    getAllTaskStore({commit},payload){
      console.log("OBJ USER ID",payload)
      axios.get(`http://localhost:8000/task/${payload.userid}/${payload.dateparam}`)
      .then(({data})=>{
           commit('setTask',data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
  }
})
