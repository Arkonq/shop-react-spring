import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/App.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store/store.ts";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // react-router
  <BrowserRouter>
    {/* redux */}
    <Provider store={store}>
      {/* redux-persist */}
      <PersistGate loading={null} persistor={persistor}>
        {/* mui-theme */}
        <ThemeProvider theme={theme}>
          {/* notistack - notifications */}
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
