const express = require("express");
const router = express.Router();
const Users = require("./models/Users");
const Borders = require("./models/Borders");
const Shelters = require("./models/Shelters");
const isValidObjectId = require("mongoose").isValidObjectId;

router.get("/shelters", async (_, res) => {
  const shelters = await Shelters.find();
  res.status(200).send(shelters);
});

router.post("/shelters", async (req, res) => {
  const { city, region, address, size, capacity, resources, doctors, risk } =
    req.body;

  const shelter = new Shelters({
    city: city,
    region: region,
    address: address,
    size: size,
    capacity: capacity,
    resources: resources,
    doctors: doctors,
    risk: risk,
  });

  await shelter.save();
  res.status(200).send(shelter);
});

router.put("/shelters", async (req, res) => {
  const { id, size, capacity, resources, doctors, risk } = req.body;

  if (!isValidObjectId(id)) {
    res.status(404).send("Not found.");
    return;
  }

  const shelter = await Shelters.findOne({ _id: id });

  if (shelter) {
    shelter.size = size;
    shelter.capacity = capacity;
    shelter.resources = resources;
    shelter.doctors = doctors;
    shelter.risk = risk;

    await shelter.save();
    res.status(200).send(shelter);
  } else {
    res.status(404).send("Not found.");
  }
});

router.get("/borders", async (_, res) => {
  const borders = await Borders.find();
  res.status(200).send(borders);
});

router.post("/borders", async (req, res) => {
  const { city, region, address, size, capacity, risk } = req.body;

  const border = new Borders({
    city: city,
    region: region,
    address: address,
    size: size,
    capacity: capacity,
    risk: risk,
  });

  await border.save();
  res.status(200).send(border);
});

router.put("/borders", async (req, res) => {
  const { id, size, capacity, risk } = req.body;

  if (!isValidObjectId(id)) {
    res.status(404).send("Not found.");
    return;
  }

  const border = await Borders.findOne({ _id: id });

  if (border) {
    border.size = size;
    border.capacity = capacity;
    border.risk = risk;

    await border.save();
    res.status(200).send(border);
  } else {
    res.status(404).send("Not found.");
  }
});

module.exports = router;
