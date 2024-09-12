import { Alert, Box, Snackbar, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PageComponent from "../../components/PageComponent/PageComponent";
import HistorialClientes from "./HistorialClientes/HistorialClientes";
import HistorialMecanicos from "./HistorialMecanicos/HistorialMecanicos";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
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
        <Box sx={{ width: '100%' }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
            >
              <Tab label="Clientes" {...a11yProps(0)} />
              <Tab label="Mecánicos" {...a11yProps(1)} />
            </Tabs>
          </Box>
          
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
