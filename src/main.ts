/* estudiantes: Leymar Buenaventura, Jose David Peña, Juan Sebastian Beron */
import "../src/style.css";
import { createChart, type ChartDataset } from "./charts";
import * as getData from "./get-data";
import { showModal } from "./modals";

let currentDialog: HTMLDialogElement;
interface DataTables {
  ValoresXY: getData.Data;
  Rango1: Object;
  Rango2: Object;
  Coeficientes: Object;
  Normalizados: Object;
}
const currenTable: DataTables = {
  ValoresXY: [],
  Rango1: [],
  Rango2: [],
  Coeficientes: [],
  Normalizados: [],
};

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
  const dividor1 = 10;
  const divisor2 = 20;
  const idNormalized: string = "y-normalized";
  const idAverage1: string = "y-average1";
  const idaVerage2: string = "y-average2";
  const idAllGraph: string = "chart-4";

  // Obtener datos
  const coefficient = getData.generateCoefficients(fm);
  const { dataTable, sumY } = getData.generateDataTable(coefficient);
  const valuesMaxMin = getData.getMaxMin(sumY);
  const valuesXYNormalized = getData.normalizedXY(
    sumY,
    valuesMaxMin.yMax,
    valuesMaxMin.yMin,
  );
  const dataAvarages = getData.xyAverage(valuesXYNormalized, dividor1);
  const dataAvarages2 = getData.xyAverage(valuesXYNormalized, divisor2);

  // Guardar los datos en renderizado de tablas
  currenTable.ValoresXY = dataTable;
  currenTable.Rango1 = dataAvarages;
  currenTable.Rango2 = dataAvarages2;
  currenTable.Coeficientes = coefficient;
  currenTable.Normalizados = valuesXYNormalized;

  const dataNormalized: ChartDataset = {
    label: "Y Normalizado",
    xValues: valuesXYNormalized.xNormalized,
    yValues: valuesXYNormalized.yNormalized,
    borderColor: "black",
  };

  const dataAverage1: ChartDataset = {
    label: "Rango 0.1",
    xValues: dataAvarages.xa,
    yValues: dataAvarages.yAverage,
    borderColor: "red",
  };

  const dataAverage2: ChartDataset = {
    label: "Rango 0.05",
    xValues: dataAvarages2.xa,
    yValues: dataAvarages2.yAverage,
    borderColor: "green",
  };

  //Crar las graficas
  createChart(idNormalized, [dataNormalized]);
  createChart(idAverage1, [dataAverage1]);
  createChart(idaVerage2, [dataAverage2]);
  createChart(idAllGraph, [dataNormalized, dataAverage1, dataAverage2]);
}

//id de las tablas
const dataTable = {
  ValoresXY: "modal-1",
  Rango1: "modal-2",
  Rango2: "modal-3",
  Coeficientes: "modal-4",
  Normalizados: "modal-5",
};

//Lamada de los modales
const buttonsOpoen = document.querySelectorAll(
  ".btn-modal",
) as NodeListOf<HTMLButtonElement>;
type CurrenTable = keyof typeof currenTable;
buttonsOpoen.forEach((btn) => {
  btn.addEventListener("click", () => {
    const nameBotton = btn.lastChild?.nodeValue?.split(" ").join("");
    if (nameBotton && dataTable.hasOwnProperty(nameBotton)) {
      const modalId = dataTable[nameBotton as keyof typeof dataTable];
      const tablekey = nameBotton as CurrenTable;
      currentDialog = showModal(modalId, currenTable[tablekey]);
    }
  });
});

const closeBtn = document.querySelectorAll(
  ".close-modal-btn",
) as NodeListOf<HTMLButtonElement>;
closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentDialog.close();
  });
});

const modals = document.querySelectorAll(
  ".modal",
) as NodeListOf<HTMLDialogElement>;
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
