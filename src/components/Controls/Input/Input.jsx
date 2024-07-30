import { MenuItem, TextField } from "@mui/material";

const Input = ({
  name,
  label,
  value,
  onChange,
  type,
  options,
  select,
  error = null,
  disabled,
  ...other
}) => {
  return (
    <TextField
      disabled={disabled}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      select={select}
      {...(error && { error: true, helperText: error })}
      {...other}
    >
      {options && <MenuItem value="0"></MenuItem>}

      {options?.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Input;
