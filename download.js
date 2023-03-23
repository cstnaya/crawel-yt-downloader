import { createInterface } from "readline";
import ytdl from "ytdl-core";

const r = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function downloadVideos(urls) {
  console.log(urls);
}

export function askDownloadVideos(videos) {
  const questions = videos.map(
    (video) => `Do you want to download ${video.title}? y/n `
  );
  const answers = [];

  function askQuestion(idx) {
    r.question(questions[idx], (ans) => {
      if (ans.includes("y") || ans.includes("Y")) {
        answers.push(videos[idx].link);
      }

      if (idx + 1 === questions.length) {
        downloadVideos(answers);

        r.close();
      } else {
        askQuestion(idx + 1);
      }
    });
  }

  askQuestion(0);
}
