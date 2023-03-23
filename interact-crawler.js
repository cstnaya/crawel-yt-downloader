import puppeteer from "puppeteer";
import { askDownloadVideos } from "./download.js";

const videoSelector = "ytd-rich-grid-media";
const videoLinker = "#video-title-link";

const BASE_URL = "https://www.youtube.com/";

export async function crawlerInteractor(url) {
  // Initialize Puppeteer
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
  });

  const page = await browser.newPage();

  try {
    // Navigate to the target URL
    await page.goto(url);

    // Wait for the video selector to be loaded
    await page.waitForSelector(videoSelector);

    let endOfPage = false;

    // Loop until the end of the page is reached
    while (!endOfPage) {
      // Scroll down to load more videos
      console.log("scroll down.....");
      await scrollToBottom();

      // Wait for the page to load new videos
      await wait();

      // Extract all videos currently loaded on the page
      console.log("start to fetch all videos.....");
      const videoElements = await page.$$(videoSelector);

      // Process videos
      console.log("start to process all videos.....");
      const videos = await ProcessVideos(videoElements);
      console.log(videos);

      // Check if the end of the page has been reached
      endOfPage = await detectEndOfPage();
    }
  } catch (err) {
    console.log(err);
  } finally {
    // await browser.close();
  }

  async function ProcessVideos(videoElements) {
    const videos = [];

    for (const videoElement of videoElements) {
      const video = {};
      video.title = await videoElement.$eval(
        videoLinker,
        (el) => el.textContent
      );
      video.link =
        BASE_URL +
        (await videoElement.$eval(videoLinker, (el) =>
          el.getAttribute("href")
        ));
      videos.push(video);
    }

    return videos;
  }

  async function scrollToBottom() {
    await page.evaluate(() => {
      console.log(document.querySelector("ytd-app").scrollHeight);
      window.scrollTo(0, document.querySelector("ytd-app").scrollHeight);
    });
  }

  async function wait() {
    await page.waitForTimeout(4000);
  }

  async function detectEndOfPage() {
    return await page.evaluate(() => {
      const INFINITE_SCROLLER = "ytd-continuation-item-renderer";

      return document.querySelector(INFINITE_SCROLLER) === null;
    });
  }
}
