<template>

<div class="login">
  <div class="jumbotron">

      <div class="container col-md-3 panel panel-default">
        <div class="panel-body">
          <h2>Welcome to YourToDos App</h2>
          <p> A place to write your to do lists everyday</p>
        </div>
      </div>

    <div class="container">
      <form class="form-signin">
        <h2 class="form-signin-heading">Login to Start</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model ="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button @click="login" class="btn btn-lg btn-info btn-block" type="button">Enter</button><br>
         <a><router-link to="/register">Don't Have an account? Sign up here</router-link></a>
      </form>

    </div> <!-- /container -->
  </div>
</div>
</template>


<script>
export default {
    created:function(){
      this.checkLocalStorage()
    },
    data:function(){
        return{
            username : '',
            password : '',
            status:localStorage.getItem('token')
        }
    },
    methods:{
        login(){
          if(this.username==''||this.password==''){
            swal("Please fill the field correctly")
          }else{
            axios.post('https://todoserver.gladysefirina.website/login',{
                username :this.username,
                password :this.password 
            })
            .then(({data})=>{
                console.log("INI KENAPA GA BISA LOGIN TBA2")
                console.log("USER",data._id)
                localStorage.setItem('token',data.token)
                localStorage.setItem('userid',data._id)
                localStorage.setItem('username',data.username)
                localStorage.setItem('name',data.nama)
                this.$router.push('/calendar')
            })
            .catch(err=>{
                alert('incorrect username/password')
                console.log(err)
            })
          }
            
        },
        checkLocalStorage(){
          console.log("USER",this.status)
         if(this.status!==null){
           this.$router.push('/calendar')
         }
      }
    }
}
</script>


<style>
.body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
