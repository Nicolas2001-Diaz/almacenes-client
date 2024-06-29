import { useState } from "react";

export function useForm(initialFvalues, validateOnChange=false, validate) {
  const [values, setValues] = useState(initialFvalues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if(validateOnChange) validate({[name]: value});
  };

  const resetForm = () => {
    setValues(initialFvalues);
    setErrors({});
  }

  return {
    values,
    errors,
    setValues,
    setErrors,
    handleInputChange,
    resetForm
  };
}
