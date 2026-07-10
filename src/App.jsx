import { useState } from "react";
import "./css/App.css";
import { Header } from "./Header.jsx";
import { Movies } from "./Movies.jsx";
import { Footer } from "./footer.jsx";

function App() {
  const [category, setCategory] = useState("popular");

  return (
    <>
      <Header active={category} onChange={setCategory} />
      <Movies category={category} />
      <Footer />
    </>
  );
}

export default App;
