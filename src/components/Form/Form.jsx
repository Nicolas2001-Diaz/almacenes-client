import { Box } from "@mui/material";

export default function Form({ children, ...other }) {
  return (
    <Box
      {...other}
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1, width: "100%" },
      }}
      autoComplete="off"
    >
      {children}
    </Box>
  );
}
