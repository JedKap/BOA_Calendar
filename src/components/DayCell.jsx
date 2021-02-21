import React from "react";

const DayCell = (props) => {
  const { dateObj, selected, onDayClick } = props;

  return dateObj.day === 0 ? (
    <td className="tdCell blankCell"> </td>
  ) : (
    <td className={selected ? "tdCell selectedCell" : "tdCell standardCell"}>
      <div onClick={() => onDayClick(dateObj)} className="cellWrapper">
        <div className="cellTitle">{dateObj.day}</div>
        <div className="cellNote">{dateObj.note.length > 0 && "*"}</div>
      </div>
    </td>
  );
};

export default DayCell;
