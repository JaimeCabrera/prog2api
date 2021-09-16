const db = require("../models");
const Category = db.category;
const Task = db.task;

exports.create = (req, res) => {
  // validate request
  const { name } = req.body;
  const { userId } = req;
  // const { userId } = req.params;
  if (!name) {
    res.status(400).send({
      message: "El campo es obligatorio!",
    });
    return;
  }
  // verify if category exist
  Category.findOne({ where: { name, userId } }).then((cat) => {
    if (cat) {
      return res.status(404).send({ message: "La categoria ya existe." });
    }
    const category = {
      name,
      userId,
    };
    Category.create(category)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Se produjo en error al crear la categorias.",
        });
      });
  });
};

exports.findAll = (req, res) => {
  // const { userId } = req.body.data;
  const { userId } = req;
  Category.findAll({ where: { userId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Se produjo en error al recuperar las categorias.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.categoryId;
  Category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener la categoria con id=" + id,
      });
    });
};

exports.update = (req, res) => {
  // const id = req.params.categoryId;
  const { name, categoryId: id } = req.body;
  console.log(req.body);

  Category.update(
    { name },
    {
      where: { id },
    }
  )
    .then((cat) => {
      if (cat == 1) {
        res.send({
          message: "La categoria fue editada con exito.",
        });
      } else {
        res.send({
          message: `No se puede editar la categoria con id=${id}. No se encontro la categoria o no existe informacion !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error editando la categoria con id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const { categoryId } = req.params;
  // verify if category not have tasks
  Task.findAll({ where: { categoryId: categoryId } })
    .then((tasks) => {
      if (tasks.length === 0) {
        // console.log("tareas de la categoria", tasks);
        Category.destroy({
          where: { id: categoryId },
        })
          .then((cat) => {
            if (cat == 1) {
              res.send({
                message: "Categoria Eliminada con exito!",
              });
            } else {
              res.send({
                message: `No se puede eliminar la categoria con id=${categoryId}. la categoria no existe!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "No se puede eliminar la categoria con id" + categoryId,
            });
          });
      } else {
        res.status(500).send({
          message:
            "No se puede eliminar la categoria, elimine las tareas antes ",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se puede eliminar la categoria con id" + categoryId,
      });
    });
};
