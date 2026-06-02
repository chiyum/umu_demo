import { createApp } from "vue";
import "@/assets/scss/main.scss";
import App from "./App.vue";

/** _app */
import Layout from "@/_app/layouts";
import Directives from "@/_app/directives";
import router from "@/router";
// import bgImage from "./directives/bgImage";
/** plugin */
import { Quasar, Loading, Dialog, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import i18n from "@/i18n";
import { Icon } from "@iconify/vue";
import { createPinia } from "pinia";

const VueApp = createApp(App);
const pinia = createPinia();

VueApp.component("Icon", Icon); // 註冊 iconify 組件
VueApp.use(pinia);
VueApp.use(router);
VueApp.use(Layout);
VueApp.use(Directives);

VueApp.use(Quasar, {
  plugins: {
    Loading,
    Dialog,
    Notify
  }
});
VueApp.use(i18n);
VueApp.mount("#app");

// 主畫面掛上後背景預載所有 page chunk，後續切頁從 module cache 拿，無感
import("@/_app/prefetch-routes").then(({ prefetchAllRoutes }) => {
  prefetchAllRoutes(router);
});
