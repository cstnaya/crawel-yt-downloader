import * as cheerio from "cheerio";

export const url = "https://www.innisfree.com.tw/m/";

export function parseResult(html) {
  const $ = cheerio.load(html);
  const results = [];

  $("#bestPdt .pdtItem.slick-slide:not(.slick-cloned)").each((idx, el) => {
    const productLink = $(el).find(".pdtThumb a").attr("href").trim();
    const productInfo = $(el).find(".pdtInfo .opt_name").text().trim();
    const productPrice = $(el)
      .find(".pdtInfo .opt_price")
      .text()
      .split("折")[1]
      .trim();
    const productItem = `${productInfo} 特價: ${productPrice}, 連結: ${productLink}`;

    results.push(productItem);
  });

  return results;
}
