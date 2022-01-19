import React, { useState, useMemo } from "react";
import Box from "./Box";
import "./Month.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";


const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Month(props) {
  var date = new Date("2021-01-08T09:59:59.000Z");
  date.setDate(1);
  date.setMonth(date.getMonth() - props.num);

  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  var firstWeekDay = Array.from(
    new Array(new Date(date.getFullYear(), date.getMonth(), 1).getDay())
  );
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var getDateArray = function (start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };
  const Data = {
    startDate: "2020-01-08T10:00:00.000Z",
    endDate: "2021-01-08T09:59:59.000Z",
    counts: {
      "2021-01-05": 6,
      "2020-12-24": 11,
      "2020-05-14": 15,
      "2020-11-26": 8,
      "2020-12-14": 5,
      "2020-12-01": 6,
      "2021-01-07": 6,
    },
  };
 

  //repeat
  function getDate(yourDate) {
    if (!yourDate) return;
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  }

  var cells = getDateArray(firstDay, lastDay);
  const isJan = firstDay.getMonth() === 0 ? 1 : 0;
  function getDensity(cell) {
    cell = getDate(cell);
    if (typeof(Data.counts[cell])=== "undefined") return "one";
    if (Data.counts[cell] < 5) return "two";
    if (Data.counts[cell] < 10) return "three";
    if (Data.counts[cell] < 15) return "four";
    return "five";
  }

  return (
    <div className="month-wrapper">
      <span className="year_title">
        <h4 className={!isJan && "hide"}>{firstDay.getFullYear()}</h4>
      </span>
      <span className="month_title">
        <p>{monthNames[firstDay.getMonth()].substring(0, 3)}</p>
      </span>

      <div className="month-container">
        {firstWeekDay.map((cell, index) => (
          <div key={index}>
            {" "}
            <Box visible="hidden" />
          </div>
        ))}
        {cells.map(
          (cell, index) =>
            cell <= new Date("2021-01-08T09:59:59.000Z") && (
              <Tippy key={index} content={cell.toLocaleDateString()}>
                <div onClick={() => props.display(cell.toLocaleDateString())}>
                  <Box date={cell} visible={"visible " + getDensity(cell)} />
                </div>
              </Tippy>
            )
        )}
      </div>
    </div>
  );
}

export default Month;
