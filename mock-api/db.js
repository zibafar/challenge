const Numbers = require("./Data/Numbers.json");
const AddNumber = require("./Data/Add.json");
const MultiplyNumber = require("./Data/Multiply.json");

module.exports = function () {
  const data = {
    numbers: Numbers,
    add: AddNumber,
    multiply: MultiplyNumber,
  };

  return data;
};
