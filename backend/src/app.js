require("dotenv").config();
const launchesRouter = require("./routers/launches.router");
const planetsRouter = require("./routers/planets.router");
const path = require("path");
const yaml = require("js-yaml");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "./apispec.yaml"), "utf8")
);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/launches", launchesRouter);
app.use("/api/planets", planetsRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// AWS Copilot requires a healthcheck endpoint. It calls this endpoint
// every 2 minutes to check the server is still running. If this endpoint fails
// the container will automatically be redeployed.
// DO NOT REMOVE THIS ENDPOINT!
app.get("/api/healthcheck", (req, res) => {
  res.json({ message: "OK!" });
});

app.get("/api/", (req, res) => {
  // res.send('Hello NASA Pilots')
  res.json({ message: "Hello NASA pilots" });
});

module.exports = app;
