import { Alert, Box, Snackbar, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PageComponent from "../../components/PageComponent/PageComponent";
import HistorialClientes from "./HistorialClientes/HistorialClientes";
import HistorialMecanicos from "./HistorialMecanicos/HistorialMecanicos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Historial = () => {
  const [openSnack, setOpenSnack] = useState({
    show: false,
    severity: "",
    message: "",
  });

  const handleCloseSnack = () => {
    setOpenSnack({ show: false, severity: "", message: "" });
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <PageComponent title="Historial" maxWidth="xl">
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Clientes" {...a11yProps(0)} />
            <Tab label="Mecánicos" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <HistorialClientes />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <HistorialMecanicos />
          </TabPanel>
        </Box>

        <Snackbar
          open={openSnack.show}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={openSnack.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {openSnack.message}
          </Alert>
        </Snackbar>
      </PageComponent>
    </>
  );
};

export default Historial;
