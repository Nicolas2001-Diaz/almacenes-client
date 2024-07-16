import { Delete, Edit } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CustomizedDataGrid from "../../components/CustomizedDataGrid/CustomizedDataGrid";
import Modal from "../../components/Dialog/Dialog";
import PageComponent from "../../components/PageComponent/PageComponent";
import ExportarHistorial from "./ExportarHistorial";
import InventarioForm from "./InventarioForm";

const Historial = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const columns = [
    { field: "producto_nombre", headerName: "Nombre", width: 400 },
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
      width: 200,
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
          onClick={() => deleteProduct(params.id)}
        />,
      ],
    },
  ];

  const [rows, setRows] = useState([]);

  const getHistorial = useCallback(async () => {
    await Axios.get(baseUrl + "historial").then(({ data }) => {
      setRows(data);
    });
  }, [baseUrl]);

  useEffect(() => {
    getHistorial();
  }, [getHistorial]);

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

  const addOrEdit = async (product, resetForm) => {
    if (recordForEdit === null && product.id === 0) {
      await Axios.post(baseUrl + "inventario", {
        nombre: product.nombre,
        proveedor: product.proveedor,
        codigo: product.codigo,
        precio_compra: product.precio_compra,
        precio_venta: product.precio_venta,
        stock: product.stock,
      })
        .then(() => {
          getHistorial();

          resetForm();
          setRecordForEdit(null);
          setOpenModal(false);

          setOpenSnack({
            show: true,
            severity: "success",
            message: "Producto guardado correctamente",
          });
        })
        .catch(() => {
          setOpenSnack({
            show: true,
            severity: "error",
            message: "No se pudo ingresar el producto",
          });
        });
    } else if (recordForEdit !== null && product.id !== 0) {
      await Axios.put(baseUrl + "inventario", {
        id: product.id,
        nombre: product.nombre,
        codigo: product.codigo,
        proveedor: product.proveedor,
        precio_compra: product.precio_compra,
        precio_venta: product.precio_venta,
        stock: product.stock,
      })
        .then(() => {
          getHistorial();

          resetForm();
          setRecordForEdit(null);
          setOpenModal(false);

          setOpenSnack({
            show: true,
            severity: "success",
            message: "Producto actualizado correctamente",
          });
        })
        .catch(() => {
          setOpenSnack({
            show: true,
            severity: "error",
            message: "No se pudo actualizar el producto",
          });
        });
    }
  };

  const openInModal = (product) => {
    product.proveedor = {
      id: product.proveedor_id,
      nombre: product.proveedor_nombre,
    };

    setRecordForEdit(product);
    setOpenModal(true);
  };

  const deleteProduct = async (id) => {
    await Axios.delete(`${baseUrl}inventario/${id}`)
      .then(() => {
        getHistorial();

        setOpenSnack({
          show: true,
          severity: "success",
          message: "Producto eliminado correctamente",
        });
      })
      .catch(() => {
        setOpenSnack({
          show: true,
          severity: "error",
          message: "No se pudo eliminar el producto",
        });
      });
  };

  return (
    <>
      <PageComponent
        title="Historial"
        buttons={
          <>
            <ExportarHistorial productos={rows} />
          </>
        }
      >
        <CustomizedDataGrid columns={columns} rows={rows} />

        <Modal
          open={openModal}
          setOpen={setOpenModal}
          title={
            recordForEdit === null ? "Agregar Producto" : "Actualizar Producto"
          }
        >
          <InventarioForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
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
  );
};

export default Historial;
