type Data = { [key: number]: number[] };
type xy = { xa: number[]; xb: number[]; xMedio: number[]; yPromedio: number[] };

// Generates random coefficients for a given frequency modulation
export function generateCoefficients(fm: number): Data {
  const coefficients: Data = {};
  for (let y = 1; y <= 7; y++) {
    coefficients[y] = new Array(3)
      .fill(0)
      .map(() => (Math.random() - Math.random()) * fm);
  }
  return coefficients;
}

//genera la tala de datos
export function generateDataTable(coefficients: Data): [Data, number[]] {
  const dataTable: Data = {};
  const sumatoriaY: number[] = new Array(361).fill(0);
  for (let y = 1; y < 8; y++) {
    dataTable[y] = new Array(361).fill(0);
    const [c1, c2, c3] = coefficients[y];
    for (let x = 0; x <= 360; x++) {
      const coeficient = c1 * Math.sin((c2 * x + c3) * (Math.PI / 180));
      dataTable[y][x] = coeficient;
      sumatoriaY[x] += coeficient;
    }
  }
  return [dataTable, sumatoriaY];
}

export const getMaxMin = (sumatoriaY: number[]) => {
  const xMax = 0;
  const xMin = 360;
  const yMax = Math.max(...sumatoriaY);
  const yMin = Math.min(...sumatoriaY);

  return { xMax, xMin, yMax, yMin };
};

//Normalizacion de los datos
// prettier-ignore
export function normalizedXY(sumatoriaY: number[],yMax: number, yMin: number,): { xNormalized: number[]; yNormalized: number[] } {
  const xNormalized = new Array(361).fill(0);
  const yNormalized = new Array(361).fill(0);
  const yRange = yMax - yMin;

  sumatoriaY.forEach((coeficiente, index) => {
    xNormalized[index] = index / 360;
    yNormalized[index] = (coeficiente - yMin) / yRange;
  });

  return { xNormalized, yNormalized };
}

export function xyAverage(
  values: { xNormalized: number[]; yNormalized: number[] },
  divisor: number,
): xy {
  // Calculo de los valores de Xa, Xb
  const xA = new Array(divisor).fill(0);
  const xB = new Array(divisor).fill(0);
  const _xCentro = new Array(divisor).fill(0);
  const _yPromedio = new Array(divisor).fill(0);

  for (let y = 0; y < divisor; y++) {
    const valXA = (xA[y] = y / divisor);
    const valXB = (xB[y] = (y + 1) / divisor);
    //calculo de X centro
    const centroX = (_xCentro[y] = (valXA + valXB) / 2);
    //calculo de Y promedio
    const acumulador = [];
    for (let x = 0; x < values.yNormalized.length; x++) {
      if (values.yNormalized[x] >= centroX && values.yNormalized[x] <= valXB) {
        acumulador.push(values.xNormalized[x]);
      }
    }
    let promedio = 0;
    if (acumulador.length > 0) {
      const suma = acumulador.reduce((a, b) => a + b, 0);
      promedio = suma / acumulador.length;
    }
    _yPromedio[y] = promedio;
  }
  return { xa: xA, xb: xB, xMedio: _xCentro, yPromedio: _yPromedio };
}
