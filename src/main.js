import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VMask from "vue-the-mask"

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'boxicons';

import 'jquery/dist/jquery.min.js';
import 'jquery'
window.jQuery = window.$ = require('jquery')

createApp(App)
    .use(router)
    .use(VMask)
    .mount('#app')

