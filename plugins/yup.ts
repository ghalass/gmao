// plugins/yup.ts
import { setLocale } from "yup";
import { fr } from "yup-locales";

export default defineNuxtPlugin(() => {
  // Configurer Yup avec la locale française
  setLocale(fr);
});
