import React, { useEffect } from "react";
import "./Box.css";

export default function Box(props) {
  function getDate(yourDate) {
    if (!yourDate) return;
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  }


  return <div className={props.visible}></div>;
}
