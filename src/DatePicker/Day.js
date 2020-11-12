import React from "react";

export default function Day({
  fullDate,
  onClick,
  selected,
  onMouseEnter,
  onMouseLeave,
  hovering,
  today,
  selectedPeriod,
}) {
  if (fullDate == null) {
    return <div className="EmptyStateDay" />;
  }

  let date = fullDate.getDate();
  let month = fullDate.getMonth();
  let year = fullDate.getFullYear();

  let className = "Day";

  if (selectedPeriod) {
    className = "Day Day--selectedPeriod";
  }
  if (selected) {
    className = "Day Day--selected";
  } else if (hovering) {
    className = "Day Day--hovering";
  }
  if (today) {
    className = "Day Day--today";
  }

  return (
    <button
      className={className}
      onClick={onClick.bind(this, date, month, year)}
      onMouseEnter={onMouseEnter.bind(this, date)}
      onMouseLeave={onMouseLeave.bind(this, date)}
    >
      {date}
    </button>
  );
}
