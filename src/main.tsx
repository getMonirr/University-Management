import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "./index.css";
import { persistor, reduxStore } from "./redux/store.ts";
import { mainRouter } from "./routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={mainRouter} />
      </PersistGate>
      <Toaster/>
    </Provider>
  </React.StrictMode>
);
