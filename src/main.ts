import { createApp } from "vue";

import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import Viewer from "v-viewer";
import filtertime from "@/util/dayjs";
import "@/assets/scss/reset.scss";
import "viewerjs/dist/viewer.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(filtertime);
app.use(Viewer);
app.mount("#app");
