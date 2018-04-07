<template>
  <div>
    <div class="splashDiv">
      <div class="title">
        CnoteBook
        <div class="">
          <router-link :to="{ path: '/signup'}"><i class="fas fa-user-plus"></i>SIGNUP</router-link>
          <router-link :to="{ path: '/login'}"><i class="fas fa-sign-in-alt"></i>LOGIN</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data: function () {
    return {

    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style scoped>
a{
  font-size: 40px;
  text-decoration: none;
  color: rgb(27, 64, 48);
  text-shadow: 1px 1px 1px white;
}
.title{
  position: absolute;
  text-shadow: 1px 1px 1px white;
  top: 50%;
  right: 50%;
  font-size: 150px;
  color: rgb(27, 64, 48);
  transform: translate(50%, -100%);
  font-weight: bold;
}
.splashDiv{
  position: relative;
  background: url('/assets/laptop-3289261_1920.jpg');
  height: 100vh;
}

</style>
