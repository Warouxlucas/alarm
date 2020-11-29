import Vue from "vue";
import App from "./App";
import * as VueGoogleMaps from "vue2-google-maps";
import router from "./router/index";
import VueApollo from "vue-apollo";
import apolloClient from "./apollo";

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAHzVQjMiMcsZ0VmBc-XODy8Gg7YAhgAuA",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  apolloProvider,
}).$mount('#app')
