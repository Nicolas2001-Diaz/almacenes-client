import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Input } from "../../components/Controls";
import CustomizedDataGrid from "../../components/CustomizedDataGrid/CustomizedDataGrid";
import { useForm } from "../../hooks/useForm";

const initialFvalues = {
  id: 0,
  nombre: "",
};

const ProveedoresForm = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 500 },
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
          onClick={() => editProveedor(params.row)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<Delete />}
          color="error"
          label="Delete"
          onClick={() => deleteProveedor(params.id)}
        />,
      ],
    },
  ];

  const [rows, setRows] = useState([]);

  const getProveedores = useCallback(async () => {
    await Axios.get(baseUrl + "proveedores").then(({ data }) => {
      setRows(data);
    });
  }, [baseUrl]);

  useEffect(() => {
    getProveedores();
  }, [getProveedores]);

  const [recordForEdit, setRecordForEdit] = useState(null);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("nombre" in fieldValues)
      temp.nombre = fieldValues.nombre ? "" : "Este campo es obligatorio.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setValues, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit, setValues]);

  const addOrEdit = async (proveedor, resetForm) => {
    if (recordForEdit === null && proveedor.id === 0) {
      await Axios.post(baseUrl + "proveedores", {
        nombre: proveedor.nombre,
      })
        .then(() => {
          getProveedores();

          resetForm();
          setRecordForEdit(null);
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
    } else if (recordForEdit !== null && proveedor.id !== 0) {
      await Axios.put(baseUrl + "proveedores", {
        id: proveedor.id,
        nombre: proveedor.nombre,
      })
        .then(() => {
          getProveedores();

          resetForm();
          setRecordForEdit(null);
          // setOpenModal(false);

          // setOpenSnack({
          //   show: true,
          //   severity: "success",
          //   message: "Producto actualizado correctamente",
          // });
        })
        .catch(() => {
          // setOpenSnack({
          //   show: true,
          //   severity: "error",
          //   message: "No se pudo actualizar el producto",
          // });
        });
    }
  };

  const editProveedor = (proveedor) => {
    setRecordForEdit(proveedor);
    // setOpenModal(true);
  };

  const deleteProveedor = async (id) => {
    await Axios.delete(`${baseUrl}proveedores/${id}`)
      .then(() => {
        getProveedores();

        // setOpenSnack({
        //   show: true,
        //   severity: "success",
        //   message: "Producto eliminado correctamente",
        // });
      })
      .catch(() => {
        // setOpenSnack({
        //   show: true,
        //   severity: "error",
        //   message: "No se pudo eliminar el producto",
        // });
      });
  };

  const handleCancel = () => {
    setRecordForEdit(null)
    resetForm();
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 1, width: "100%" },
      }}
      autoComplete="off"
    >
      <Grid container sx={{ paddingBottom: 4 }}>
        <Grid item xs={12}>
          <Input
            label="Nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
            required
            InputProps={{
              endAdornment: (
                <>
                  {recordForEdit && (
                    <Button
                      variant="text"
                      text="Cancelar"
                      color="error"
                      type="button"
                      onClick={handleCancel}
                    />
                  )}

                  <Button
                    variant="text"
                    text={recordForEdit ? "Editar" : "Agregar"}
                    color={recordForEdit ? "primary" : "success"}
                    type="button"
                    onClick={handleSubmit}
                  />
                </>
              ),
            }}
          />
        </Grid>
      </Grid>

      <CustomizedDataGrid columns={columns} rows={rows} />
    </Box>
  );
};

export default ProveedoresForm;
