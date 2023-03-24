import { crawlerInteractor } from "./interact-crawler.js";
import * as dotenv from "dotenv";

dotenv.config();

(async () => {
  const url = process.env.url;

  crawlerInteractor(url);
})();
