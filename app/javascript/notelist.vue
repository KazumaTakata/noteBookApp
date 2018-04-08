<template>
  <div v-if="checkIfLogin()">
  <div class="noteContrainer">
    <div class="buttons">
      <button type="button" v-on:click="addNote" name="button"><i class="fas fa-plus"></i></button>
      <button type="button" name="button"><i class="fas fa-minus"></i></button>
    </div>
      <ul>
        <li v-for='(note, index) in getNoteList'>
          <div class="listItemContainer">
          <div class="">
            <div class="noteListTitle">
                {{note.title}}
            </div>
            <div class="noteListDes">
                {{note.description}}
            </div>
          </div>
          <div class="gotoButton">
            <div class="gotobutton">
              <router-link :to="'/notelist/' + getRoute() + `/${index}`"><i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
          </div>
        </li>
      </ul>
      <transition name="fade">
        <div class="panel" v-if="panelVisible" >
          <button v-on:click="closePanel" class="closeButton" type="button" name="button">X</button>
          <label for="">Note Title</label>
          <input class="panelInput" type="text" name="" v-model="title">
          <label for="">description</label>
          <textarea class="panelTextarea" type="text" name="" v-model="description">
          </textarea>
          <button v-on:click="setbutton" class="setButton" type="button" name="button">SET</button>
        </div>
      </transition>
  </div>
  </div>
  <div v-else class="message">
    please login
  </div>
</template>

<script>
import axios from "axios"
export default {
  data: function () {
    return {
      col: [0,1,2,3,4],
      row: [0,1,2,3,4],
      classData: "",
      panelVisible: false,
      title: "",
      description: "",
      activePanel : {x: "", y: ""},

    }
  },
  mounted(){

  },
  computed: {
    getNoteList() {
      return this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note
    },

  },
  methods:{

    checkIfLogin: function(){
      return this.$store.state.user.login
    },
    getRoute:function(){
      return this.$route.params.noteId
    },
    // getNoteList: function(){
    //   return this.$store.state.classData[this.$route.params.noteId[0]][this.$route.params.noteId[1]].note
    // },
    addNote: function(){
      this.panelVisible = true
    },
    closePanel: function(){
      this.panelVisible = false
    },
    setbutton: function(){
      let classId = this.$route.params.noteId
      this.panelVisible = false

      axios.post("addNote", {
        userId: this.$store.state.user.id ,
        day: classId[1],
        period: classId[0],
        title: this.title,
        description: this.description
      }).then(
        (d) =>{
          console.log("id is ", d.data.id)
          let obj = {classId: {y: classId[0], x: classId[1]}, data: { title: this.title, description: this.description, id: d.data.id, markdown: ""} }
          this.$store.commit("addNote", obj)
          this.$forceUpdate()
        }
      )
    }

  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


a{
  text-decoration: none;
  color: white;
}

.message{
    color: black;
    position: absolute;
    top: 50%;
    right: 50%;
    font-size: 30px;
    transform: translate(50%, 50%);
}

.listItemContainer{
  display: flex;
}

.gotoButton{
  margin-left: auto;
  vertical-align: middle;
  display: flex;
  align-items: center;
}
.gotobutton{
  font-size:40px;
}
.gotobutton:hover{
  color: rgb(230, 182, 59) ;
}

button{
  background: transparent;
  border: none;
  font-size: 30px;
  padding: 20px;
}
button:hover{
  color: rgb(84, 214, 81)
}

ul{
  list-style-type: none;
  padding: 0;
}

li{
  padding: 30px
}

li:hover{
  background: rgb(84, 214, 81);

}

.noteListTitle{
  font-size: 30px;
}

.closeButton{
  background: transparent;
  border: none;
  position: absolute;
  right: 3px;
  top: 3px;
  color: white;
  font-size: 16px;
}

.noteContrainer{
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
  width: 500px;
  margin: auto;
  margin-top: 30px;
  min-height: 400px;
  color: white;
}

.panelInput{
  width: 80%;
  font-size: 30px;
  border: none;
  border-bottom: 1px solid rgb(37, 122, 23);
  outline: none;
  margin: 30px;
  background: transparent;
  color: rgba(8, 18, 13, 0.88);
}

label{
  padding-top: 20px;
}

.panelTextarea{
  width: 80%;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid rgb(37, 122, 23);
  outline: none;
  margin: 30px;
  background: transparent;
  resize: none;
  height: 150px;
  color: rgba(8, 18, 13, 0.88);
}

.panelInput:focus{
  border-bottom: 1px solid rgb(46, 213, 143);
}

.panel{
  padding: 30px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(46, 213, 143);
  box-shadow: 3px 4px 5px rgb(30, 74, 49), -3px -4px 5px rgb(30, 74, 49);
  width: 500px;
  height: 400px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
}

</style>
