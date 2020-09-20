"use strict";
const Fraction = require("fraction.js");

const origin = new WeakMap();

class Odds {
  constructor(input) {
    const odds = typeof input === "number" ? input.toFixed(2) : input;
    if (odds.includes("/")) {
      Object.assign(this, Odds.fromFractional(odds));
      origin.set(this, "fractional");
    } else if (odds.includes(".")) {
      Object.assign(this, Odds.fromDecimal(odds));
      origin.set(this, "decimal");
    } else {
      Object.assign(this, Odds.fromAmerican(odds));
      origin.set(this, "american");
    }
  }

  static fromDecimal(decimal) {
    const decimalValue = Number(decimal);
    const odds = {};

    odds.american =
      decimalValue >= 2
        ? `+${((decimalValue - 1) * 100).toFixed(0)}`
        : `-${(100 / (decimalValue - 1)).toFixed(0)}`;
    odds.decimal = typeof decimal === "number" ? decimal.toFixed(2) : decimal;
    odds.fractional = Number.isInteger(decimalValue)
      ? `${decimalValue - 1}/1`
      : new Fraction((decimalValue - 1).toFixed(2)).toFraction();

    return odds;
  }

  static fromFractional(fractional) {
    const fractionalValue = new Fraction(fractional);
    const odds = {};

    odds.american =
      fractionalValue >= 1
        ? `+${(fractionalValue * 100).toFixed(0)}`
        : `-${(100 / fractionalValue).toFixed(0)}`;
    odds.decimal = (fractionalValue + 1).toFixed(2);
    odds.fractional = fractional;

    return odds;
  }

  static fromAmerican(american) {
    const americanValue = Number(american);
    const odds = {};

    if (americanValue > 0) {
      odds.american = american.startsWith("+") ? american : `+${american}`;
      odds.decimal = (americanValue / 100 + 1).toFixed(2);
      odds.fractional =
        americanValue % 100 === 0
          ? `${americanValue / 100}/1`
          : new Fraction((americanValue / 100).toFixed(2)).toFraction();
    } else {
      odds.decimal = (100 / Math.abs(americanValue) + 1).toFixed(2);
      odds.american = american;
      odds.fractional = new Fraction(
        (100 / Math.abs(americanValue)).toFixed(2)
      ).toFraction();
    }

    return odds;
  }

  [Symbol.toPrimitive](type) {
    const source = origin.get(this);
    if (type === "number") {
      return Number(this.decimal);
    }
    return this[source];
  }

  get chance() {
    return `${(this.probability * 100).toFixed(2)}%`;
  }
  get probability() {
    return Number((1 / Number(this.decimal)).toFixed(4));
  }
}

module.exports = Odds;
