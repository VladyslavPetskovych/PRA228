// Правильне відмінювання іменників після числівників (1 ліжко, 2 ліжка, 5 ліжок)
export function plural(number, forms) {
  const n = Math.abs(Number(number)) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

export const BEDS = ["ліжко", "ліжка", "ліжок"];
export const GUESTS = ["гість", "гості", "гостей"];
export const ROOMS = ["кімната", "кімнати", "кімнат"];
// після "до": до 1 особи, до 2 осіб, до 5 осіб
export const PERSONS_UPTO = ["особи", "осіб", "осіб"];
export const GUESTS_UPTO = ["гостя", "гостей", "гостей"];

export const withPlural = (number, forms) => `${number} ${plural(number, forms)}`;
