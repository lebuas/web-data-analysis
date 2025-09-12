export function showModal(idModal: string, tableData: any): HTMLDialogElement {
  const dialog = document.getElementById(idModal) as HTMLDialogElement;

  // Encontrar el <table> dentro del modal
  const table = dialog.querySelector("table") as HTMLTableElement;
  let tbody = table.querySelector("tbody") as HTMLTableSectionElement;
  // Limpiar body anterior
  if (tbody) {
    tbody.remove();
  }
  tbody = document.createElement("tbody");

  // Detectamos tipo de datos
  if (idModal === "modal-1") {
    // --- Tabla de dataTable ---
    // tableData = { [y: number]: number[] }
    const numCols = Object.keys(tableData).length; // debería ser 7
    const numRows = tableData[1].length; // 361

    for (let x = 0; x < numRows; x++) {
      const tr = document.createElement("tr");
      // Columna X
      const tdX = document.createElement("td");
      tdX.textContent = String(x);
      tr.appendChild(tdX);
      // Columnas Y1..Yn
      for (let y = 1; y <= numCols; y++) {
        const td = document.createElement("td");
        td.textContent = tableData[y][x].toFixed(4);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  } else if (idModal === "modal-2" || idModal === "modal-3") {
    // --- Tablas de promedios ---
    // tableData = { xa: number[], xb: number[], xMidpoint: number[], yAverage: number[] }

    for (let i = 0; i < tableData.xa.length; i++) {
      const tr = document.createElement("tr");
      // columnas en orden
      [
        tableData.xa[i],
        tableData.xb[i],
        tableData.xMidpoint[i],
        tableData.yAverage[i],
      ].forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value.toFixed(4);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
  }
  table.appendChild(tbody);

  // Mostrar modal
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.show();
  }

  return dialog;
}

