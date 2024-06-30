import { Box, Grid } from "@mui/material";
import { Button, Input } from "../../components/Controls";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const initialFvalues = {
  id: 0,
  nombre: "",
  documento: "",
  edad: "",
  descuento: ""
};

const MecanicosForm = ({ addOrEdit, recordForEdit }) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("nombre" in fieldValues)
      temp.nombre = fieldValues.nombre ? "" : "Este campo es obligatorio.";
    if ("documento" in fieldValues)
      temp.documento = fieldValues.documento ? "" : "Este campo es obligatorio.";
    if ("edad" in fieldValues)
      temp.edad =
        fieldValues.edad.length > 1 ? "" : "Mínimo 2 números.";
    if ("descuento" in fieldValues)
      temp.descuento = fieldValues.descuento > 0 ? "" : "Mínimo 1 número.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setValues, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);

  const handleClose = () => {
    resetForm();
  };

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
        documento: recordForEdit.documento.toString(),
        edad: recordForEdit.edad.toString(),
        descuento: recordForEdit.descuento.toString(),
      });
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
            label="Nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="Documento"
            name="documento"
            value={values.documento}
            onChange={handleInputChange}
            error={errors.documento}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Edad"
            name="edad"
            type="number"
            value={values.edad}
            onChange={handleInputChange}
            error={errors.edad}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Descuento"
            name="descuento"
            type="number"
            value={values.descuento}
            onChange={handleInputChange}
            error={errors.descuento}
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

export default MecanicosForm;
