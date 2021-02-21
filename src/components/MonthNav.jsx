import React, { useState } from "react";
import moment from "moment"; // really don't need this

const MonthNav = ({ currentMonth, setMonth }) => {
  const [showMonths, setShowMonths] = useState(false);
  const monthNames = moment.months();

  const monthDown = () => {
    setMonth(currentMonth - 1);
  };

  const monthUp = () => {
    setMonth(currentMonth + 1);
  };

  const setMonthDirect = (index) => {
    setMonth(index);
  };

  const toggleShowMonths = () => {
    setShowMonths(!showMonths);
  };

  const showMonthsDropdown = () => {
    const st = {
      height: 0,
      display: "flex",
      justifyContent: "center",
    };
    const st2 = {
      height: "30px",
      display: "flex",
      justifyContent: "center",
    };

    return (
      <tr>
        <td colSpan="7">
          <div style={!showMonths ? st : st2}>
            {monthNames.map((m, i) => {
              return (
                showMonths && (
                  <div
                    key={m}
                    value={i}
                    onClick={() => setMonthDirect(i)}
                    style={{ display: "inline", padding: "3px" }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        textDecoration: "underline",
                      }}
                    >
                      {m}
                    </span>
                  </div>
                )
              );
            })}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <tr>
        <td colSpan="7" style={{ background: "aliceblue" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" onClick={monthDown}>
              {"<<"}
            </button>
            <div
              style={{ display: "inline", padding: "0 10px" }}
              onClick={toggleShowMonths}
            >
              {monthNames[+currentMonth]}
            </div>
            <button type="button" onClick={monthUp}>
              {">>"}
            </button>
          </div>
        </td>
      </tr>
      {showMonthsDropdown()}
    </>
  );
};

export default MonthNav;
