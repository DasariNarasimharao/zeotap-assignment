import React, { useState } from "react";
import { DataGrid } from "react-data-grid";
import Papa from "papaparse";
import * as math from "mathjs";
import "react-data-grid/lib/styles.css";

const Spreadsheet = () => {
  const [rows, setRows] = useState([
    { id: 0, col1: "5", col2: "10", col3: "=col1+col2" },
    { id: 1, col1: "3", col2: "7", col3: "=col1*col2" }
  ]);

  const columns = [
    { key: "col1", name: "Column 1", editable: true },
    { key: "col2", name: "Column 2", editable: true },
    { key: "col3", name: "Formula", editable: true }
  ];

  const evaluateFormula = (row) => {
    const formula = row.col3;
    if (formula.startsWith("=")) {
      try {
        return math.evaluate(formula.slice(1), row);
      } catch (error) {
        return "ERROR";
      }
    }
    return formula;
  };

  const onRowsChange = (newRows) => {
    setRows(newRows.map(row => ({ ...row, col3: evaluateFormula(row) })));
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setRows(result.data);
      }
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spreadsheet.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Spreadsheet Component</h2>
      <div className="flex gap-2 mb-4">
        <input type="file" accept=".csv" onChange={handleImport} className="border p-2" />
        <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded">
          Export CSV
        </button>
      </div>
      <DataGrid
        className="border rounded"
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
      />
    </div>
  );
};

export default Spreadsheet;
