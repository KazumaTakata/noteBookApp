<template>
  <div v-if="checkIfLogin()">
  <div class="noteContrainer">
    <div class="buttons">
      <button type="button" v-on:click="addNote" name="button"><i class="fas fa-plus"></i></button>
      <button type="button" v-on:click="removeNote" name="button"><i class="fas fa-minus"></i></button>
    </div>
      <ul>
        <li v-for='(note, index) in getNoteList'>
          <div class="checkboxContainer">
            <input type="checkbox" v-bind:value="index" v-model="checkbox">
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
      <transition name="fade">
        <div class="removepanel" v-if="removePanelVisible" >
          <button v-on:click="removeClosePanel" class="closeButton" type="button" name="button">X</button>
          <div class="removetext">
            Do you really remove these notes?
          </div>
          <button v-on:click="removebutton" class="removeButton" type="button" name="button">remove</button>
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
      removePanelVisible:false,
      checkbox: [],
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
    removeNote: function(){
      this.removePanelVisible = true
    },
    addNote: function(){
      this.panelVisible = true
    },
    removeClosePanel: function(){
      this.removePanelVisible = false
    },
    closePanel: function(){
      this.panelVisible = false
    },
    removebutton: function(){
      debugger
      let y = this.$route.params.noteId[0]
      let x = this.$route.params.noteId[1]
      let idList = this.checkbox.map( index=>{ return this.$store.state.classData[y][x].note[index].id } )
      let obj = {y: y, x: x, list: this.checkbox}
      this.$store.commit("removeList", obj)
      this.removePanelVisible = false
      let url = "/addNote"
      axios.delete(url, { data: { idList: idList, x: x, y: y,  userId: this.$store.state.user.id } })
      this.checkbox = []
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

.checkboxContainer{
  display: flex;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.removetext{
  margin: 50px  auto;
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
  width: 100%;
  margin-left: 20px;
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

.removeButton{
  font-size: 12px;
  padding: 10px 40px;
  border-radius: 30px;
  background-color: rgb(17, 60, 9);
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
  background: linear-gradient(to right, rgb(17, 60, 9), rgb(15, 64, 13));
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
  border-bottom: 1px solid white;
  outline: none;
  margin: 30px;
  background: transparent;
  color: white;
}

label{
  padding-top: 20px;
}

.panelTextarea{
  width: 80%;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  margin: 30px;
  background: transparent;
  resize: none;
  height: 150px;
  color: white;
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

.removepanel{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(46, 213, 143);
  box-shadow: 3px 4px 5px rgb(30, 74, 49), -3px -4px 5px rgb(30, 74, 49);
  width: 300px;
  height: 200px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
  text-align: center;
}

</style>
