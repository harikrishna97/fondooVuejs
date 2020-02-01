import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdTabs, MdField, MdCard, MdIcon, MdApp,MdToolbar} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'
// import VueRouter from 'vue-router'
import router from './routes'
import VueMaterial from 'vue-material'
import vuetify from './plugins/vuetify'
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



Vue.use(VueMaterial)
Vue.use(Vuelidate,MdIcon)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(MdApp)
Vue.use(MdToolbar)


//Use VueRouter
// Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  template:'<App/>',
  vuetify,
  components:{App}
}).$mount('#app')
