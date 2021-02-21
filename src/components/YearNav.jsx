import React, { useState } from "react";

const YearNav = (props) => {
  const [showYearNav, setShowYearNav] = useState(false);
  const { currentYear, setYear } = props;

  const handleYearClick = (e) => {
    setShowYearNav(true);
  };

  return (
    <tr>
      <td colSpan="7">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {showYearNav && (
            <button
              type="button"
              disabled={currentYear <= 0}
              onClick={() => setYear(currentYear - 1)}
            >
              {"<<"}
            </button>
          )}
          <div
            onDoubleClick={handleYearClick}
            style={{ display: "inline", padding: "0 4px", fontWeight: "700" }}
          >
            {currentYear}
          </div>
          {showYearNav && (
            <button
              type="button"
              disabled={currentYear >= 2100}
              onClick={() => setYear(currentYear + 1)}
            >
              {">>"}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default YearNav;
