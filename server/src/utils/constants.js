const fieldsUndefined = (fields) =>
  fields.includes(undefined) || fields.includes("") || fields.includes({});

const OBJECT_TYPE = { SHELTER: "shelter", BORDER: "border" };

module.exports = {
  fieldsUndefined,
  OBJECT_TYPE,
};
