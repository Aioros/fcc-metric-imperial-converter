/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      if (isNaN(initNum) && initUnit === undefined)
        return res.send("invalid number and unit");
      else if (isNaN(initNum))
        return res.send("invalid number");
      else if (initUnit === undefined)
        return res.send("invalid unit");
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.json({initNum, initUnit, returnNum, returnUnit, string: toString});
    });
    
};
