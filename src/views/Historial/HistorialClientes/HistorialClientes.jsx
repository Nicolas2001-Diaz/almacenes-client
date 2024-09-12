import { Replay } from "@mui/icons-material";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CustomizedDataGrid from "../../../components/CustomizedDataGrid/CustomizedDataGrid";
import PageComponent from "../../../components/PageComponent/PageComponent";
import ExportarHistorial from "./ExportarHistorial";

const HistorialClientes = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const columns = [
    { field: "producto_nombre", headerName: "Nombre", width: 300 },
    {
      field: "proveedor_nombre",
      headerName: "Proveedor",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "total",
      headerName: "Precio Total",
      headerAlign: "center",
      align: "center",
      width: 130,
    },
    {
      field: "metodo_pago",
      headerName: "Método Pago",
      headerAlign: "center",
      align: "center",
      width: 130,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      headerAlign: "center",
      align: "center",
      width: 130,
    },
    {
      field: "",
      headerName: "Acciones",
      type: "actions",
      headerAlign: "center",
      align: "center",
      width: 130,
      sortable: false,
      filterable: false,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<Replay />}
          color="info"
          label="Return"
          onClick={() => returnSaleCliente(params.row.id)}
        />,
      ],
    },
  ];

  const [desde, setDesde] = useState(null)
  const [hasta, setHasta] = useState(null)

  const [rows, setRows] = useState([]);

  const getHistorial = useCallback(async () => {
    const params = {};

    if (desde) {
      params.desde = desde.format('YYYY-MM-DD');
    }
    if (hasta) {
      params.hasta = hasta.format('YYYY-MM-DD');
    }

    await Axios.get(baseUrl + "historial/clientes", { params }).then(({ data }) => {
      setRows(data);
    });
  }, [baseUrl, desde, hasta]);

  useEffect(() => {
    getHistorial();
  }, [getHistorial]);

  const [openSnack, setOpenSnack] = useState({
    show: false,
    severity: "",
    message: "",
  });

  const handleCloseSnack = () => {
    setOpenSnack({ show: false, severity: "", message: "" });
  };

  const returnSaleCliente = async (id) => {
    await Axios.delete(`${baseUrl}historial/${id}`)
      .then(() => {
        getHistorial();

        setOpenSnack({
          show: true,
          severity: "success",
          message: "Venta eliminada correctamente",
        });
      })
      .catch(() => {
        setOpenSnack({
          show: true,
          severity: "error",
          message: "No se pudo eliminar la venta",
        });
      });
  };

  return (
    <>
      <PageComponent
        maxWidth="xl"
        sx={{ py: -8, ml: -6 }}
        title="Clientes"
        buttons={
          <>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Desde:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    slotProps={{ textField: { size: 'small' } }}
                    value={desde}
                    onChange={(newValue) => {
                      setDesde(newValue);
                      getHistorial();
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Hasta:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    slotProps={{ textField: { size: 'small' } }}
                    value={hasta}
                    onChange={(newValue) => {
                      setHasta(newValue);
                      getHistorial();
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <ExportarHistorial productos={rows} />
          </>
        }
      >
        <CustomizedDataGrid columns={columns} rows={rows} sx={{ mt: 2 }} />

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

export default HistorialClientes;
