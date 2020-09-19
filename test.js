import test from "ava";
import Odds from ".";

const compareArray = [
  ["1/4", "1.25", "-400"],
  ["9/20", "1.45", "-222"],
  ["1/2", "1.50", "-200"],
  ["4/5", "1.80", "-125"],
  ["1/1", "2.00", "+100"],
  ["5/4", "2.25", "+125"],
  ["7/5", "2.40", "+140"],
  ["9/5", "2.80", "+180"],
  ["12/5", "3.40", "+240"],
  ["3/1", "4.00", "+300"],
  ["5/1", "6.00", "+500"],
  ["11/2", "6.50", "+550"],
  ["15/2", "8.50", "+750"],
  ["8/1", "9.00", "+800"],
  ["20/1", "21.00", "+2000"],
  ["100/1", "101.00", "+10000"],
];

compareArray.forEach((row, index) => {
  test(`new Odds(decimal) ${index}`, (t) => {
    const odds = new Odds(row[1]);
    t.is(odds.fractional, row[0]);
    t.is(odds.decimal, row[1]);
    t.is(odds.american, row[2]);
  });
  test(`new Odds(fractional) ${index}`, (t) => {
    const odds = new Odds(row[0]);
    t.is(odds.fractional, row[0]);
    t.is(odds.decimal, row[1]);
    t.is(odds.american, row[2]);
  });
  test(`new Odds(american) ${index}`, (t) => {
    const odds = new Odds(row[2]);
    t.is(odds.fractional, row[0]);
    t.is(odds.decimal, row[1]);
    t.is(odds.american, row[2]);
  });
  test(`Odds.fromDecimal(decimal) ${index}`, (t) => {
    const odds = new Odds(row[1]);
    t.is(odds.fractional, row[0]);
    t.is(odds.decimal, row[1]);
    t.is(odds.american, row[2]);
  });
  test(`Odds.fromFractional(fractional) ${index}`, (t) => {
    const odds = new Odds(row[0]);
    t.is(odds.fractional, row[0]);
    t.is(odds.decimal, row[1]);
    t.is(odds.american, row[2]);
  });
  test(`Odds.fromAmerican(american) ${index}`, (t) => {
    const odds = new Odds(row[2]);
    t.is(odds.fractional, row[0]);
    t.is(odds.decimal, row[1]);
    t.is(odds.american, row[2]);
  });
});

test("chance", (t) => {
  t.is("66.67%", new Odds(1.5).chance);
  t.is("50.00%", new Odds(2).chance);
  t.is("33.33%", new Odds(3).chance);
});

test("probability", (t) => {
  t.is(0.6667, new Odds(1.5).probability);
  t.is(0.5, new Odds(2).probability);
  t.is(0.3333, new Odds(3).probability);
});

test("string casting", (t) => {
  t.is("Odds: 5/4", "Odds: " + new Odds("5/4"));
  t.is("Odds: 2.25", "Odds: " + new Odds("2.25"));
  t.is("Odds: +125", "Odds: " + new Odds("+125"));
});

test("number casting", (t) => {
  t.is(225, 100 * new Odds("5/4"));
  t.is(225, 100 * new Odds("2.25"));
  t.is(225, 100 * new Odds("+125"));
});
