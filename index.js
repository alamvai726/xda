const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/video", (req, res) => {
  const videoFilePath = path.join(__dirname, "video.json");

  fs.readFile(videoFilePath, "utf8", (err, videoData) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Error reading video.json"
      });
    }

    try {
      const videos = JSON.parse(videoData);
      if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(500).json({
          status: "failed",
          error: "No videos found in video.json"
        });
      }

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      const response = {
        status: "success",
        url: randomVideo,
        author: {
          Name: "MOHAMMAD JUBAYER",
          Facebook: "https://www.facebook.com/profile.php?id=61573052122735"
        }
      };

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(response, null, 2));
    } catch (parseError) {
      res.status(500).json({
        status: "failed",
        error: "Error parsing video.json"
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
