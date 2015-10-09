'use strict';

// adding an extension to string
// should consider where to but an extension like this
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1)
};

class HumanizeNumbers {

  constructor () {
    this.ones = [ '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine' ];
    this.teens = [ 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen' ];
    this.tens = [ '', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety' ]
    this.thousands = [ 'Hundred', 'Thousand', 'Million', 'Billion' ]
  }

  convert (number, options) {
    if (!options) options = {};

    var num = Number(number);

    // throw if not number
    if (!num && num !== 0) throw new Error('parameter is not a number');

    let result = this.wordify(num);
    result = this.addSuffix(num, result, options.suffix);

    return result;
  }

  wordify (number) {

    // to split the number it must be a string
    let split = (number + '').split('.');

    let num = split[0];
    let decimal = split[1];

    let result = this.convertSet(num, decimal);

    return result.capitalizeFirstLetter();
  }

  convertSet (number, decimal, thousandsIndex) {

    // variables
    let one, ten, hundred;
    let result = "";
    if (!thousandsIndex) thousandsIndex = 0;

    // zero is a very special case
    // TODO: re-casted to number, should look into sometime a better way to pass variables around without all the casting
    if (Number(number) === 0 && !decimal) return 'Zero';

    // split number
    let split = (number + '').split('');

    // get high number words
    if (split.length > 3) {
      result = this.convertSet(Math.floor(number/1000), null, thousandsIndex + 1) + ' ';
    }

    // reversing the split will handle <100 numbers
    split = split.reverse();
    one = Number(split[0]);
    ten = Number(split[1]);
    hundred = Number(split[2]);

    let isTeen = ten !== 1;

    // now convert each number place
    if (hundred)
      result += this.ones[hundred] + ' ' + this.thousands[0];

    if (thousandsIndex === 0 && hundred && ten && one) {
      if (!decimal) {
        result += ' and';
      }
    }

    if (ten && isTeen)
      result += ' ' + this.tens[ten];

    if (one || one === 0) {
      var oneText = isTeen ? this.ones[one] : this.teens[one];
      result += ' ' + oneText;
    }

    if (thousandsIndex > 0 && (hundred || ten || one))
      result += ' ' + this.thousands[thousandsIndex];

    if (decimal) {
      if (result.trim())
        result += ' and';
      result += ' ' + this.convertDecimal(decimal);
    }

    return result.trim();
  }

  convertDecimal (decimal) {
    let first = decimal + '';

    while (first.charAt(0) === '0') {
      first = decimal.slice(1);
    }

    let result = '' + first + '/1';

    for (var i = 0; i < decimal.length; i++) {
      result +=  '0'
    }

    return result;
  }

  addSuffix (num, result, suffix) {
    if (!suffix) return result;

    const add = (str, suf) => {
      return str += ' ' + suf;
    };

    if (typeof suffix === 'string') {
      return add(result, suffix);
    }

    if (num === 1 && suffix.single) {
      return add(result, suffix.single);
    }

    if (suffix.plural) {
      return add(result, suffix.plural)
    }

    return result;
  }

}

// create instance here to not expose whole class
const instance = new HumanizeNumbers();

// exports
exports.convert = (number, options) => { return instance.convert(number, options); }; // lost scope without function