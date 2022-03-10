const express = require("express");
const router = express.Router();
// const fetch = require("node-fetch");

const fetchCoursesZip = async (searchzip) => {
  const zipHash = process.env.ZIP_HASH;
  
  const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
  
  const key = process.env.DGCR_API_KEY;
  const zipUrl = `https://www.dgcoursereview.com/api_test/?key=${key}&mode=findzip&zip=${searchzip}&rad=25&sig=${zipHash}`;
  try {
    const courseStream = await fetch(zipUrl);
    const courseJson = await courseStream.json();
    return courseJson;
  } catch (err) {
    return { Error: err.stack};
  }

}

router.get("/", (req, res) => {
    res.json({ success: "Hello Weather!"});
});

router.get("/:searchzip", async (req, res) => {
  const searchzip = req.params.searchzip;
  const data = await fetchCoursesZip(searchzip);
  res.json(data);
});

router.post("/", async (req, res) => {
  const searchzip = req.body.searchzip;
  const data = await fetchCoursesZip(searchzip);
  res.json(data);
});

module.exports = router;