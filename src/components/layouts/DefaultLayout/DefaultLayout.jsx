import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../Appbar/Appbar";

import { esES as coreEsES } from "@mui/material/locale";
import { esES } from "@mui/x-data-grid/locales";

const theme = createTheme(
  esES, // x-data-grid translations
  coreEsES // core translations
);

const DefaultLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <ResponsiveAppBar />

        <Box
          component="main"
          sx={{
            backgroundColor: "background.default",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DefaultLayout;
