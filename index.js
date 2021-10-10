const express = require("express");
const cors = require("cors");
var path = require("path");
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

// ssend a index file with info
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/index.html"));
});
// routes
require("./routes/auth.routes")(app);
require("./routes/category.routes")(app);
require("./routes/task.routes")(app);
require("./routes/email.routes")(app);

// set port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
