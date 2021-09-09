const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");

const app = express();

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// parse request type application/json
app.use(express.json());

// parse requres type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// db coneection
const db = require("./models/index");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", () => {
  res.json({ message: "welcome to rest server " });
});

// set port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
