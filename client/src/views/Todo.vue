<template>
<div>

  <Navbar/>
<div class="container">


 <button type="button" class="btn btn-default" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">New Task</button>
 <!-- <button @click ="getAllTasks" type="button" class="btn btn-default">Show All Task</button> -->
 <br><br>
    <h2 v-if="tasks.length!==0"> Showing all Task in {{taskDate}}</h2>
    <div v-if="tasks.length===0" class="alert alert-warning" role="alert">You don't have any Todos, Start creating one :)</div>
    <div v-for="(todo,index) in tasks" :key="index"  class ="alltask">

    <todolist :todo="todo"></todolist>
    </div>


<!-- MODAL --> 

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel">New message</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="message-text" class="control-label">Write your task</label>
            <textarea v-model ="todo" class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button @click="addNewTask" type="button" data-dismiss="modal" class="btn btn-info">Save</button>
      </div>
    </div>
  </div>
</div>

<!-- MODAL END-->


</div> 
</div>
</template>

<script>
import todolist from '@/components/todolist.vue'
import Navbar from '@/components/Navbar.vue'

import {mapState, mapActions, Store} from 'vuex'
import { locale } from 'moment';

export default {
  data:function(){
    return{
      todo:'',
      taskDate:'',
      status:''
    }
  },
  created:function(){
    this.getAllTasks(),
    this.checkLocalStorage()
  },
  computed:{
    ...mapState([
      'tasks'
    ]),
  },
  components: {
    todolist,
    Navbar
    
  },
  methods:{
    getAllTasks(){
      this.status = true
      
        var userid = localStorage.getItem('userid')
        var routeParam = this.$route.params.date
        var idx = routeParam.indexOf("(")
        var routeParamSliced = routeParam.slice(0,idx-1)
        this.taskDate=routeParamSliced
        var replaceSpaces = routeParamSliced.replace(/ /g,"+")
        this.$store.dispatch('getAllTaskStore',{
          userid : userid,
          dateparam : replaceSpaces
        })
        
      if(this.tasks.length==0){
        this.status = false
      }

    },
    addNewTask(){
      var userid = localStorage.getItem('userid')
      var routeParam = this.$route.params.date
      var idx = routeParam.indexOf("(")
      var routeParamSliced = routeParam.slice(0,idx-1)
      var replaceSpaces = routeParamSliced.replace(/ /g,"+")
      axios.post('http://localhost:8000/task/new',{
        userid :userid,
        date : replaceSpaces,
        task: this.todo
      })
      .then(newTask=>{
        // console.log(this.$route.params)
        // window.location.reload()
        // console.log(newTask)
         this.todo=""
         this.$store.dispatch('getAllTaskStore',{
                userid : userid,
                dateparam : replaceSpaces
        })
      })
      .catch(err=>{
        console.log(err)
      })
    },
    checkLocalStorage(){
      var userid=localStorage.getItem('userid')
      // console.log("USERID",userid)
      if(userid==null){
        this.status=false
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
