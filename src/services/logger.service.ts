import { config } from "../config";

export const logger = (config.logging) ? undefined : console;