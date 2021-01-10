// import { gql, useQuery } from "@apollo/client";
// import { useEffect } from "react";
import React from "react";

import "./App.scss";
import Music from "./Music/Music";

const App = () => {
  // useEffect(() => {}, []);

  // const query = gql`
  //   query {
  //     hello
  //   }
  // `;

  // const { data } = useQuery(query);

  // console.log(data);
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(` + require("./image1.png").default + `)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Music />
    </div>
  );
};

export default App;
