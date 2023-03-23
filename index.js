import { crawlerInteractor } from "./interact-crawler.js";

(async () => {
  const url = "https://www.youtube.com/@NintendoJP/videos";

  crawlerInteractor(url);
})();
