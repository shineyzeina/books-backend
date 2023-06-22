﻿const express = require("express");
const router = express.Router();
const authorService = require("./author.service");
const Book = require('../books/book.model');
let ImageManager = require("_helpers/ImageManager");

router.post("/", saveNew);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

// newly added
router.get("/counts/get-books", getBooksCount);

module.exports = router;

async function saveNew(req, res, next) {
  req.body.createdBy = req.user.sub;
  console.log(req.body);
  if (req.body.picChanged == true) {
    if (req.body.picture) {
      let uploadResult = await ImageManager.uploadImage(req.body.picture);
      req.body.authorImage = uploadResult.fileName;
      console.log("Ana hon");
    } else {
    }
  }
  authorService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next("Error: " + err));
}

function getAll(req, res, next) {
  authorService
    .getAll(req.query)
    .then((authors) => res.json(authors))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  authorService
    .getById(req.params.id)
    .then((author) => (author ? res.json(author) : res.sendStatus(404)))
    .catch((err) => next(err));
}

async function update(req, res, next) {
    console.log(req.body.picChanged)
  if (req.body.picChanged == true) {
    console.log("ANA honnnnn")
    const img = await authorService.getAuthorImg(req.params.id);
    if (img != "") {
      await ImageManager.deleteImage(img);
    }
    if (req.body.picture) {
      let uploadResult = await ImageManager.uploadImage(req.body.picture);
      req.body.authorImage = uploadResult.fileName;
      console.log("Ana hon");
    }
  }
  
  console.log("authorImage:" + req.body.authorImage)
  authorService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  authorService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

async function getBooksCount(req, res) {
  try {
    const authorBookCounts = await Book.aggregate([
      {
        $group: {
          _id: "$author",
          bookCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "authors", // Replace with your author collection name
          localField: "_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          _id: 0,
          authorName: { $concat: ["$author.first_name", " ", "$author.last_name"] },
          bookCount: 1,
        },
      },
    ]);

    const authorBookCountMap = {};
    authorBookCounts.forEach(({ authorName, bookCount }) => {
      authorBookCountMap[authorName] = bookCount;
    });

    res.json(authorBookCountMap);
  } catch (error) {
    console.error("Error fetching author book counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
