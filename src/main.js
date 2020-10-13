import Vue from 'vue'
import App from './App.vue'

import vuetify from '@src/plugins/vuetify'

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';

// Директива v-click-outsid собитые при клике вне элемента
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)


new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})
