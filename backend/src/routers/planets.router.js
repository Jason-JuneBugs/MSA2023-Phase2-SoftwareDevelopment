const express = require("express");
const {getAllPlanets } = require("./planets.repositary");
const router = express.Router();
 

router.get("/", async (req, res, next) => {
  try {
    // const { limit, page } = req.query;
    // const safeLimit = Boolean(limit) ? parseInt(limit) : 2;
    // const safePage = Boolean(parseInt(page)) ? parseInt(page) : 1;
 
    let allPlanets = await getAllPlanets();

    return res.status(200).send(allPlanets);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
