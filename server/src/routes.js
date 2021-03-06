const express = require("express");
const router = express.Router();
const isValidObjectId = require("mongoose").isValidObjectId;

const Border = require("./models/Border");
const Shelter = require("./models/Shelter");
const RentalHistory = require("./models/RentalHistory");

const { checkJwt, checkPermission } = require("./utils/auth");
const { fieldsUndefined, OBJECT_TYPE } = require("./utils/constants");
const { publish, consume } = require("./utils/amqp");

// GET

router.get("/shelters", checkJwt, async (_, res) => {
  const shelters = await Shelter.find();
  res.status(200).send(shelters);
});

router.get("/borders", checkJwt, async (_, res) => {
  const borders = await Border.find();
  res.status(200).send(borders);
});

router.get("/rentals", checkJwt, async (req, res) => {
  const { email, active, type } = req.query;

  const queryParams = {};
  if (email) Object.assign(queryParams, { user_email: email });
  if (active) Object.assign(queryParams, { active: true });
  if (type) Object.assign(queryParams, { type: type });

  const rentals = await RentalHistory.find(queryParams);

  Promise.all(
    rentals.map(async (r) =>
      r.type === OBJECT_TYPE.SHELTER
        ? await Shelter.findOne({ _id: r.item_id })
        : await Border.findOne({ _id: r.item_id })
    )
  ).then((objects) => {
    const result = rentals.map((r, index) => ({
      type: r.type,
      size: r.size,
      date: r.date,
      active: r.active,
      email: r.user_email,
      item: objects[index],
    }));

    res.status(200).send(result);
  });
});

// POST

router.post("/shelters", checkJwt, checkPermission, async (req, res) => {
  const { title, city, region, address, capacity, resources, doctors, risk } =
    req.body;

  const fieldsArr = [
    title,
    city,
    region,
    address,
    capacity,
    resources,
    doctors,
    risk,
  ];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  const shelter = new Shelter({
    title: title,
    city: city,
    region: region,
    address: address,
    size: 0,
    capacity: capacity,
    resources: resources,
    doctors: doctors,
    risk: risk,
  });

  await shelter.save();
  res.status(200).send(shelter);
});

router.post("/borders", checkJwt, checkPermission, async (req, res) => {
  const { title, city, region, address, capacity, risk } = req.body;

  const fieldsArr = [title, city, region, address, capacity, risk];

  if (fieldsUndefined(fieldsArr)) {
    res.status(400).send();
    return;
  }

  const border = new Border({
    title: title,
    city: city,
    region: region,
    address: address,
    size: 0,
    capacity: capacity,
    risk: risk,
  });

  await border.save();
  res.status(200).send(border);
});

router.post("/rentShelter", checkJwt, async (req, res) => {
  const { id, size, date, email } = req.body;

  const fieldsArr = [id, size, email];

  if (fieldsUndefined(fieldsArr) || !isValidObjectId(id)) {
    res.status(400).send();
    return;
  }

  const shelter = await Shelter.findOne({ _id: id });
  const rentalHistory = await RentalHistory.findOne({
    type: OBJECT_TYPE.SHELTER,
    user_email: email,
    active: true,
  });

  if (shelter) {
    if (size === 0) {
      // removal
      if (rentalHistory) {
        shelter.size -= rentalHistory.size;
        rentalHistory.active = false;

        await shelter.save();
        await rentalHistory.save();
        res.status(200).send({});
        publish("shelter.unrent", {
          email: email,
          title: shelter.title,
          city: shelter.city,
          region: shelter.region,
          address: shelter.address,
        });
      } else {
        res.status(404).send();
      }
    } else {
      if (!rentalHistory && shelter.size + parseInt(size) <= shelter.capacity) {
        if (fieldsUndefined([date])) {
          res.status(400).send();
          return;
        }
        // no current rental
        shelter.size += parseInt(size);

        const newRental = new RentalHistory({
          type: OBJECT_TYPE.SHELTER,
          item_id: id,
          size: parseInt(size),
          date: date,
          user_email: email,
          active: true,
        });

        await shelter.save();
        await newRental.save();
        res.status(200).send(newRental);
        publish("shelter.rent", {
          size: parseInt(size),
          date: date,
          email: email,
          title: shelter.title,
          city: shelter.city,
          region: shelter.region,
          address: shelter.address,
        });
      } else {
        res.status(400).send();
      }
    }
  } else {
    res.status(404).send();
  }
});

