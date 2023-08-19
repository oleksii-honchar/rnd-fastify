import path from "path";
import { fileURLToPath } from "url";

// by design, it should be context of ./configs/webpack-wrapper.ts file
let currMetaUrl: string = import.meta.url;
export const setCurrMetaUrl = (url: string) => {
  currMetaUrl = url;
};
export const __filename = () => fileURLToPath(currMetaUrl);
export const __dirname = () => path.dirname(__filename());

/**
 * return folder containing ./configs/webpack-wrapper.ts
 * it should be repo root by design. Used as function because actual currMetaUrl happened in webpack-wrapper.ts
 */
export const getRootRepoDir = () => path.resolve(__dirname() + "/../");
