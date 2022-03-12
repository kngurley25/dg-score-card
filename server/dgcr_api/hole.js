const express = require("express");
const router = express.Router();

const fetchHoleInfo = async (dgcr_id) => {
    const holeInfoHash = process.env.HOLE_INFO_HASH;
    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
    
    const key = process.env.DGCR_API_KEY;
    const holeInfoUrl = `https://www.dgcoursereview.com/api_test/?key=${key}&mode=holeinfo&id=${dgcr_id}&sig=${holeInfoHash}`;
    try {
      const holeInfoStream = await fetch(holeInfoUrl);
      const holeInfoJson = await holeInfoStream.json();
      return holeInfoJson;
    } catch (err) {
      return { Error: err.message };
    }
  
  }

  router.get("/:dgcr_id", async (req, res) => {
    const dgcr_id = req.params.dgcr_id;
    const data = await fetchHoleInfo(dgcr_id);
    res.json(data);
  });

  module.exports = router;