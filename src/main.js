import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import Emitter from 'tiny-emitter'
import store from './store/authStore';
import VueCountdown from '@chenfengyuan/vue-countdown';
import stores from "./store/store";


import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
});

const app = createApp(App)  
app.component(VueCountdown.name, VueCountdown);
app.config.globalProperties.$msalInstance = {};
app.config.globalProperties.$emitter = new Emitter();
app.use(router)
app.use(vuetify)
app.use(store).use(stores).mount('#app')
