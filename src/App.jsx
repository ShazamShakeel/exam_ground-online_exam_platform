import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import routes from "routes";
import { persistor, store } from "store/configureStore";
import theme from "styles/muiCustomTheme";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RouterProvider router={routes} />
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
