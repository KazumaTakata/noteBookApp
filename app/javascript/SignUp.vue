<template>
  <div class="noteContrainer">
    <div class="SignUpForm">
      <div class="title">
      SignUp
      </div>
      <div class="">
      <label for="">Email</label>
      </div>
      <input type="text" name="" value="" v-model="email">
      <label for="">password</label>
      <input type="password" name="" value="" v-model="password">
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

      axios.post("signup", {
        email: this.email,
        password: this.password
      }).then(
        d =>{
          console.log("id is ", d.data.id)
          if (d.data.id != null){
            this.$store.commit("SignUp", {id: d.data.id})
            this.$router.push({path: `/notelist`})
          } else {
            d.data.error.map( e => { this.$toasted.show( e, {position: 'top-center', duration: 3000, type: 'error'}) } )
          }

        }
      )
    }
  }
}
</script>

<style scoped>

.noteContrainer{
  background: url('/assets/laptop-3289261_1920.jpg');
  height: calc(100vh - 43px);
  position: relative;
  min-width: 900px;
  min-height: 500px;
}

.title{
  font-size: 25px;
  margin-bottom: 40px;
}

input{
  width: 80%;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  margin: 30px;
  font-size: 30px;
  outline: none;
}
input:focus{
  border-bottom: 1px solid rgb(168, 77, 129);
}

label{
  font-size: 16px;
}

button{
  background: rgb(97, 168, 78);
  font-weight: lighter;
  border: none;
  font-size: 13px;
  padding: 15px 40px;
  border-radius: 20px;
}

button:hover{
  background:  rgb(99, 187, 92);
}

.SignUpForm{
  width: 600px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
  text-align: center;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  padding: 30px;
  border-radius: 3px;
  box-shadow: 2px 2px 2px black, -2px -2px 2px black
}

</style>
