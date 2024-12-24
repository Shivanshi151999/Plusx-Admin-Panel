import React from "react";
import Router from "./routes/Router";
import MQTT from './utils/mqtt'

function App() {
  return (
    <>
    <MQTT/>
      <Router />
    </>
  );
}

export default App;
