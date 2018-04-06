<template>
  <div class="header">
    <div class="homeIcon">
    <i class="fas fa-home"></i>
    CnoteBook
    </div>
    <div class="LoginSignup">
    <div class="homeIcon">
    <i class="fas fa-sign-in-alt"></i>
    </div>
    <div class="homeIcon">
      <router-link to="/login">
        <i class="fas fa-user-plus"></i>
      </router-link>
    </div>
    </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello4ed Vue!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
},
.LoginSignup{
  display: flex;
  margin-left: auto;
}
.header{
  display: flex;
  font-size: 20px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
  padding: 10px;
  min-width: 600px
}
.homeIcon{
  color: white;
  margin: 0 10px;
}
</style>
