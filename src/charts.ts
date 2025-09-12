/* estudiantes: Leymar Buenaventura, Jose David Peña, Juan Sebastian Beron */
import {
  Chart,
  registerables,
  type ChartData,
  type ChartOptions,
} from "chart.js";

Chart.register(...registerables);

export interface ChartDataset {
  label: string;
  xValues: number[];
  yValues: number[];
  borderColor: string;
}

// Objeto para almacenar las instancias de las gráficas
const createdCharts: { [key: string]: Chart } = {};

export function createChart(chartId: string, datasets: ChartDataset[]) {
  // Obtiene la instancia de la gráfica si ya existe
  const existingChart = createdCharts[chartId];
  if (existingChart) {
    existingChart.destroy();
  }

  const ctx = document.getElementById(chartId) as HTMLCanvasElement;
  if (!ctx) {
    console.error(`El elemento con ID "${chartId}" no fue encontrado.`);
    return;
  }

  const chartDatasets = datasets.map((dataset) => {
    const dataPoints = dataset.xValues.map((x, index) => ({
      x: x,
      y: dataset.yValues[index],
    }));

    return {
      label: dataset.label,
      data: dataPoints,
      borderColor: dataset.borderColor,
      backgroundColor: dataset.borderColor,
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 0,
    };
  });

  const data: ChartData<"line"> = {
    datasets: chartDatasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 4,
    scales: {
      x: {
        type: "linear",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const myChart = new Chart(ctx, { type: "line", data, options });
  createdCharts[chartId] = myChart;
}