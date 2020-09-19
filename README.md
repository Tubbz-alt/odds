# Odds

> Odds convertion tool.

## Install

```
$ npm install @kamdz/odds
```

## Usage

```js
const Odds = require("@kamdz/odds");
// or
import Odds from "@kamdz/odds";

new Odds(1.5);
//=> { american: '-200', decimal: '1.50', fractional: '1/2' }
```

## new Odds(odds);

### params

#### odds

Type: `string | number`

String can be odds in:

- Fractional (UK) format e.g. `new Odds('5/4')`
- Decimal (European) format e.g. `new Odds('2.25')` **(dot is required)**
- American (Moneyline) format e.g. `new Odds('+125')`

Number odds are always recognized as Decimal (European) format, e.g. `new Odds(2.25)`

### return

Type: `Object`\
Structure: `{ american, decimal, fractional }`

Result of conversion odds to all 3 formats.

## get chance

If you used constructor you can also get `chance` of winning in percentage.

```js
const odds = new Odds(2.25);
odds.chance; // => "44.44%"
```

## get probability

If you used constructor you can also get `probability` of winning (between 0 and 1).

```js
const odds = new Odds(2.25);
odds.probability; // => 0.4444
```

## Odds casting to string

Instance of Odds are casting to string depending on the input in constructor.

```js
console.log("Odds: " + new Odds("5/4")); // => "Odds: 5/4"
console.log("Odds: " + new Odds("2.25")); // => "Odds: 2.25"
console.log("Odds: " + new Odds("+125")); // => "Odds: +125"
```

## Odds casting to number

Instance of Odds are casting to number always in Decimal (European). You can use it to multiply your bet.

```js
console.log(100 * new Odds("5/4")); // => 225
console.log(100 * new Odds("2.25")); // => 225
console.log(100 * new Odds("+125")); // => 225
```

## static Odds.fromDecimal(decimal)

### params

#### decimal

Type: `string | number`

Odd in Decimal (European) format as:

- string e.g. `Odds.fromDecimal('2.25')` **(dot is required)**
- number e.g. `Odds.fromDecimal(2.25)`

### return

Type: `Object`\
Structure: `{ american, decimal, fractional }`

Result of conversion odds to all 3 formats.

## static Odds.fromFractional(fractional)

### params

#### fractional

Type: `string`

Odd in Fractional (UK) format e.g. `Odds.fromFractional('5/4')`

### return

Type: `Object`\
Structure: `{ american, decimal, fractional }`

Result of conversion odds to all 3 formats.

## static Odds.fromAmerican(american)

### params

#### american

Type: `string`

Odd in American (Moneyline) format e.g. `Odds.fromAmerican('+125')`

### return

Type: `Object`\
Structure: `{ american, decimal, fractional }`

Result of conversion odds to all 3 formats.
