const myObject = {
  propA: "a",
  propB: { propBA: "ba", propBB: "bb" },
  propC: ["c0", "c1"],
  propD: {
    propDA: "da",
    propDB: { propDBA: "dba", propDBB: "dbb" },
    propDC: ["dc0", "dc1"],
  },
  propE: ["e0", { propE1A: "e1a", propE1B: "e1b" }, ["e20", "e21"]],
};

function isArray(data) {
  return Array.isArray(data);
}

function isPlainObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}

const maskedFieldsKeys = ["propA", "propDBA", "propE1B", "propD", "propC", "0"];
const mask = (objOrArr) => {
  const masked = {};
  for (let key in objOrArr) {
    const val = objOrArr[key];
    if (isPlainObject(val) || isArray(val)) {
      masked[key] = mask(val);
    } else {
      let maskedValue = "";

      masked[key] = objOrArr[key];
      if (maskedFieldsKeys.includes(key)) {
        [...objOrArr[key]].forEach((item) => {
          // console.log("========", item);
          maskedValue = maskedValue + "*";
          //   masked[key] = "*****";
        });
        masked[key] = maskedValue;
        // return masked;
      }
    }
  }
  return masked;
};

console.log("original... ", myObject);
console.log("masked... ", mask(myObject));
