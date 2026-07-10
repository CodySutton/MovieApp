import { useState } from "react";
import "./css/App.css";
import { Header } from "./Header.jsx";
import { Movies } from "./Movies.jsx";

function App() {
  const [category, setCategory] = useState("popular");

  return (
    <>
      <Header active={category} onChange={setCategory} />
      <Movies category={category} />
    </>
  );
}

export default App;
