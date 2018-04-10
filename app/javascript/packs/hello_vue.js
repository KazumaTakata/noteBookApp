/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import App from '../app.vue'
import Home from "../home.vue"
import NoteList from "../notelist.vue"
import NoteEdit from "../noteEdit.vue"
import VueRouter from "vue-router"
import splash from "../splash.vue"
import SignUp from "../SignUp.vue"
import Login from "../Login.vue"
import preView from "../preView.vue"
import { store } from "../store.js"
import Toasted from 'vue-toasted';


Vue.use(VueRouter)
Vue.use(Toasted)

const routes = [
  { path: '/', component: splash },
  { path: '/notelist/' ,component: Home},
  { path: '/notelist/:noteId', name: 'notelist' ,component: NoteList},
  { path: '/notelist/:noteId/:listId',component: NoteEdit },
  { path: '/Signup',  component: SignUp },
  { path: '/login',  component: Login },
  { path: '/notelist/:noteId/:listId/preview',  component: preView }


]

const router = new VueRouter({
  routes // short for `routes: routes`
})


document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('hello'))
  const app = new Vue({
    el,
    router,
    store,
    render: h => h(App)
  })

  console.log(app)
})


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the using turbolinks, install 'vue-turbolinks':
//
// yarn add 'vue-turbolinks'
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks';
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
