'use strict';

const humanizeNumbers = require('./humanize-numbers');

describe('humanize numbers', () => {

  describe('conversion', () => {

    const params = {
      // test each word that will be used
      0: 'Zero',
      1: 'One',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
      8: 'Eight',
      9: 'Nine',
      10: 'Ten',
      11: 'Eleven',
      12: 'Twelve',
      13: 'Thirteen',
      14: 'Fourteen',
      15: 'Fifteen',
      16: 'Sixteen',
      17: 'Seventeen',
      18: 'Eighteen',
      19: 'Nineteen',
      20: 'Twenty',
      30: 'Thirty',
      40: 'Forty',
      50: 'Fifty',
      60: 'Sixty',
      70: 'Seventy',
      80: 'Eighty',
      90: 'Ninety',
      100: 'One hundred',
      1000: 'One thousand',
      1000000: 'One million',
      1000000000: 'One billion',

      // random numbers
      33: 'Thirty three',
      79: 'Seventy nine',
      150: 'One hundred fifty',
      248: 'Two hundred and forty eight',
      1564: 'One thousand five hundred and sixty four',
      63738: 'Sixty three thousand seven hundred and thirty eight',
      849345: 'Eight hundred forty nine thousand three hundred and forty five',
      2109840: 'Two million one hundred nine thousand eight hundred forty',
      4593826294: 'Four billion five hundred ninety three million eight hundred twenty six thousand two hundred and ninety four',

      // decimals:
      '12.34': 'Twelve and 34/100',
      '3298.33': 'Three thousand two hundred ninety eight and 33/100',
      '.50': '5/10',
      '0.75': '75/100',
      '0.045': '45/1000',
      '0.1001': '1001/10000'
    };

    let testFn = (key, value) => {
      it('should convert ' + key + ' to ' + value, () => {
        let actual = humanizeNumbers.convert(key);
        actual.should.equal(value);
      });
    };

    Object.keys(params).forEach((key) => {
      testFn(key, params[key]);
    });

  });

  it('should allow a suffix to be defined', () => {
    let suffix = 'dollars';
    let actual = humanizeNumbers.convert(10, { suffix: suffix });
    actual.should.containEql(suffix);
  });

  it('should allow suffix single or plural word', () => {
    let suffix = { single: 'dollar', plural: 'dollars' };
    let actual = humanizeNumbers.convert(1, { suffix: suffix });
    actual.should.containEql(suffix.single);

    actual = humanizeNumbers.convert(10, { suffix: suffix });
    actual.should.containEql(suffix.plural);
  });

  it('should throw error if value given is not a number', () => {
    (function () {
      humanizeNumbers.convert('notNumber');
    }).should.throw(Error);
  });

  it('should convert strings to numbers');
});