module.exports = {
  fieldsUndefined: (fields) =>
    fields.includes(undefined) || fields.includes("") || fields.includes({}),
  capitalize: (text) => text.charAt(0).toUpperCase() + text.slice(1),
  OBJECT_TYPE: { SHELTER: "shelter", BORDER: "border" },
  AMQP_URL: "amqp://guest:guest@rabbitmq:5672",
};
