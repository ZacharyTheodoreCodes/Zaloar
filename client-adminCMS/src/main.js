import { createApp } from "vue";
import "./style.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(ToastPlugin);
app.use(vue3GoogleLogin, {
  clientId:
    "403418316532-ln6qcrtfm0p7df810lfc183kq6ve95ah.apps.googleusercontent.com",
});

app.mount("#app");
