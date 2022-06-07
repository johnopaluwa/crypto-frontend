import { sortBy } from "lodash";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    fetch("https://hedge-crypto-backend.herokuapp.com/crypto")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        const sortedData = data.map((mm) => ({
          ...mm,
          value: sortBy(mm.value, [
            function (o) {
              return o.url;
            },
          ]),
        }));

        setData(sortedData);
      });
  }, []);

  console.warn(data);

  return (
    <div style={{ marginLeft: 20 }}>
      {data.map((s, _i) => {
        return (
          <div>
            <details>
              <summary>
                <h3 style={{ color: "blue" }}> {s.name}</h3>
              </summary>
              <div style={{ marginLeft: 50 }}>
                {s.value.map((m) => {
                  return (
                    <p>
                      <a
                        target="_blank"
                        style={m.url ? { color: "green" } : { color: "red" }}
                        href={m.url}
                        rel="noreferrer"
                      >
                        {m.name}
                      </a>
                    </p>
                  );
                })}
              </div>
            </details>
          </div>
        );
      })}
    </div>
  );
}

export default App;
