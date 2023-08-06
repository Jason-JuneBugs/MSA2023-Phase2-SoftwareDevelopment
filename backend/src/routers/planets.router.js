const express = require("express");
const { getAllPlanets } = require("./planets.repositary");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let allPlanets = await getAllPlanets();
    return res.status(200).send(allPlanets);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
