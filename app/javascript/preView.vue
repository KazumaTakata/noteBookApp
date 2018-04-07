<template>
  <div class="previewContainer">
    <div v-html="getMarkDown()" class="preview">

    </div>

  </div>
</template>

<script>
import axios from "axios"
import showdown from "showdown";
import katex from  "katex";

let converter = new showdown.Converter()
export default {
  data: function () {
    return {

    }
  },
  mounted(){

  },
  methods:{
    compileMarkdownHelp(markdown){
      let splittedInput = markdown.split(/\$\$/)
      let mathInput = splittedInput.filter((item, index) => { return index % 2 == 1 })
      let otherInput = splittedInput.filter((item, index) => { return index % 2 == 0 })
      let mathHtml = mathInput.map( (str) => { return  katex.renderToString( str ) } )
      let otherHtml = otherInput.map( (str) => { return converter.makeHtml(str) } )

      let outputHtml = []
      for( let i=0 ; i< otherHtml.length; i++ ){
        outputHtml.push(otherHtml[i])
        if (typeof mathHtml[i] != "undefined"){
          outputHtml.push(mathHtml[i])
        }
      }
      // let compiledInput = converter.makeHtml(this.inputData)
      return outputHtml.join("")
    },
    getMarkDown(){

      return this.compileMarkdownHelp(this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].markdown)
    }

  }
}
</script>

<style scoped>

.preview{
  width: 565px;
  min-height: 812px;
  border: 1px solid black;
  padding: 30px;
  margin: auto;
  margin-top: 30px;
}

.previewContainer{
  color: black;
}
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
