<template>
<div>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">YourToDos</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li v-show="$route.name==='todo'" ><a href=""><router-link to="/calendar">Back to Calendar</router-link><span class="sr-only">(current)</span></a></li>
        
        <li><a @click="logout">Create Another Account<span class="sr-only">(current)</span></a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a >Welcome, {{user}} </a></li>
        <li><a @click="logout" >Log Out</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</div>
</template>

<script>
export default {
  created:function(){
    this.readLocalStorage()
  },
  data:function(){
    return{
      user:''
    }
  },
  methods:{
    logout(){
      swal('You are logged out :)')
      localStorage.clear()
      console.log(localStorage.getItem('userid'))
      this.$router.push('/')
      // var check = localStorage.getItem('userId')===null?true:false
    },
    logoutToRegister(){
      localStorage.clear()
      console.log(localStorage.getItem('userid'))
      this.$router.push('/register')
    },
    readLocalStorage(){
      this.user=localStorage.getItem('name')
      console.log(localStorage.getItem('name'))
    }
  }
}
</script>
