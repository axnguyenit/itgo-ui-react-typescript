import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: number) {
  return numeral(number).format(Number.isInteger(number) ? '0,000' : '0.000');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fShortenNumber(number: number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: number) {
  return numeral(number).format('0.0 b');
}
