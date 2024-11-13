import numeral from 'numeral';

export const numberFormat = (value: number, format = '0.00') =>
  numeral(value).format(format);
