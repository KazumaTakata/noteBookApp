import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

let x = 5
var arr = new Array(x);
for (var i = 0; i < x; i++) {
    arr[i] = new Array(x);
}
for (var i = 0; i < x; i++) {
  for (var j = 0; j < x; j++) {
      arr[i][j] = {name: "______", description: "______", note: ""}
  }
}



export const store = new Vuex.Store({
  state: {
    classData: arr,
    user: {
      login: false,
      id: ""
    }
  },
  mutations: {
    classStateChange(state, obj) {
      state.classData[obj.activePanel.y][obj.activePanel.x] = obj.data
    },
    addNote(state, obj) {
      state.classData[obj.classId.y][obj.classId.x].note.push(obj.data)
    },
    SignUp(state, obj){
      state.user.id = obj.id
      state.user.login = true
    }

  }
})
