# Humanize Numbers Exercise

This project is just a simple exercise to write out a number in the english language.
 
## Install

This package would be published to npm as a utility to be used with node, but since it's just
an example project just clone the project and run the tests.

### Requirements

This project uses ES6, so Node v4 is required.

## Usage

Just require the package in your project and execute the command.

```
var humanizeNumbers = require('./{path-to-clone-dir}/humanized-numbers-exercise');

humanizeNumbers.convert(1234567);
// -> One million two hundred thirty four thousand five hundred and sixty seven

// specify a suffix
humanizeNumbers.convert(2523.04, { suffix: 'dollars' });
// -> Two thousand five hundred twenty three and 4/100 dollars

// you can also specify a single and plural suffix
humanizeNumbers.convert(2523.04, { suffix: { single: 'dollar', plural: 'dollars' }});
// -> Two thousand five hundred twenty three and 4/100 dollars

humanizeNumbers.convert(1, { suffix: { single: 'dollar', plural: 'dollars' }});
// -> One dollar
```
# API

## convert(number[, options])

Convert will take the number given and convert it to the english language.

### options

 - `suffix` (`string` or `object`)
    - The suffix can be a string
    - The suffix can alo be an object that has two properties `single` and `plural`

## Test

Just clone the project. Node is required to run the tests.

Tests are built using `mocha`.

```
git clone git@github.com:chafnan/humanize-numbers-exercise.git

npm install
npm test
```

##License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)