router.post("/rentBorder", checkJwt, async (req, res) => {
  const { id, size, date, email } = req.body;

  const fieldsArr = [id, size, email];

  if (fieldsUndefined(fieldsArr) || !isValidObjectId(id)) {
    res.status(400).send();
    return;
  }

  const border = await Border.findOne({ _id: id });
  const rentalHistory = await RentalHistory.findOne({
    type: OBJECT_TYPE.BORDER,
    user_email: email,
    active: true,
  });

  if (border) {
    if (size === 0) {
      // removal
      if (rentalHistory) {
        border.size -= rentalHistory.size;
        rentalHistory.active = false;

        await border.save();
        await rentalHistory.save();
        res.status(200).send({});
        publish("border.unrent", {
          email: email,
          title: border.title,
          city: border.city,
          region: border.region,
          address: border.address,
        });
      } else {
        res.status(404).send();
      }
    } else {
      if (!rentalHistory && border.size + parseInt(size) <= border.capacity) {
        if (fieldsUndefined([date])) {
          res.status(400).send();
          return;
        }
        // no current rental
        border.size += parseInt(size);

        const newRental = new RentalHistory({
          type: OBJECT_TYPE.BORDER,
          item_id: id,
          size: parseInt(size),
          date: date,
          user_email: email,
          active: true,
        });

        await border.save();
        await newRental.save();
        res.status(200).send(newRental);
        publish("border.rent", {
          size: parseInt(size),
          date: date,
          email: email,
          title: border.title,
          city: border.city,
          region: border.region,
          address: border.address,
        });
      } else {
        res.status(400).send();
      }
    }
  } else {
    res.status(404).send();
  }
});

// PUT

router.put("/shelters", checkJwt, checkPermission, async (req, res) => {
  const { id, title, capacity, resources, doctors, risk } = req.body;

  const fieldsArr = [id, title, capacity, resources, doctors, risk];

  if (fieldsUndefined(fieldsArr) || !isValidObjectId(id)) {
    res.status(400).send();
    return;
  }

  const shelter = await Shelter.findOne({ _id: id });

  if (shelter) {
    shelter.title = title;
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

router.put("/borders", checkJwt, checkPermission, async (req, res) => {
  const { id, title, capacity, risk } = req.body;

  const fieldsArr = [id, title, capacity, risk];

  if (fieldsUndefined(fieldsArr) || !isValidObjectId(id)) {
    res.status(400).send();
    return;
  }

  const border = await Border.findOne({ _id: id });

  if (border) {
    border.title = title;
    border.capacity = capacity;
    border.risk = risk;

    await border.save();
    res.status(200).send(border);
  } else {
    res.status(404).send();
  }
});

// DELETE

router.delete("/shelters", checkJwt, checkPermission, async (req, res) => {
  const { id } = req.body;

  const fieldsArr = [id];

  if (fieldsUndefined(fieldsArr) || !isValidObjectId(id)) {
    res.status(400).send();
    return;
  }

  const response = await Shelter.deleteOne({ _id: id });

  if (response.deletedCount === 0) {
    res.status(404).send();
  } else {
    await RentalHistory.deleteMany({ item_id: id });
    res.status(200).send({});
  }
});

router.delete("/borders", checkJwt, checkPermission, async (req, res) => {
  const { id } = req.body;

  const fieldsArr = [id];

  if (fieldsUndefined(fieldsArr) || !isValidObjectId(id)) {
    res.status(400).send();
    return;
  }

  const response = await Border.deleteOne({ _id: id });

  if (response.deletedCount === 0) {
    res.status(404).send();
  } else {
    await RentalHistory.deleteMany({ item_id: id });
    res.status(200).send({});
  }
});

if (process.env.NODE_ENV === "production") {
  (async () => consume())(); // consume rabbitmq requests
}

module.exports = router;
