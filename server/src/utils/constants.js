const fieldsUndefined = (fields) =>
  fields.includes(undefined) || fields.includes("") || fields.includes({});

module.exports = { fieldsUndefined };
