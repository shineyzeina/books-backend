const express = require("express");
const router = express.Router();
const institutionService = require("./institution.service");
const path = require("path");
const fs = require("fs");

router.post("/", saveNew);
router.get("/", getAll);
router.get("/partial", getSome);
router.get("/count", getCount);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function saveNew(req, res, next) {
  req.body.createdBy = req.user.sub;
  institutionService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next("Error honnn: " + err));
}

function getAll(req, res, next) {
  institutionService
    .getAll(req.query)
    .then((institutions) => res.json(institutions))
    .catch((err) => next(err));
}

function getSome(req, res, next) {
  institutionService
    .getSome(req.query)
    .then((institutions) => res.json(institutions))
    .catch((err) => next(err));
}

function getCount(req, res, next) {
  institutionService
    .getCount(req.query)
    .then((count) => {
      res.json({ count });
    })
    .catch((err) => next(err));
}

function getById(req, res, next) {
  institutionService
    .getById(req.params.id)
    .then((institution) =>
      institution ? res.json(institution) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function update(req, res, next) {
  institutionService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  institutionService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
