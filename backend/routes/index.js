const express = require("express");
const router = express.Router();

// Require Firebase
const firebase = require("firebase");
const db = firebase.firestore();
const klasses = db.collection("klasses");

router.get("/klasses/:id", (req, res) => {
  const klassesArray = [];
  // Get ID
  const queryId = req.params.id;

  klasses
    .where("klassUserID", "==", queryId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        klassesArray.push(doc.data());
      });
      return res.send(klassesArray);
    })
    .catch(function (error) {
      console.warn("Error:", error);
      return res.send(error);
    });
});

router.get("/all-klasses", (req, res) => {
  const klassesArray = [];

  klasses
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        klassesArray.push(doc.data());
      });
      return res.send(klassesArray);
    })
    .catch(function (error) {
      console.warn("Error:", error);
      return res.send(error);
    });
});

module.exports = router;
