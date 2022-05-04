const express = require("express");
const router = express.Router();
const Users = require("./models/Users");
const Borders = require("./models/Borders");
const Shelters = require("./models/Shelters");
const isValidObjectId = require("mongoose").isValidObjectId;
const { checkJwt, checkPermission } = require("./utils/auth");
const { fieldsUndefined } = require("./utils/constants");

router.get("/shelters", checkJwt, async (_, res) => {
  const shelters = await Shelters.find();
  if (shelters) res.status(200).send(shelters);
  else res.status(404).send();
});

router.post("/shelters", checkJwt, checkPermission, async (req, res) => {
  const { city, region, address, size, capacity, resources, doctors, risk } =
    req.body;

  const fieldsArr = [
    city,
    region,
    address,
    size,
    capacity,
    resources,
    doctors,
    risk,
  ];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

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

router.put("/shelters", checkJwt, checkPermission, async (req, res) => {
  const { id, size, capacity, resources, doctors, risk } = req.body;

  const fieldsArr = [id, size, capacity, resources, doctors, risk];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  if (!isValidObjectId(id)) {
    res.status(404).send();
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
    res.status(404).send();
  }
});

router.delete("/shelters", checkJwt, checkPermission, async (req, res) => {
  const { id } = req.body;

  const fieldsArr = [id];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  if (!isValidObjectId(id)) {
    res.status(404).send();
    return;
  }

  await Shelters.deleteOne({ _id: id });
  res.status(200).send();
});

router.post("/rentShelter", checkJwt, async (req, res) => {
  const { id, size } = req.body;

  const fieldsArr = [id, size];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  if (!isValidObjectId(id)) {
    res.status(404).send();
    return;
  }

  const shelter = await Shelters.findOne({ _id: id });

  if (shelter) {
    if (shelter.size + size <= shelter.capacity) {
      shelter.size += size;
      await shelter.save();
      res.status(200).send(shelter);
    } else {
      res.status(400).send();
    }
  } else {
    res.status(404).send();
  }
});

router.get("/borders", checkJwt, async (_, res) => {
  const borders = await Borders.find();
  if (borders) res.status(200).send(borders);
  res.status(404).send();
});

router.post("/borders", checkJwt, checkPermission, async (req, res) => {
  const { city, region, address, size, capacity, risk } = req.body;

  const fieldsArr = [city, region, address, size, capacity, risk];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

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

router.put("/borders", checkJwt, checkPermission, async (req, res) => {
  const { id, size, capacity, risk } = req.body;

  const fieldsArr = [id, size, capacity, risk];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  if (!isValidObjectId(id)) {
    res.status(404).send();
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
    res.status(404).send();
  }
});

router.delete("/borders", checkJwt, checkPermission, async (req, res) => {
  const { id } = req.body;

  const fieldsArr = [id];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  if (!isValidObjectId(id)) {
    res.status(404).send();
    return;
  }

  await Borders.deleteOne({ _id: id });
  res.status(200).send();
});

router.post("/rentBorder", checkJwt, async (req, res) => {
  const { id, size } = req.body;

  const fieldsArr = [id, size];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  if (!isValidObjectId(id)) {
    res.status(404).send();
    return;
  }

  const border = await Borders.findOne({ _id: id });

  if (border) {
    if (border.size + size <= border.capacity) {
      border.size += size;
      await border.save();
      res.status(200).send(border);
    } else {
      res.status(400).send();
    }
  } else {
    res.status(404).send();
  }
});

module.exports = router;
