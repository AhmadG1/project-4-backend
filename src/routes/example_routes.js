import express from "express";
import passport from "passport";
import models from "./../db/models";
const tokenAuth = passport.authenticate("jwt", { session: false });
const User = models.User;

// instantiate a router (mini app that only handles routes)
const router = express.Router();

router.get("/example", (req, res, next) => {
  res.send("hi")
  // start a promise chain, so that any errors will pass to `handle`
});

router.get("/example/:id", (req, res, next) => {
  res.send("hi")
  // start a promise chain, so that any errors will pass to `handle`
});


router.post("/example", (req, res, next) => {
  res.send("hi")
  // start a promise chain, so that any errors will pass to `handle`
});

router.put("/example/:id", (req, res, next) => {
  res.send("hi")
  // start a promise chain, so that any errors will pass to `handle`
});

router.delete("/example/:id", (req, res, next) => {
  res.send("hi")
  // start a promise chain, so that any errors will pass to `handle`
});
export default router;
