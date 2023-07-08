import moment from "moment";
import { i18n } from "./setup";

export const changeLang = (lang) => {
  if (lang === "fr") switchToFr();
  else if (lang === "en") switchToEn();
  else switchToFr();
};

export const setLang = () => {
  const lang = localStorage.getItem("lang");
  changeLang(lang);
};

const switchToFr = () => {
  i18n.global.locale = "fr";
  localStorage.setItem("lang", "fr");
  moment.locale("fr");
};

const switchToEn = () => {
  i18n.global.locale = "en";
  localStorage.setItem("lang", "en");
  moment.locale("en");
};
