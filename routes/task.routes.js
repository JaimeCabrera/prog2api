const { authJwt } = require("../middleware");
const task = require("../controllers/task.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // create a task
  app.get("/api/tasks/:categoryId", [authJwt.verifyToken], task.findAll);
  app.post("/api/tasks", [authJwt.verifyToken], task.create);
  app.get("/api/tasks/", [authJwt.verifyToken], task.findOne);
  app.put("/api/tasks/:taskId", [authJwt.verifyToken], task.update);
  app.delete("/api/tasks/:taskId", [authJwt.verifyToken], task.delete);
};
