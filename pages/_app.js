import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "../styles/globals.css";

function App({ Component, pageProps, ...props }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default App;
