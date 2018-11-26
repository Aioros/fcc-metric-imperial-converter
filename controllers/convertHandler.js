/*
*
*
*       Complete the handler logic below
*       
*       
*/

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const units = [
  {
    type: "volume",
    name: "gallons",
    shortName: "gal",
    value: galToL
  },
  {
    type: "volume",
    name: "liters",
    shortName: "L",
    value: 1
  },
  {
    type: "mass",
    name: "pounds",
    shortName: "lbs",
    value: lbsToKg
  },
  {
    type: "mass",
    name: "kilograms",
    shortName: "kg",
    value: 1
  },
  {
    type: "length",
    name: "miles",
    shortName: "mi",
    value: miToKm
  },
  {
    type: "length",
    name: "kilometers",
    shortName: "km",
    value: 1
  }
];

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    var floatRegex = /^-?((\d+(\.\d*)?)|(\.\d+))?$/;
    var number = input.substr(0, input.search(/[A-Za-z]/));
    var numbers = number.split("/");
    if (numbers.length > 2)
      return NaN;
    if (numbers.length == 2)
      result = numbers[0] / numbers[1];
    else
      result = numbers[0];
    if (result.length == 0) {
      result = "1";
    }
    if (!floatRegex.test(result))
      return NaN;
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    var result;
    result = input.substr(input.search(/[A-Za-z]/));
    if (!units.find(u => u.shortName.toLowerCase() == result.toLowerCase()))
      result = undefined;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    var unit = units.find(u => u.shortName.toLowerCase() == initUnit.toLowerCase());
    if (unit) {
      result = units.find(u => u.type == unit.type && u.name != unit.name).shortName;
    } else {
      result = undefined;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    result = units.find(u => u.shortName.toLowerCase() == unit.toLowerCase()).name;
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    var result;
    var unit = units.find(u => u.shortName.toLowerCase() == initUnit.toLowerCase());
    var returnUnit = units.find(u => u.type == unit.type && u.name != unit.name);
    result = unit.value / returnUnit.value * initNum;
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = initNum + " " + this.spellOutUnit(initUnit)
      + " converts to " + returnNum.toFixed(5) + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
