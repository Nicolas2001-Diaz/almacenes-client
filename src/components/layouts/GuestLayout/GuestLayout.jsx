import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <Container maxWidth="sm">
      <Outlet />
    </Container>
  );
};

export default GuestLayout;
