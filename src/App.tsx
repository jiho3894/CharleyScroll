import { Global } from "@emotion/react";
import Home from "./pages";
import global from "./styles/global";

function App() {
  return (
    <>
      <Global styles={global} />
      <Home />
    </>
  );
}

export default App;
