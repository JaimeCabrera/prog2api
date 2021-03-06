const { authJwt } = require("../middleware");
const category = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/categories", [authJwt.verifyToken], category.findAll);
  app.post("/api/categories", [authJwt.verifyToken], category.create);
  app.put("/api/categories/category", [authJwt.verifyToken], category.update);
  app.get(
    "/api/categories/:categoryId",
    [authJwt.verifyToken],
    category.findOne
  );

  app.delete(
    "/api/categories/:categoryId",
    [authJwt.verifyToken],
    category.delete
  );
};
