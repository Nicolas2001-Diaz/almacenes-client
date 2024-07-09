import { Autocomplete, Box, Grid } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import useScanDetection from "use-scan-detection-react18";
import { Button, Input } from "../../components/Controls";
import { useForm } from "../../hooks/useForm";
import Axios from "axios";

const initialFvalues = {
  id: 0,
  nombre: "",
  proveedor: {},
  codigo: "",
  precio_compra: "",
  precio_venta: "",
  stock: "",
};

const InventarioForm = ({ addOrEdit, recordForEdit }) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const [rows, setRows] = useState([]);

  const getInventario = useCallback(async () => {
    await Axios.get(baseUrl + "proveedores").then(({ data }) => {
      setRows(data);
    });
  }, [baseUrl]);

  useEffect(() => {
    getInventario();
  }, [getInventario]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("nombre" in fieldValues)
      temp.nombre = fieldValues.nombre ? "" : "Este campo es obligatorio.";
    if ("codigo" in fieldValues)
      temp.codigo = fieldValues.codigo ? "" : "Este campo es obligatorio.";
    if ("precio_compra" in fieldValues)
      temp.precio_compra =
        fieldValues.precio_compra.length > 2 ? "" : "Mínimo 3 números.";
    if ("precio_venta" in fieldValues)
      temp.precio_venta =
        fieldValues.precio_venta.length > 2 ? "" : "Mínimo 3 números.";
    if ("stock" in fieldValues)
      temp.stock = fieldValues.stock > 0 ? "" : "Mínimo 1 número.";
    if ("proveedor" in fieldValues)
      temp.proveedor = fieldValues.proveedor != 0 ? "" : "Este campo es obligatorio.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setValues, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);

  const [proveedor, setProveedor] = useState(null);

  const [barcodeScan, setBarcodeScan] = useState(
    "asdsfdasfdsf"
  );

  useScanDetection({
    onComplete: {},
    minLength: 5,
    averageWaitTime: 20,
  });

  const handleClose = () => {
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    values.codigo = barcodeScan;
    values.proveedor = proveedor ? proveedor.id : 0;

    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setBarcodeScan(recordForEdit.codigo);

      setValues({
        ...recordForEdit,
        precio_compra: recordForEdit.precio_compra.toString(),
        precio_venta: recordForEdit.precio_venta.toString(),
        stock: recordForEdit.stock.toString()
      });

      setProveedor(recordForEdit.proveedor)
    }
  }, [recordForEdit, setValues]);

  return (
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
            error={errors.codigo}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Input
            label="Nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Autocomplete
            options={rows}
            getOptionLabel={(option) => option.nombre}
            value={proveedor}
            onChange={(event, newValue) => {
              setProveedor(newValue);
            }}
            renderInput={(params) => (
              <Input {...params} label="Proveedor" error={errors.proveedor}/>
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Input
            label="Precio de compra"
            name="precio_compra"
            type="number"
            value={values.precio_compra}
            onChange={handleInputChange}
            error={errors.precio_compra}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Input
            label="Precio de venta"
            name="precio_venta"
            type="number"
            value={values.precio_venta}
            onChange={handleInputChange}
            error={errors.precio_venta}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Input
            label="stock"
            name="stock"
            type="number"
            value={values.stock}
            onChange={handleInputChange}
            error={errors.stock}
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
          {!recordForEdit && <Button text="Borrar" onClick={handleClose} />}
        </Grid>
        <Grid item>
          <Button
            text={recordForEdit ? "Editar" : "Guardar"}
            color="success"
            type="button"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventarioForm;
