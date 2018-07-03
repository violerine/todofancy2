<template>
<div>
<div>


<ul class="list-group">
  <li class="list-group-item">
    
    <div class="container col-md-6">
    <b>{{todo.task}}</b>
    </div>
    <button @click='deleteTask(todo._id)' class="btn btn-default">Delete</button>

  </li>
</ul>


</div>
</div>
</template>


<script>

import {mapActions} from 'vuex'

export default {
  props : ['todo'],
  methods :{
    deleteTask(todoId){
      var userid = localStorage.getItem('userid')
      var routeParam = this.$route.params.date
      var idx = routeParam.indexOf("(")
      console.log("ROUTE PARAM?", routeParam)
      var routeParamSliced = routeParam.slice(0,idx-1)
      this.taskDate=routeParamSliced
      var replaceSpaces = routeParamSliced.replace(/ /g,"+")
      axios.delete(`http://localhost:8000/task/delete/${todoId}`)
      .then(task=>{
        console.log("DELETED TASK",task)
            this.$store.dispatch('getAllTaskStore',{
                userid : userid,
                dateparam : replaceSpaces
            })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
