<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from "./header.vue"
export default {
  components: {
    "Header": Header
  },
  data: function () {
    return {
      message: "Hello4ed Vue!"
    }
  }
}
</script>

<style>

body{
  color: white;
}

button{
  color: white;
}
input{
  color: white;
}

textarea{
  color: white;
}



</style>
