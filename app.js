require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = 3001;
const logger = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const App = express();

App.use(logger("dev"));
App.use(cors());

App.use(express.urlencoded({ extended: "true" }));
App.use(express.json());

App.use(routes);
App.use(errorHandler);

App.get("/", (_req, res) => {
    return res
        .status(200)
        .json({ status_message: `[TCR Elburs] is running on port ${PORT}` });
});

App.use(express.static(__dirname + "/public/uploads"));
App.get("/", function (_req, res) {
    res.sendFile(__dirname + "/index.html");
});

App.listen(PORT, () => {
    console.log(`This Server running on port ${PORT}`);
});

module.exports = App;
