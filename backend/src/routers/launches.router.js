const express = require("express");
const {
  getAllLaunches,
  getAllPastLaunches,
  getAllUpcomingLaunches,
  getLaunchById,
  createLaunches,
  deleteLaunchById,
  updateLaunchById,
} = require("./launches.repositary");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // let allLaunches = await getAllPastLaunches();
    // let allLaunches = await getAllUpcomingLaunches();
    let allLaunches = await getAllLaunches();

    return res.status(200).send(allLaunches);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let launch = await getLaunchById(id);
    if (!launch) throw new Error(404);
    res.status(200).send(launch);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newLaunch = await createLaunches(req.body);
    res.status(201).send(newLaunch);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const numberOfDeletedLaunches = await deleteLaunchById(id);
    if (!numberOfDeletedLaunches) throw new Error(404);
    res.status(200).json(`Games deleted: ${numberOfDeletedLaunches}`);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedLaunch = await updateLaunchById(id, req.body);
    if (!updatedLaunch) throw new Error(404);

    res.status(200).send(updatedLaunch);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
