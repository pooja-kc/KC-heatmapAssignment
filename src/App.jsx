import Box from "./Box";
import "./App.css";
import { useEffect, useState } from "react";
import Month from "./Month";
import axios from "axios";

function App() {
  const [startDate, setstartDate] = useState(
    new Date(
      new Date("Sun May 11,2014").setFullYear(
        new Date("Sun May 11,2014").getFullYear() - 1
      )
    )
  );
  const [endDate, setendDate] = useState(new Date("Sun May 11,2014"));
  const [content, setContent] = useState("");
  useEffect(() => {
    console.log("content i got ...", content);
  });

  var getDateArray = function (start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };
  const weekDaysLabel = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var cells = getDateArray(startDate, endDate);

  const content_obj = [
    {
      type: "ADDED",
      date: "2021-01-05",
      holderId: "ABC",
      productId: "g7246017-52w3-4e29-b9d0-30d01485f7bv",
      description:
        "ABC added a new Residential Mortgages product named ABC Product 1",
    },
    {
      type: "ADDED",
      date: "2021-01-05",
      holderId: "ABC",
      productId: "3a86f4e3-2b21-4122-9394-5534g1fc9e78",
      description:
        "ABC added a new Residential Mortgages product named ABC Product 2",
    },
    {
      type: "ADDED",
      date: "2021-01-05",
      holderId: "ABC",
      productId: "37902e9w-xbzc-21g8-s4wb-dbcb953h0222",
      description:
        "ABC added a new Residential Mortgages product named Product 3",
    },
    {
      type: "ADDED",
      date: "2021-01-05",
      holderId: "ABC",
      productId: "3fb9e10c-6560-4471-83bc-c5edf92ebeef",
      description:
        "ABC added a new Residential Mortgages product named ABC Product 4",
    },
    {
      type: "ADDED",
      date: "2021-01-05",
      holderId: "ABC",
      productId: "3ed59e50-572d-4883-ad0a-2282c786506e",
      description:
        "ABC added a new Residential Mortgages product named Product 5",
    },
    {
      type: "ADDED",
      date: "2021-01-05",
      holderId: "ABC",
      productId: "500afd4b-7r54-4m11-s1e7-q030aveonfdc",
      description:
        "ABC added a new Residential Mortgages product named ABC Product 6",
    },
  ];

  const [changes, setChanges] = useState([]);
  useEffect(() => {});

  function myFunction(content) {
    setContent(content);
    changes=content_obj;
      axios
        .get(
          `https://changes.free.beeceptor.com/changes/${content.replaceAll(
            "/",
            "-"
          )}`
        )
        .then((response) => setChanges([...response.data]));

      console.log("changes", changes);
    // setChanges([...content_obj]);
  }

  return (
    <div className="App">
      <center>
        <header className="App-header">
          <center>
            <h1 className="title"> Change Heat Map</h1>
          </center>
          <div className="wrapper">
            <div className="day_label">
              {weekDaysLabel.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            {[...Array(13)].map((e, i) => (
              <Month display={(content) => myFunction(content)} num={12 - i} />
            ))}
          </div>
          <div className="footer">
            <span>less</span>
            <Box visible="visible one" />
            <Box visible="visible two" />
            <Box visible="visible three" />
            <Box visible="visible four" />
            <Box visible="visible five" />
            <span>more</span>
          </div>
        </header>
      </center>
      <center>
        <div className="day_content">
          {content == "" && (
            <h2 className="placeholder">
              Select A Box To view Changes On That Day
            </h2>
          )}
          {typeof changes[0] !== "object" && content !== "" && (
            <h2>No Changes made on {content}</h2>
          )}
          {content !== "" && typeof changes[0] === "object" && (
            <div>
              <h2>
                Showing {changes.length} changes made on {content}
              </h2>
              <div className="content_wrap">
                {changes.map((ele) => (
                  <p>{ele["description"]}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </center>
    </div>
  );
}

export default App;
