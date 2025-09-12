/* estudiantes: Leymar Buenaventura, Jose David Peña, Juan Sebastian Beron */
export type Data = { [key: number]: number[] };
type xy = {
  xa: number[];
  xb: number[];
  xMidpoint: number[];
  yAverage: number[];
};

// Genera coeficientes aleatorios para una modulación de frecuencia dada
export function generateCoefficients(fm: number): Data {
  const coefficients: Data = {};
  for (let y = 1; y <= 7; y++) {
    coefficients[y] = new Array(3)
      .fill(0)
      .map(() => (Math.random() - Math.random()) * fm);
  }
  return coefficients;
}

// prettier-ignore
// genera la tabla de datos
export function generateDataTable(coefficients: Data): { dataTable: Data, sumY: number[] } {
  const dataTable: Data = {};
  const sumY: number[] = new Array(361).fill(0);
  for (let y = 1; y < 8; y++) {
    dataTable[y] = new Array(361).fill(0);
    const [c1, c2, c3] = coefficients[y];
    for (let x = 0; x <= 360; x++) {
      const coefficient = c1 * Math.sin((c2 * x + c3) * (Math.PI / 180));
      dataTable[y][x] = coefficient;
      sumY[x] += coefficient;
    }
  }
  return { dataTable, sumY };
}

export const getMaxMin = (sumY: number[]) => {
  const xMax = 0;
  const xMin = 360;
  const yMax = Math.max(...sumY);
  const yMin = Math.min(...sumY);

  return { xMax, xMin, yMax, yMin };
};

// Normalización de los datos
// prettier-ignore
export function normalizedXY(sumY: number[], yMax: number, yMin: number,): { xNormalized: number[]; yNormalized: number[] } {
  const xNormalized = new Array(361).fill(0);
  const yNormalized = new Array(361).fill(0);
  const yRange = yMax - yMin;

  sumY.forEach((coefficient, index) => {
    xNormalized[index] = index / 360;
    yNormalized[index] = (coefficient - yMin) / yRange;
  });

  return { xNormalized, yNormalized };
}

// cálculo de los valores promedio de X y Y
export function xyAverage(
  values: { xNormalized: number[]; yNormalized: number[] },
  divisor: number,
): xy {
  // Cálculo de los valores de Xa, Xb
  const xA = new Array(divisor).fill(0);
  const xB = new Array(divisor).fill(0);
  const xMidpoint = new Array(divisor).fill(0);
  const yAverage = new Array(divisor).fill(0);

  for (let y = 0; y < divisor; y++) {
    const valXA = (xA[y] = y / divisor);
    const valXB = (xB[y] = (y + 1) / divisor);
    // cálculo de X medio
    const midpointX = (xMidpoint[y] = (valXA + valXB) / 2);
    // cálculo del promedio de Y
    const accumulator = [];
    for (let x = 0; x < values.yNormalized.length; x++) {
      if (
        values.yNormalized[x] >= midpointX &&
        values.yNormalized[x] <= valXB
      ) {
        accumulator.push(values.xNormalized[x]);
      }
    }
    let average = 0;
    if (accumulator.length > 0) {
      const sum = accumulator.reduce((a, b) => a + b, 0);
      average = sum / accumulator.length;
    }
    yAverage[y] = average;
  }
  return { xa: xA, xb: xB, xMidpoint: xMidpoint, yAverage: yAverage };
}