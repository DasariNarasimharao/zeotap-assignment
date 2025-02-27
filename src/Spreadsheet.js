import React, { useState } from "react";
import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";

const Spreadsheet = () => {
  const [rows, setRows] = useState([
    { id: 0, col1: "A1", col2: "B1" },
    { id: 1, col1: "A2", col2: "B2" }
  ]);

  const columns = [
    { key: "col1", name: "Column 1", editable: true },
    { key: "col2", name: "Column 2", editable: true },
    {
      key: "actions",
      name: "Actions",
      renderCell: ({ row }) => (
        <button onClick={() => deleteRow(row.id)}>Delete</button>
      )
    }
  ];

  const addRow = () => {
    const newRow = { id: rows.length, col1: "", col2: "" };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const saveAsCSV = () => {
    const csvContent = [
      ["Column 1", "Column 2"],
      ...rows.map(row => [row.col1, row.col2])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spreadsheet.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: "100%" }}>
      <h1>Google Sheets Clone</h1>
      <h2>Spreadsheet Component</h2>
      <DataGrid columns={columns} rows={rows} />
      <button onClick={addRow}>Add Row</button>
      <button onClick={saveAsCSV}>Save as CSV</button>
    </div>
  );
};

export default Spreadsheet;
