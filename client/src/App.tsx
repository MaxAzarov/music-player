import React from "react";

import Music from "./Music/Music";
import "./App.scss";

const App = () => {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(` + require("./image1.png").default + `)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
      }}
    >
      <Music />
    </div>
  );
};

export default App;
