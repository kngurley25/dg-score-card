const express = require("express");
const router = express.Router();

const zipRoutes = require('./zip.js');
const holeRoutes = require('./hole.js');

router.use('/zip', zipRoutes);
router.use('/hole', holeRoutes);



module.exports = router;