import Vue from 'vue'
import App from './App.vue'
 import { MdButton, MdContent, MdTabs, MdField, MdCard, MdIcon, MdApp } from 'vue-material/dist/components'
 import 'vue-material/dist/vue-material.min.css'
 import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'
// import VueRouter from 'vue-router'
import router from './routes'
import VueMaterial from 'vue-material'

import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';
 
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};
 
Vue.use(VueLogger, options);

import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(Vuelidate,MdIcon)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(MdApp)



//Use VueRouter
// Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  template:'<App/>',
  components:{App}
}).$mount('#app')
