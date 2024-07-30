import { Replay } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CustomizedDataGrid from "../../../components/CustomizedDataGrid/CustomizedDataGrid";
import PageComponent from "../../../components/PageComponent/PageComponent";
import ExportarHistorial from "./ExportarHistorial";

const HistorialMecanicos = () => {
  console.log("first")
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const columns = [
    { field: "producto_nombre", headerName: "Nombre", width: 300 },
    {
      field: "proveedor_nombre",
      headerName: "Proveedor",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "total",
      headerName: "Precio Total",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "metodo_pago",
      headerName: "Método Pago",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "",
      headerName: "Acciones",
      type: "actions",
      headerAlign: "center",
      align: "center",
      width: 100,
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

  const [rows, setRows] = useState([]);

  const getHistorial = useCallback(async () => {
    await Axios.get(baseUrl + "historial/mecanicos").then(({ data }) => {
      setRows(data);
    });
  }, [baseUrl]);

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

  const returnSaleCliente = (id) => {
    console.log(id)
  };

  return (
    <>
      <PageComponent
        maxWidth="xl"
        sx={{ p: -8 }}
        title="Mecánicos"
        buttons={
          <>
            <ExportarHistorial productos={rows} />
          </>
        }
      >
        <CustomizedDataGrid columns={columns} rows={rows} />

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

export default HistorialMecanicos;
