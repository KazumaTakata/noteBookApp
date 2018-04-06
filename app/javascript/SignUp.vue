<template>
  <div class="noteContrainer">
    <div class="SignUpForm">
      <div class="">
        <label for="">Email</label>
      </div>
      <input type="text" name="" value="" v-model="email">
      <label for="">password</label>
      <input type="text" name="" value="" v-model="password">
      <div class="">
          <button v-on:click="sendSignUp()" type="button" name="button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data: function () {
    return {
      email: "",
      password: ""

    }
  },
  mounted(){
  },
  methods:{
    sendSignUp: function(){
      console.log("submit")
      this.email
      this.password
      axios.post("login", {
        email: this.email,
        password: this.password
      }).then(
        d =>{
          console.log("id is ", d.data.id)
          this.$store.commit("SignUp", {id: d.data.id})
        }
      )
    }
  }
}
</script>

<style scoped>

input{
  width: 80%;
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  margin: 30px;
  font-size: 30px;
  outline: none;
}
label{
  font-size: 40px;
}

button{
  background: rgb(97, 168, 78);
  border: none;
  font-size: 40px;
  padding: 20px;
  border-radius: 20px;
}

button:hover{
  background:  rgb(99, 187, 92);
}

.SignUpForm{
  padding: 50px;
  width: 600px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
  margin: auto;
  margin-top: 50px;
  text-align: center;
}

</style>
