import { useState } from "react";
import Header from "./components/Header";
import Coach from "./components/Coach";
import AthleteList from "./components/AthleteList";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Coach />
      <AthleteList />
    </div>
  );
}

export default App;
