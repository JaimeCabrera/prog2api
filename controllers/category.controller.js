const db = require("../models");
const User = db.user;
const Category = db.category;

exports.create = (req, res) => {
  // validate request
  const { name, userId } = req.body;
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
  console.log(req.body);
  const { userId } = req.body;
  return Category.findAll({ where: { userId } })
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

// exports.update = (req, res) => {
//   const id = req.params.categoryId;

//   Tutorial.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id,
//       });
//     });

exports.delete = (req, res) => {
  const { categoryId } = req.params;
  console.log(categoryId);
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
};
