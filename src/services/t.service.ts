
import i18next from "../middleware/i18n.middleware";
import { logger } from "./logger.service";

export const t = (key: string, settings: any) => {
    const language = settings.language || settings.lng || "en"; // Default to English
    const translation = i18next.t(`auth:${key}`, { lng: language });

    logger?.log(`Key: ${key}, Language: ${language}, Translation: ${translation}`);

    return translation;
};
