const express = require("express");
const {getAllLaunches,getAllPastLaunches,getAllUpcomingLaunches,getLaunchById, createLaunches,deleteLaunchById,updateLaunchById} = require("./launches.repositary");
const router = express.Router();
// const { errors } = require("celebrate");
// const {
//   idValidation,
//   bodyValidation,
//   bodyPatchValidation,
//   formatGenres,
// } = require("./library.utils");

// TODO: Add all routes
// router.get("/", async (req, res, next) => {
//   try {
//     let allGames = await getAllGames();
//     allGames = allGames.map((game) => ({
//       ...game,
//       genres: formatGenres(game.genres),
//     }));
//     return res.status(200).send(allGames);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const safeLimit = Boolean(limit) ? parseInt(limit) : 2;
    const safePage = Boolean(parseInt(page)) ? parseInt(page) : 1;
    // let allLaunches = await getAllPastLaunches();
    // let allLaunches = await getAllUpcomingLaunches();
    let allLaunches = await getAllLaunches()

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

router.delete("/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const numberOfDeletedLaunches = await deleteLaunchById(id);
    if (!numberOfDeletedLaunches) throw new Error(404);
    res.status(200).json(`Games deleted: ${numberOfDeletedLaunches}`);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id",  async (req, res, next) => {
    try {
      const { id } = req.params;
      let updatedLaunch = await updateLaunchById(id, req.body);
      if (!updatedLaunch) throw new Error(404);
      
      res.status(200).send(updatedLaunch);
    } catch (err) {
      next(err);
    }
  }
);

// router.post("/", bodyValidation, async (req, res, next) => {
//   try {
//     let newGame = await createGame(req.body);
//     newGame = { ...newGame, genres: formatGenres(newGame.genres) };
//     res.status(201).send(newGame);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/:id", idValidation, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     let game = await getGameById(id);
//     if (!game) throw new Error(404);
//     game = { ...game, genres: formatGenres(game.genres) };
//     res.status(200).send(game);
//   } catch (err) {
//     next(err);
//   }
// });

// router.patch(
//   "/:id",
//   [idValidation, bodyPatchValidation],
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       let updatedGame = await updateGameById(id, req.body);
//       if (!updatedGame) throw new Error(404);
//       updatedGame = {
//         ...updatedGame,
//         genres: formatGenres(updatedGame.genres),
//       };
//       res.send(updatedGame);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// router.delete("/:id", idValidation, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const numberOfDeletedGames = await deleteGameById(id);
//     if (!numberOfDeletedGames) throw new Error(404);
//     res.status(200).json(`Games deleted: ${numberOfDeletedGames}`);
//   } catch (err) {
//     next(err);
//   }
// });

// // 400 error response - Celebrate error handler middleware
// router.use(errors());
// // 404 error response
// router.use((err, req, res, next) => {
//   if (err.message == 404) res.status(404).send("Not found");
// });

module.exports = router;
