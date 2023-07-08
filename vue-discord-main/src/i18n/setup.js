import { createI18n } from "vue-i18n";
import fr from "./fr/index";
import en from "./en/index";
import { setLang } from "./i18n.service";
import moment from "moment";

moment.defineLocale("fr", {
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  calendar: {
    lastDay: "[Hier à] HH:mm",
    sameDay: "[Aujourd'hui à] HH:mm",
    nextDay: "[Demain à] HH:mm",
    lastWeek: "DD/MM/YYYY",
    nextWeek: "DD/MM/YYYY",
    sameElse: "DD/MM/YYYY",
  },
});

moment.updateLocale("en", {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  calendar: {
    lastDay: "[Yesterday at] HH:mm A",
    sameDay: "[Today at] HH:mm A",
    nextDay: "[Tomorrow at] HH:mm A",
    lastWeek: "DD/MM/YYYY",
    nextWeek: "DD/MM/YYYY",
    sameElse: "DD/MM/YYYY",
  },
});

export const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "fr",
  messages: { ...fr, ...en },
});
// TODO REFACTOR ?????
setTimeout(() => {
  setLang();
});
