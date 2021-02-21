import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Note from "./components/Note";
import moment from "moment"; // really don't need this

function App() {
  // DD-MM-YYYY
  const buildDateString = (dt) => {
    return `${dt.getDate().toString().padStart(2, "0")}-${(dt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dt.getFullYear()} `;
  };

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(buildDateString(today));
  const [days, setDays] = useState([]);
  const [currMonth, setCurrMonth] = useState(today.getMonth());
  const [currYear, setCurrYear] = useState(today.getFullYear());
  const [selectedNode, setSelectedNode] = useState(null);
  const [showNote, setShowNote] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);

  const getNode = (node) => savedNotes.find((x) => x.date - node.date === 0);

  const addNote = (node) => {
    if (!getNode(node)) {
      const newNotes = [...savedNotes]; // make a copy
      newNotes.push({
        note: node.note,
        date: node.date,
      });
      setSavedNotes(newNotes);
    }
  };

  const onNoteInputChange = (node, value) => {
    node.note = value;
    addNote(node);
  };

  const onDayClick = (val) => {
    setSelectedDay(buildDateString(val.date));
    setSelectedNode(val);
    setShowNote(true);
  };

  const onMonthChange = (mm) => {
    let m = currMonth;
    let y = currYear;
    if (mm < 0) {
      m = 11;
      y = y - 1;
    } else if (mm > 11) {
      m = 0;
      y = y + 1;
    } else {
      m = mm;
    }
    setCurrYear(y);
    setCurrMonth(m);
    setSelectedNode(null);
  };

  const onYearChange = (yy) => {
    setCurrYear(yy);
    setSelectedNode(null);
  };

  const handleHideNote = () => {
    setShowNote(false);
  };

  const attachNote = (dt) => {
    const nt = savedNotes.find((n) => n.date - dt === 0);
    return nt ? nt.note : "";
  };

  useEffect(() => {
    const y = currYear;
    const m = currMonth;

    const daysInMonth = (month) => {
      const dt = new Date(y, m + 1, 0).getDate();
      return dt;
    };

    const getFirstDayOfMonth = () => {
      return Number(moment(new Date(y, m, 1)).startOf("month").format("d"));
    };

    const dim = daysInMonth();
    const nd = getFirstDayOfMonth();

    const arr1 = new Array(nd).fill({
      day: 0,
    });
    const arr2 = [...new Array(dim).keys()].map((j) => {
      const dt = new Date(y, m, j + 1);
      return {
        day: j + 1,
        note: attachNote(dt),
        date: dt,
      };
    });
    setDays([...arr1, ...arr2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, currMonth, currYear, savedNotes]);

  return (
    <div className="App-header">
      {days && days.length > 0 && (
        <Calendar
          selectedDay={selectedDay}
          onDayClick={onDayClick}
          days={days}
          currMonth={currMonth}
          currYear={currYear}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
        />
      )}
      {selectedNode && (
        <Note
          showNote={showNote}
          onNoteInputChange={onNoteInputChange}
          selectedNode={selectedNode}
          hideNote={handleHideNote}
        />
      )}
      <div style={{ fontSize: "10px" }}>Days with asterisks contain notes</div>
    </div>
  );
}

export default App;
