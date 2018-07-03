<template>
<div class="register">

  <div class="jumbotron">
  <!-- <button class="btn btn-default">Welcome to YourToDos App</button> -->
  <div class="container col-md-3 panel panel-default">
    <div class="panel-body">
      <h2>Welcome to YourToDos App</h2>
      <p> A place to write your to do lists everyday</p>
    </div>
  </div>

      <div class="container">

      <form class="form-signin">
        <h2 class="form-signin-heading">Please Sign Up</h2>
        <input v-model="nama" type="text" id="inputName" class="form-control" placeholder="Name" required>
        <!-- <label for="inputEmail" class="sr-only">Email address</label> -->
        <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
        <!-- <label for="inputPassword" class="sr-only">Password</label> -->
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>

        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button @click="register" class="btn btn-lg btn-info btn-block" type="button">Sign up</button><br>
        <a><router-link to="/">Have an account? Login here</router-link></a>
      </form>

    </div> <!-- /container -->
</div>

</div>
</template>
<script>
export default {
    data:function(){
        return{
            nama:'',
            username:'',
            password:''
        }
    },
    methods:{
        register(){
            axios.post("http://localhost:8000/register",{
                nama: this.nama,
                username : this.username,
                password : this.password
            })
            .then(user=>{
              console.log("KENAPA TBA2 GAJALAN")
                this.$router.push('/login')
            })
            .catch(err=>{
              console.log(err.response)
              swal('Please fill all field correctly')
                console.log(err)
            })
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
