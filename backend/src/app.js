// const express =require('express')
// const app=express()
// app.get('/',(req,res)=>{
//     res.send('Hello NASA Pilots')
// })
// module.exports=app;


const express = require("express");
const app = express();
const cors = require("cors");
// const questionRouter = require("./questions/question.router");
// const answerRouter = require("./answers/answer.router");
// const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

//middleware
app.use(cors());
app.use(express.json());

// AWS Copilot requires a healthcheck endpoint. It calls this endpoint
// every 2 minutes to check the server is still running. If this endpoint fails
// the container will automatically be redeployed.
// DO NOT REMOVE THIS ENDPOINT!
app.get("/api/healthcheck", async (req, res) => {
  res.json({ message: "OK!" });
});

app.get('/api/',(req,res)=>{
    // res.send('Hello NASA Pilots')
    res.json({message:"Hello NASA pilots"})
})

// Walking skeleton endpoint - this calls through to the database to ensure
// our system is working end to end. You can remove this endpoint once you
// have your walking skeleton deployed and working

// routes
// app.use("/api/questions", questionRouter);

// app.use("/api/answers", answerRouter);

// app.get("/api/answers/:questionId", async (req, res) => {
//   try {
//     const question_id = parseInt(req.params.questionId);
//     const answers = await pool.query(
//       `SELECT * FROM answer WHERE question_id=${question_id}`
//     );
//     res.json(answers.rows);
//   } catch (e) {
//     return res.status(500).json({ error: e.message });
//   }
// });

// error handling middleware
// app.use(errorHandlerMiddleware);

module.exports = app;
