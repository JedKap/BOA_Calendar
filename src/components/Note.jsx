import React, { useState, useRef, useEffect } from "react";
import "./Note.css";

const Note = ({ selectedNode, showNote, hideNote, onNoteInputChange }) => {
  const [textValue, setTextValue] = useState(selectedNode.note);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
    setTextValue(selectedNode.note);
  }, [selectedNode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNoteInputChange(selectedNode, textValue);
    hideNote();
  };

  const handleChange = (val) => {
    setTextValue(() => val);
  };

  return (
    selectedNode && (
      <div
        className={
          showNote ? "note-modal display-block" : "note-modal display-none"
        }
      >
        <div className="note-modal-main" OnBlur={hideNote}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <span style={{ fontSize: "12px", padding: "2px" }}>Note:</span>
                <textarea
                  style={{ width: "97%", margin: "3px" }}
                  ref={inputRef}
                  type="text"
                  value={textValue}
                  placeHolder="Enter Note"
                  onChange={(e) => handleChange(e.target.value)}
                />
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <input type="submit" value="OK" />
                <button
                  className="modalButton"
                  type="button"
                  onClick={hideNote}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Note;
