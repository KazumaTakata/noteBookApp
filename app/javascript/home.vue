<template class="homeComponent">
  <div v-if="checkIfLogIN()">
  <div class="home">
    <div class="daysContainer">
      <template v-for="d in days">
        <div class="daysContainerItem">
          {{d}}
        </div>
      </template>
    </div>
    <div class="timetable">
      <template v-for="c in col">
        <template v-for="r in row">
          <div v-bind:id="String(c)+String(r)" v-on:click="clickItem(c,r)" class="tableItem">
            <template v-if="classData != ''">
              <div class="itemtitle">
              {{getclassDataName(c, r)}}
              </div>
              <div class="itemdesc">
                {{getclassDataDescription(c, r)}}
              </div>
              <template v-if="getclassDataName(c, r) != '______' && getclassDataDescription(c, r) != '______'">
                <router-link class="listlink" :to="{ name: 'notelist', params: { noteId: String(c) + String(r) }}"><i class="fas fa-arrow-right"></i></router-link>
              </template>
            </template>
          </div>
        </template>
    </template>
    </div>
    </div>
    <transition name="fade">
    <div class="panel" v-if="panelVisible" >
      <button v-on:click="closePanel" class="closeButton" type="button" name="button">X</button>
      <label for="">ClassName</label>
      <input class="panelInput" type="text" name="" v-model="className">
      <label for="">Time</label>
      <input class="panelInput" type="text" name="" v-model="Time">
      <label for="">description</label>
      <textarea class="panelTextarea" type="text" name="" v-model="description">
      </textarea>
      <button v-on:click="setClass" class="submitButton" type="button" name="button">SET</button>
    </div>
    </transition>
  </div>
</div>
  <div v-else>
    <div class="message">
        please login
    </div>
  </div>
</template>


<script>
import axios from "axios"
export default {
  data: function () {
    return {
      col: [0,1,2,3,4],
      row: [0,1,2,3,4],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      classData: "",
      panelVisible: false,
      className: "",
      Time: "",
      description: "",
      activePanel : {x: "", y: ""}

    }
  },
  mounted(){
    let x = 5
    var arr = new Array(x);
    for (var i = 0; i < x; i++) {
        arr[i] = new Array(x);
    }
    for (var i = 0; i < x; i++) {
      for (var j = 0; j < x; j++) {
          arr[i][j] = {name: ""}
      }
    }
    this.classData = arr
  },
  methods:{
    checkIfLogIN(){
      return this.$store.state.user.login
    },
    gotonoteBook(e){
      e.stopPropagation();

    },
    getclassDataName:function(y, x){
        let name = this.$store.state.classData[y][x]["name"]
        if (name.length > 10){
          return name.substring(0, 9) + "..."
        } else {
          return name
        }
        return this.$store.state.classData[y][x]["name"]
    },
    getclassDataDescription:function(y, x){
        let description = this.$store.state.classData[y][x]["description"]
        if (description.length > 20){
          return description.substring(0, 19) + "..."
        } else {
          return description
        }

    },
    clickItem: function(y, x){
      this.panelVisible = true
      this.activePanel.x = x
      this.activePanel.y = y
    },
    closePanel: function(event){
      this.panelVisible = false
    },
    setClass: function(event){
      console.log(this.description, this.Time, this.className)
      let obj = {activePanel:this.activePanel, data: {name: this.className, time: this.Time, description: this.description, note: []} }
      this.$store.commit("classStateChange", obj)
      axios.post("classTable", {
        userId: this.$store.state.user.id,
        description: this.description,
        time: this.Time,
        className: this.className,
        activePanel: this.activePanel
      })
      this.description = "",
      this.Time = "",
      this.className = ""
      this.panelVisible = false
    }
  }
}
</script>

<style scoped>
.daysContainer{
  display: flex;
  width: 600px;
  color: black;
  justify-content: space-around;
  margin: auto;
  margin-top: 40px;
}

.daysContainerItem{
  outline: 1px solid green;
  height: 100%;
  width: 100%;
  padding: 20px 0px;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.listlink{

}

.message{
    color: black;
    position: absolute;
    top: 50%;
    right: 50%;
    font-size: 30px;
    transform: translate(50%, 50%);
}
a{
  text-decoration: none;
  color: white;
  font-size: 20px;

}
a:hover{
  color: rgba(217, 166, 80, 0.82)
}
.itembutton{
  background: transparent;
  border: none;
  color: white;
  outline: none;
  font-size: 20px;
}
.itembutton:hover{
  background: rgb(71, 180, 75);
}
.itemtitle{
  padding: 10px;
  font-size: 20px;
  word-wrap: break-word;
}
.itemdesc{
  padding: 10px;
  font-size: 10px;
  word-wrap: break-word;
}

.itemtime{
  padding: 10px;
  word-wrap: break-word
}
.closeButton{
  background: transparent;
  border: none;
  position: absolute;
  right: 3px;
  top: 3px;
  color: white;
}
.submitButton{
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;

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
  border-bottom: 1px solid rgb(193, 66, 115);
}

.panelTextarea:focus{
  border-bottom: 1px solid rgb(193, 66, 115);
}

.panel{
  padding: 30px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(46, 213, 143);
  box-shadow: 2px 2px 5px rgb(37, 122, 23), -4px -4px 5px rgb(35, 91, 50) ;
  width: 500px;
  height: 500px;
  background: linear-gradient(to right, rgb(78, 233, 117) , rgb(70, 180, 67));
}

.timetable{
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  width: 600px;
  height: 600px;
  background: linear-gradient(to right, rgb(17, 60, 9), rgb(15, 64, 13));
  margin: auto;
  /* margin-top: 40px; */
}
.tableItem{
  text-align: center;
  font-weight: lighter;
  font-size: 15px;
  width: 120px;
  height:120px;
  outline: 1px solid rgb(69, 147, 86);
}

.tableItem:hover{
  background: rgb(162, 240, 161);
}

</style>
