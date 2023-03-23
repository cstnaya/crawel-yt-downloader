import puppeteer from "puppeteer";

export async function crawler(url, parse) {
  // 1. launch browser
  const browser = await puppeteer.launch();

  // 2. create a page
  const page = await browser.newPage();

  // 3. go url
  await page.goto(url);

  // 4. get content
  const html = await page.content();

  const result = parse(html);

  await browser.close();

  return result;
}
