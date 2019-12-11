import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './permission'
import './mock'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from '@/plugins/vuetify'
Vue.use(vuetify)
Vue.use(ElementUI);


import ECharts from 'vue-echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'echarts/map/js/china'


Vue.component('chart', ECharts)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')


