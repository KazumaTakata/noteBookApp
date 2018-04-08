<template>
  <div class="">
    <div class="buttons">
      <router-link :to="getRoute() + '/preView'"><i class="fas fa-arrow-right"></i>GO TO PREVIEW</router-link>
    </div>
  <div class="noteContrainer">
    <div class="markdownEditor">
      <textarea class="markdownInput" name="name" v-on:change="compileMarkdown"  v-model="markdownData">

      </textarea>
    </div>
    <div  class="htmlOutput">
      <div v-html="htmlCode" class="htmlOutputContent">

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import katex from  "katex";
import showdown from "showdown";
let converter = new showdown.Converter()
export default {
  data: function () {
    return {
      markdownData: this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].markdown,
      htmlCode: this.compileMarkdownHelp(this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].markdown)
    }
  },
  methods:{
    getRoute: function(){
      return this.$route.path
    },
    getnoteId: function(){
      return this.$route.params.noteId
    },
    getListId: function(){
      return this.$route.params.listId
    },
    compileMarkdownHelp: function(markdown){
      if (markdown != null){
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
      } else {
        return ""
      }

    },

    compileMarkdown: function(){
      // console.log(this.markdownData)
      // this.htmlCode = converter.makeHtml(this.markdownData)
      // console.log(katex.renderToString( this.markdownData ))

      // let splittedInput = this.markdownData.split(/\$\$/)
      // let mathInput = splittedInput.filter((item, index) => { return index % 2 == 1 })
      // let otherInput = splittedInput.filter((item, index) => { return index % 2 == 0 })
      // let mathHtml = mathInput.map( (str) => { return  katex.renderToString( str ) } )
      // let otherHtml = otherInput.map( (str) => { return converter.makeHtml(str) } )
      //
      // let outputHtml = []
      // for( let i=0 ; i< otherHtml.length; i++ ){
      //   outputHtml.push(otherHtml[i])
      //   if (typeof mathHtml[i] != "undefined"){
      //     outputHtml.push(mathHtml[i])
      //   }
      // }
      // // let compiledInput = converter.makeHtml(this.inputData)
      // this.htmlCode = outputHtml.join("")

      this.htmlCode = this.compileMarkdownHelp(this.markdownData)


      this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].markdown = this.markdownData

      axios.post("addMarkDown", {
        markdown: this.markdownData,
        col: this.$route.params.noteId[1],
        row: this.$route.params.noteId[0],
        userId: this.$store.state.user.id,
        noteId: this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].id
      }).then(
        (d) =>{
          console.log("id is ", d.data.id)
        }
      )
    }


  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
  font-size: 30px;
}

.htmlOutput{
  overflow: scroll;
  width: 350px;
  height: 100%;
}
.htmlOutputContent{
  margin: 30px;
  display:inline-block;

}
.buttons{
  padding-top: 50px;
  width: 700px;
  margin: auto;
}

.noteContrainer{
  display: flex;
  width: 700px;
  height: 500px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
  margin: auto;
  margin-top: 30px;
}

.markdownEditor{
  height: 100%;
  width: 350px;
  outline: 1px solid black;
}

.markdownInput{
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  color: black;
}

</style>
