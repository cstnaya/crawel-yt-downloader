import * as cheerio from "cheerio";

export const url = "https://www.youtube.com/@XxRyokunchannelxX/videos";

export function parse(html) {
  const $ = cheerio.load(html);
}
