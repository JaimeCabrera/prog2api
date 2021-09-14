const db = require("../models");
const Task = db.task;

// create a new task
exports.create = (req, res) => {
  const { name, priority, categoryId } = req.body;

  const err = { name: "", status: "", priority: "" };
  // validaciones
  if (!name || !priority) {
    res.status(400).send({ message: "Los campos no puede ir vacios" });
    return;
  }

  const category = {
    name,
    priority,
    categoryId,
  };
  Task.create(category)
    .then((data) => {
      res.status(200).send({ task: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Se produjo en error al crear la tarea.",
      });
    });
};

// find all tasks for category
exports.findAll = (req, res) => {
  const { categoryId } = req.params;
  Task.findAll({ where: { categoryId } })
    .then((data) => {
      res.status(200).send({ tasks: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Se produjo en error al recuperar las tareas.",
      });
    });
};

// find a one task
exports.findOne = (req, res) => {
  const id = req.body.taskId;
  Task.findByPk(id)
    .then((data) => {
      res.send({ task: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener la tarea con id=" + id,
      });
    });
};
// find a task and update status
exports.findAndUpdate = (req, res) => {
  const { id, status } = req.body;
  console.log(id, status);
  Task.update({ status: !status }, { where: { id } })
    .then((task) => {
      if (task == 1) {
        res.status(200).send({
          message: "La tarea fue marcada como completada.",
        });
      } else {
        res.status(400).send({
          message: ` No se encontro la tarea o no existe informacion !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al cambiar de estado la tarea con id=" + id,
      });
    });
};
// update task by id
exports.update = (req, res) => {
  const id = req.params.taskId;
  const { name, priority } = req.body;

  Task.update(
    { name, priority },
    {
      where: { id },
    }
  )
    .then((task) => {
      if (task == 1) {
        res.send({
          message: "La tarea fue editada con exito.",
        });
      } else {
        res.send({
          message: `No se puede editar la tarea con id=${id}. No se encontro la tarea o no existe informacion !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error editando la tarea con id=" + id,
      });
    });
};

// delete task
exports.delete = (req, res) => {
  const { taskId } = req.params;
  Task.destroy({
    where: { id: taskId },
  })
    .then((task) => {
      if (task == 1) {
        res.send({
          message: "La Tarea fue eliminada.",
        });
      } else {
        res.send({
          message: `No se puede eliminar la Tarea con id=${taskId}. la categoria no existe!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se puede eliminar la tarea con id" + taskId,
      });
    });
};
