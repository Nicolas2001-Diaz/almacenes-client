import {
  AddCircleOutline,
  Delete,
  Edit,
  LocalShipping,
  Sell,
} from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Controls";
import CustomizedDataGrid from "../../components/CustomizedDataGrid/CustomizedDataGrid";
import Modal from "../../components/Dialog/Dialog";
import useScanDetection from "use-scan-detection-react18";
import PageComponent from "../../components/PageComponent/PageComponent";
import InventarioForm from "./InventarioForm";
import { Alert, Snackbar } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Axios from "axios";
import ProveedoresForm from "./ProveedoresForm";
import VentaForm from "./VentaForm";
import ExportarInventario from "./ExportarInventario";

const Inventario = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 320 },
    {
      field: "proveedor_nombre",
      headerName: "Proveedor",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "precio_compra",
      headerName: "Precio Compra",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "precio_venta",
      headerName: "Precio Venta",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "stock",
      headerName: "Cantidad",
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
      width: 200,
      sortable: false,
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

  useScanDetection({
    onComplete: (code) => {
      sellProduct(code);
    },
    minLength: 5,
    averageWaitTime: 20,
  });

  const [rows, setRows] = useState([]);

  const getInventario = useCallback(async () => {
    await Axios.get(baseUrl + "inventario").then(({ data }) => {
      setRows(data);
    });
  }, [baseUrl]);

  useEffect(() => {
    getInventario();
  }, [getInventario]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalProv, setOpenModalProv] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false);

  const [openSnack, setOpenSnack] = useState({
    show: false,
    severity: "",
    message: "",
  });

  function sellProduct(codigo) {
    if (!openModal) {
      setOpenModalSell(true);
      console.log(codigo);
    }
  }

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
          getInventario();

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
          getInventario();

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
        getInventario();

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
        title="Inventario"
        maxWidth="xl"
        buttons={
          <>
            <ExportarInventario productos={rows} />

            <Button
              text="Vender"
              color="primary"
              onClick={() => {
                setOpenModalSell(true);
              }}
              startIcon={<Sell />}
            />

            <Button
              text="Proveedores"
              color="success"
              onClick={() => {
                setOpenModalProv(true);
              }}
              startIcon={<LocalShipping />}
            />

            <Button
              text="Agregar Producto"
              color="secondary"
              onClick={() => {
                setOpenModal(true);
                setRecordForEdit(null);
              }}
              startIcon={<AddCircleOutline />}
            />
          </>
        }
      >
        <CustomizedDataGrid columns={columns} rows={rows} />

        <Modal
          open={openModal}
          setOpen={() => setOpenModal(false)}
          title={
            recordForEdit === null ? "Agregar Producto" : "Actualizar Producto"
          }
        >
          <InventarioForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </Modal>

        <Modal
          open={openModalProv}
          setOpen={() => setOpenModalProv(false)}
          title="Proveedores"
        >
          <ProveedoresForm />
        </Modal>

        <VentaForm open={openModalSell} setOpen={setOpenModalSell} getInventario={getInventario} />

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

export default Inventario;
