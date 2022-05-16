const parseResources = (inputStr) => {
  const values = inputStr
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "")
    .split(";");

  return values
    .map((resource) => {
      const splitResource = resource.split(",");
      if (splitResource.length === 2 && !splitResource.includes("")) {
        return {
          type: splitResource[0].trim(),
          quantity: splitResource[1].trim(),
        };
      }
    })
    .filter((r) => r);
};

const parseDoctors = (inputStr) => {
  const values = inputStr
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "")
    .split(";")
    .filter((v) => v.length);

  return values
    .map((doctor) => {
      const splitDoctor = doctor.split(",");
      if (splitDoctor.length === 2 && !splitDoctor.includes("")) {
        return {
          name: splitDoctor[0].trim(),
          specialisation: splitDoctor[1].trim(),
        };
      }
    })
    .filter((d) => d);
};

const stringifyResources = (arr) => {
  if (!arr) return "";
  let result = "";

  arr.forEach(({ type, quantity }) => (result += `${type}, ${quantity};\n`));

  return result;
};

const stringifyDoctors = (arr) => {
  if (!arr) return "";
  let result = "";

  arr.forEach(
    ({ name, specialisation }) => (result += `${name}, ${specialisation};\n`)
  );

  return result;
};

export { parseResources, parseDoctors, stringifyResources, stringifyDoctors };
