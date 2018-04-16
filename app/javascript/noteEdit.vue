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
  <div class="audioContainer">
    <button v-on:click="startRecord" class="recordButton" type="button" name="button">{{recordButtonString}}</button>
    <div class="">

    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import katex from  "katex";
import showdown from "showdown";
import Vue from "vue"

let converter = new showdown.Converter()
export default {

  data: function () {
    return {
      markdownData: this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].markdown,
      htmlCode: this.compileMarkdownHelp(this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note[this.$route.params.listId].markdown),
      audioData: { data: [], sampleRate: 44100, numberOfChannels:1 , length: 8192},
      recordState: false,
      recordButtonString: "start"
    }
  },
  methods:{
    startRecord: function(){
      console.log("startRecord")
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      let constraints = {audio: true, video: false}

      function errorCallback(error) {
        console.log("navigator.getUserMedia error:", error);
      }

      if (!this.recordState){
        this.recordButtonString = "recording"
      } else {
        this.recordButtonString = "start"
      }
      this.recordState = !this.recordState


      console.log(this.iconClass)
      navigator.getUserMedia(constraints, this.successCallback, errorCallback);
    },
    successCallback: function(stream){
      window.stream = stream;
      console.log("success")

      var context = new AudioContext();
      var analyser = context.createAnalyser();

      var source = context.createMediaStreamSource(stream);
      // source.connect(analyser);
      // analyser.connect(context.destination)
      //
      // analyser.fftSize = 2048;
      // var bufferLength = analyser.frequencyBinCount;
      // var dataArray = new Uint8Array(bufferLength);
      // analyser.getByteFrequencyData(dataArray);

      var processor = context.createScriptProcessor(1024*8, 1, 1);

      source.connect(processor);
      processor.connect(context.destination);
      processor.onaudioprocess = this.onaudioprocess

    },

    onaudioprocess: function(e){
      // console.log(dataArray)
      let inputData = e.inputBuffer.getChannelData(0)
      let outputData = e.outputBuffer.getChannelData(0)
      this.audioData.data.push(...inputData)
    },

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


.recordButton{
  background: transparent;
  border: 1px solid black;
  color: black;
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
  background: linear-gradient(to right, rgb(17, 60, 9), rgb(15, 64, 13));
  margin: auto;
  margin-top: 30px;
}

.audioContainer{
  margin: auto;
  width: 700px;
  margin-top: 50px;
}


.markdownEditor{
  height: 100%;
  width: 350px;
  outline: 1px solid rgba(106, 89, 95, 0.75);
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
