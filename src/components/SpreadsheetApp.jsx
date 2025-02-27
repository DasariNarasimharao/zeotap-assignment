import React, { useState } from "react";
import "../App.css"; // Make sure this is linked properly

function SpreadsheetApp() {
  // Define a 5x5 grid with empty values
  const [data, setData] = useState(
    Array(5)
      .fill()
      .map(() => Array(5).fill(""))
  );

  // Function to handle cell changes
  const handleChange = (row, col, event) => {
    const newData = [...data];
    newData[row][col] = event.target.value;
    setData(newData);
  };

  return (
    <div className="App">
      <h1>📊 Spreadsheet App</h1>
      <div className="spreadsheet-container">
        <table className="spreadsheet-table">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(event) => handleChange(rowIndex, colIndex, event)}
                      className="spreadsheet-cell"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SpreadsheetApp;
