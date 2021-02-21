import React from "react";
import moment from "moment"; // really don't need this
import DayCell from "./DayCell";
import MonthNav from "./MonthNav";
import YearNav from "./YearNav";

const Calendar = (props) => {
  const {
    selectedDay,
    onDayClick,
    currYear,
    currMonth,
    onYearChange,
    onMonthChange,
    days,
  } = props;

  const weekdaysShort = moment.weekdaysShort();
  const selectedDateToDate = () => {
    const pts = selectedDay.split("-");
    const y = pts[2];
    const m = pts[1] - 1;
    const dy = pts[0];
    return new Date(y, m, dy);
  };

  const buildDays = () => {
    const spliceUp = (arr) => {
      const chunks = [];
      while (arr.length) {
        chunks.push(arr.splice(0, 7));
      }
      return chunks;
    };

    const chunks = spliceUp([...days]); // use a copy

    return chunks.map((w, i) => (
      <tr key={i}>
        {w.map((dt, j) => {
          const date = selectedDateToDate();
          return (
            <DayCell
              onDayClick={onDayClick}
              key={j * 1000}
              dateObj={dt}
              selected={date - dt.date === 0}
            />
          );
        })}
      </tr>
    ));
  };

  const showDaysOfWeekRow = () => {
    return weekdaysShort && weekdaysShort.length > 0 ? (
      weekdaysShort.map((d) => (
        <td key={d} className="weekDay">
          {d}
        </td>
      ))
    ) : (
      <div>Loading...</div>
    );
  };

  return (
    <div style={{ border: "solid 1px lightgray" }}>
      <table>
        <thead>
          <YearNav currentYear={Number(currYear)} setYear={onYearChange} />
          <MonthNav currentMonth={currMonth} setMonth={onMonthChange} />
          <tr>{showDaysOfWeekRow()}</tr>
        </thead>
        <tbody>{buildDays()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;

// App component
// ·         Pass the note string and the onNoteInputChange handler as a prop to the Note component.
// ·         Pass the onDayClick handler and the selectedDay state property, which holds a string in the DD-MM-YYYY format of the currently selected date, to Calendar component.

// ·         Implement the onDayClick handler in the App that will change the note property to the notes value if it exists for the selected date, otherwise it will show an empty string. Also, this handler should change the selectedDate to the date that has been clicked.

// ·         Implement the onNoteInputChange in the App component to change the note state property and change the notes property to contain the note value and set the current date string as a key for it, so every day can have its note stored and shown when selected.

// Note component

// ·         Set the note prop as a display value in the text area inside the Note component and invoke the parent prop in the onNoteInputChange handler that has the same name.

// Calendar component

// ·         Pass down the onDayClick handler as a prop to the Calendar and invoke it inside onDayClick from the Calendar component.

// ·         Return a list of month names using the moment.js in the daysInMonth function inside the Calendar component.

// ·         Implement handlers onYearChange and onMonthChange that receive the year number and the month name respectively, and change the current dateContext of the Calendar component, thus rendering days for currently selected date.

// ·         Pass the dateContext and appropriate change event handlers to MonthNav and YearNav components.

// MonthNav component

// ·         Implement the onToggleDropdown method inside the MonthNav component that toggles the showMonthPopup state property every time the user clicks on the month label.

// ·         Implement the month method in the MonthNav component that will display the currently selected month inside.

// YearNav component

// ·         Call the appropriate handler passed as a prop inside the onYearChange handler.

// ·         Implement the showYearEditor method that will change the showYearNav to true when the user double clicks on the year label.

// ·         Implement the year method that returns the currently selected year.

// Input Handling

// ·         Input year should be a valid number between 0 and 2100.
