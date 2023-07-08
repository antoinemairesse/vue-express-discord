import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import store from "./store";
import { i18n } from "./i18n/setup";
import socket from "./socket";
import { setLocale } from "yup";
import $axios from "./api/axios";
import $api from "./api";

const $tc = i18n.global.tc;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

setLocale({
  mixed: {
    required: ({ path }) =>
      capitalizeFirstLetter($tc("validation.required", { field: path })),
  },
  string: {
    email: capitalizeFirstLetter($tc("validation.email")),
    min: ({ path, min }) =>
      capitalizeFirstLetter($tc("validation.min", { field: path, count: min })),
    max: ({ path, max }) =>
      capitalizeFirstLetter($tc("validation.max", { field: path, count: max })),
  },
});

const app = createApp(App);
app.directive('loading', (el, binding) => {
  if (binding.value) {
    el.classList.add("state-loading");
    el.setAttribute("disabled", "disabled");
  } else {
    el.classList.remove("state-loading");
    el.removeAttribute("disabled");
  }
});
app.config.globalProperties.$axios = $axios;
app.config.globalProperties.$api = $api;
store.$api = $api;
store.install(app);
app.provide("$socket", socket);
app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");
