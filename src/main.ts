import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.use(antd).mount("#app");

// createApp(App).mount('#app')
