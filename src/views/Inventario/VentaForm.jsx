import { Search, SearchOff } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useScanDetection from "use-scan-detection-react18";
import { Button, Input } from "../../components/Controls";
import Modal from "../../components/Dialog/Dialog";
import { useForm } from "../../hooks/useForm";

const initialFvalues = {
  id: 0,
  nombre: "",
  proveedor: "",
  codigo: "",
  metodo_pago: "",
  precio_venta: "",
  total: "",
  cantidad: "",
  cantidad_vendida: "",
};

const VentaForm = ({ open, setOpen, getInventario }) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const [barcodeScan, setBarcodeScan] = useState("");
  const [producto, setProducto] = useState(null);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("precio_venta" in fieldValues)
      temp.precio_venta =
        fieldValues.precio_venta.length > 2 ? "" : "Mínimo 3 números.";
    if ("cantidad_vendida" in fieldValues)
      temp.cantidad_vendida = fieldValues.cantidad_vendida > 0 ? "" : "Mínimo 1 número.";
    if ("total" in fieldValues)
      temp.total = fieldValues.total != 0 ? "" : "Este campo es obligatorio.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setValues, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);

  useScanDetection({
    onComplete: setBarcodeScan,
    minLength: 5,
    averageWaitTime: 20,
  });

  const handleClose = () => {
    setBarcodeScan("");
    setProducto(null);
    resetForm();
    setOpen(false);
  };

  const handleCancelSearch = () => {
    setBarcodeScan("");
    setProducto(null);
    resetForm();
  };


  const handleSearch = useCallback(async () => {
    if (barcodeScan != "") {
      await Axios.get(`${baseUrl}inventario/${barcodeScan}`).then(
        ({ data }) => {
          setProducto(data);

          if (data.length > 0) {
            setValues({
              id: data[0].id.toString(),
              nombre: data[0].nombre.toString(),
              precio_venta: data[0].precio_venta.toString(),
              proveedor: data[0].proveedor_nombre.toString(),
              cantidad: data[0].stock.toString(),
              cantidad_vendida: "",
              total: "",
              metodo_pago: "",
            });
          }
        }
      );
    }
  }, [barcodeScan, baseUrl, setValues]);

  useEffect(() => {
    handleSearch();
  }, [barcodeScan, handleSearch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      await Axios.post(baseUrl + "historial/clientes", {
        producto_id: values.id,
        metodo_pago: values.metodo_pago,
        cantidad: values.cantidad,
        cantidad_vendida: values.cantidad_vendida,
        total: values.total,
      })
        .then(() => {
          setBarcodeScan("");
          setProducto(null);
          resetForm();
          setOpen(false);
          getInventario();
          // setOpenModal(false);

          // setOpenSnack({
          //   show: true,
          //   severity: "success",
          //   message: "Producto guardado correctamente",
          // });
        })
        .catch(() => {
          // setOpenSnack({
          //   show: true,
          //   severity: "error",
          //   message: "No se pudo ingresar el producto",
          // });
        });
    }
  };

  return (
    <Modal open={open} setOpen={handleClose} title="Registrar Venta">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mt: 1, width: "100%" },
        }}
        autoComplete="off"
      >
        <Grid container columnSpacing={{ md: 2 }}>
          <Grid item xs={12}>
            <Input
              label="Codigo"
              name="codigo"
              value={barcodeScan}
              onChange={(e) => setBarcodeScan(e.target.value)}
              error={errors.codigo}
              InputProps={{
                endAdornment: (
                  <>
                    {producto != null ? (
                      <IconButton color="error" onClick={handleCancelSearch}>
                        <SearchOff />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" onClick={handleSearch}>
                        <Search />
                      </IconButton>
                    )}
                  </>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Input
              label="Nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleInputChange}
              error={errors.nombre}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Input
              label="Proveedor"
              name="proveedor"
              value={values.proveedor}
              onChange={handleInputChange}
              error={errors.proveedor}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Precio de venta"
              name="precio_venta"
              type="number"
              value={values.precio_venta}
              onChange={(e) => {
                handleInputChange(e);

                setValues({
                  ...values,
                  precio_venta: e.target.value,
                  total: (e.target.value * values.cantidad_vendida).toString(),
                });
              }}
              error={errors.precio_venta}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Input
              label="Cantidad"
              name="cantidad_vendida"
              type="number"
              value={values.cantidad_vendida}
              onChange={(e) => {
                handleInputChange(e);

                setValues({
                  ...values,
                  cantidad_vendida: e.target.value,
                  total: (e.target.value * values.precio_venta).toString(),
                });
              }}
              error={errors.cantidad_vendida}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Total"
              name="total"
              type="number"
              value={values.total}
              onChange={handleInputChange}
              error={errors.total}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Input
              select={true}
              options={[
                { id: "Nequi", label: "Nequi" },
                { id: "Davi Plata", label: "Davi Plata" },
                { id: "Efectivo", label: "Efectivo" },
                {
                  id: "Transferencia Bancaria",
                  label: "Transferencia Bancaria",
                },
              ]}
              label="Metodo de Pago"
              name="metodo_pago"
              value={values.metodo_pago}
              onChange={handleInputChange}
              error={errors.metodo_pago}
              required
            />
          </Grid>
        </Grid>

        <Grid
          sx={{ mt: 2 }}
          container
          justifyContent={{ xs: "space-between", md: "flex-end" }}
          columnSpacing={2}
        >
          <Grid item>
            {!producto != null && (
              <Button text="Cancelar" onClick={handleClose} />
            )}
          </Grid>
          <Grid item>
            <Button
              text="Vender"
              color="success"
              type="button"
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default VentaForm;
