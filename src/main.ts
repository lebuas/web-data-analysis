import "./style.css";
import { createChart } from "./charts";
import * as getData from "./get-data";

// Envuelve la lógica en el evento 'DOMContentLoaded' para asegurar que el HTML está listo
document.addEventListener("DOMContentLoaded", () => {
  const myInput = document.getElementById("data-input") as HTMLInputElement;

  if (myInput) {
    // Llama a la función principal al inicio con el valor por defecto del input.
    const initialFm = parseFloat(myInput.value);
    // Usa un valor por defecto si el input está vacío o es un número inválido.
    main(isNaN(initialFm) ? 1.0 : initialFm);

    myInput.addEventListener("input", () => {
      const fm = parseFloat(myInput.value);
      main(fm);
    });
  } else {
    console.error("El elemento con el ID 'coefficient' no fue encontrado.");
  }
});

function main(fm: number) {
  const coefficient = getData.generateCoefficients(fm);
  const [dataTable, ySumatoria] = getData.generateDataTable(coefficient);
  const valuesMaxMin = getData.getMaxMin(ySumatoria);
  const valuesXYNormalized = getData.normalizedXY(
    ySumatoria,
    valuesMaxMin.yMax,
    valuesMaxMin.yMin,
  );

  dataGraphNormalized(valuesXYNormalized);
}

// prettier-ignore
export const dataGraphNormalized = (param: {xNormalized: number[], yNormalized: number[]}) => {
  createChart("y-normalized", [
    {
      label: " Y Normalizado",
      xValues: param.xNormalized,
      yValues: param.yNormalized,
      borderColor: "blue",
    },
  ]);
};
