<template>
  <div id="app">
    <Header />
    <transition :name="transitionName">
      <router-view/>
    </transition>
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
      message: "Hello4ed Vue!",
      transitionName: ""
    }
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    if (toDepth < fromDepth){
      this.transitionName = "slideright"
    } else {
      if (toDepth > fromDepth){
        this.transitionName = "slideleft"
      } else {
        this.transitionName = "fade"
      }
    }
    // this.transitionName = toDepth < fromDepth ? 'slideright' : 'slideleft'
  }
}
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slideright-enter-active, .slideright-leave-active {
  transition: transform .3s;
}

.slideright-enter{
  transform: translateX(-100%);
}
.slideright-leave-to {
  transform: translateX(100%);
}

.slideright-enter-to, .slideright-leave {
  transform: translateX(0);
}

.slideleft-enter-active, .slideleft-leave-active {
  transition: transform .3s;
}

.slideleft-enter{
  transform: translateX(100%);
}
.slideleft-leave-to {
  transform: translateX(-100%);
}

.slideleft-enter-to, .slideleft-leave {
  transform: translateX(0);
}


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
