import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "fr", "es"], // Supported languages
    ns: ["auth", "common"], // Namespaces
    defaultNS: "common",
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/{{ns}}.json"), // Ensure correct path
    },
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
