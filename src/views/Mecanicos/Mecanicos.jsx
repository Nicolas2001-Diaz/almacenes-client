import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Controls";
import CustomizedDataGrid from "../../components/CustomizedDataGrid/CustomizedDataGrid";
import Modal from "../../components/Dialog/Dialog";
import PageComponent from "../../components/PageComponent/PageComponent";
import MecanicosForm from "./MecanicosForm";
import { Alert, Snackbar } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Axios from "axios";

const Mecanicos = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 500 },
    {
      field: "documento",
      headerName: "Documento",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "edad",
      headerName: "Edad",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "descuento",
      headerName: "Descuento",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "",
      headerName: "Acciones",
      type: "actions",
      headerAlign: "center",
      align: "center",
      width: 290,
      sortable: false,
      filterable: false,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<Edit />}
          color="info"
          label="Delete"
          onClick={() => openInModal(params.row)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<Delete />}
          color="error"
          label="Delete"
          onClick={() => deleteMecanico(params.id)}
        />,
      ],
    },
  ];

  const [rows, setRows] = useState([]);

  const getMecanicos = useCallback(async () => {
    await Axios.get(baseUrl + "mecanicos").then(
      ({ data }) => {
        setRows(data);
      }
    );
  }, [baseUrl]);

  useEffect(() => {
    getMecanicos();
  }, [getMecanicos]);

  const [openModal, setOpenModal] = useState(false);

  const [openSnack, setOpenSnack] = useState({
    show: false,
    severity: "",
    message: "",
  });

  const [recordForEdit, setRecordForEdit] = useState(null);

  const handleCloseSnack = () => {
    setOpenSnack({ show: false, severity: "", message: "" });
  };

  const addOrEdit = async (mecanico, resetForm) => {
    if (recordForEdit === null && mecanico.id === 0) {
      await Axios.post(baseUrl + "mecanicos", {
        nombre: mecanico.nombre,
        documento: mecanico.documento,
        edad: mecanico.edad,
        descuento: mecanico.descuento
      })
        .then(() => {
          getMecanicos();

          resetForm();
          setRecordForEdit(null);
          setOpenModal(false);

          setOpenSnack({
            show: true,
            severity: "success",
            message: "Mecánico guardado correctamente",
          });
        })
        .catch(() => {
          setOpenSnack({
            show: true,
            severity: "error",
            message: "No se pudo ingresar el mecánico",
          });
        });
    } else if (recordForEdit !== null && mecanico.id !== 0) {
      await Axios.put(baseUrl + "mecanicos", {
        id: mecanico.id,
        nombre: mecanico.nombre,
        documento: mecanico.documento,
        edad: mecanico.edad,
        descuento: mecanico.descuento
      })
        .then(() => {
          getMecanicos();

          resetForm();
          setRecordForEdit(null);
          setOpenModal(false);

          setOpenSnack({
            show: true,
            severity: "success",
            message: "Mecánico actualizado correctamente",
          });
        })
        .catch(() => {
          setOpenSnack({
            show: true,
            severity: "error",
            message: "No se pudo actualizar el mecánico",
          });
        });
    }
  };

  const openInModal = (mecanico) => {
    setRecordForEdit(mecanico);
    setOpenModal(true);
  };

  const deleteMecanico = async (id) => {
    await Axios.delete(`${baseUrl}mecanicos/${id}`)
      .then(() => {
        getMecanicos();

        setOpenSnack({
          show: true,
          severity: "success",
          message: "Mecánico eliminado correctamente",
        });
      })
      .catch(() => {
        setOpenSnack({
          show: true,
          severity: "error",
          message: "No se pudo eliminar el mecanico",
        });
      });
  };

  return (
    <>
      <PageComponent
        title="Mecánicos"
        buttons={
          <Button
            text="Agregar"
            color="secondary"
            onClick={() => {
              setOpenModal(true);
              setRecordForEdit(null);
            }}
            startIcon={<AddCircleOutline />}
          />
        }
      >
        <CustomizedDataGrid columns={columns} rows={rows} />

        <Modal open={openModal} setOpen={setOpenModal} title={recordForEdit === null ? "Agregar Mecánico" : "Actualizar Mecánico"}>
          <MecanicosForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </Modal>

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
  )
}

export default Mecanicos