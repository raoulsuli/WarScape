const badgeColor = (var1, var2) =>
  var1 <= parseInt(var2 / 4)
    ? "bg-green-500"
    : var1 > parseInt((3 * var2) / 4)
    ? "bg-red-500"
    : "bg-gray-500";

const fieldColor = (var1, var2) =>
  var1 <= parseInt(var2 / 4)
    ? "text-green-500"
    : var1 > parseInt((3 * var2) / 4)
    ? "text-red-500"
    : "text-gray-500";

const getModalBody = (address, region, city, capacity, size, risk) => [
  { key: "Risk", value: `${risk} out of 5`, color: fieldColor(risk, 5) },
  {
    key: "Capacity",
    value: `${capacity - size} out of ${capacity} places available`,
    color: fieldColor(size, capacity),
  },
  { key: "Address", value: `${address}, ${region}, ${city}` },
];

export { badgeColor, fieldColor, getModalBody };
