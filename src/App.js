import React, { Suspense, lazy } from "react";
import "./App.css";
let Body = lazy(() => import("./components/Body"));
let Header = lazy(() => import("./components/Header"));
function App() {
  return (
    <div className="App p-2">
      <Suspense fallback={"Loading..."}>
        <Header />
        <Body />
      </Suspense>
    </div>
  );
}

export default App;
