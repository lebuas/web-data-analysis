/* estudiantes: Leymar Buenaventura, Jose David Peña, Juan Sebastian Beron */
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
  if (idModal === "modal-1" || idModal === "modal-4") {
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
  } else if (
    idModal === "modal-2" ||
    idModal === "modal-3" ||
    idModal === "modal-5"
  ) {
    // --- Tablas de promedios genéricas ---
    const columns = Object.keys(tableData); // detecta nombres de columnas
    const numRows = tableData[columns[0]].length; // asumimos arrays de igual longitud

    for (let i = 0; i < numRows; i++) {
      const tr = document.createElement("tr");

      columns.forEach((col) => {
        const td = document.createElement("td");
        const value = tableData[col][i];

        // Si es número, formateamos; si no, solo texto
        td.textContent =
          typeof value === "number" ? value.toFixed(4) : String(value);

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

  dialog.scrollTop = 0;

  return dialog;
}
