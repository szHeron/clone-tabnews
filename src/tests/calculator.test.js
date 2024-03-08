const calculator = require("../models/calculator.js");

test("Somar 2 numeros", () => {
  const result = calculator.sum(2, 3);
  expect(result).toBe(4);
});
