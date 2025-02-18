import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";
import { config } from "../config";

const defaultLocale = config.DEFAULT_LOCALE;
const supportedNamespaces = require("fs")
  .readdirSync(path.join(__dirname, "../locales/en"))
  .filter((file: string) => file.endsWith(".json"))
  .map((file: string) => file.replace(".json", ""));

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({

    fallbackLng: `${defaultLocale}`, // Default language
    supportedLngs: [defaultLocale, "fr", "es"], // Supported languages
    ns: supportedNamespaces,
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
