import { Button as MuiButton} from "@mui/material";

const Button = ({ text, size, color, variant, onClick, ...other }) => {
  return (
    <MuiButton variant={variant || "outlined"} onClick={onClick} size={size} color={color} {...other}>
      {text}
    </MuiButton>
  );
};

export default Button;
