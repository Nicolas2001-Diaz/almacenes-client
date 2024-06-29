import { Container } from "@mui/material";
import Header from "../Header/Header";

const PageComponent = ({ title, buttons, children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        py: { xs: 8, sm: 10 },
        gap: 2,
      }}
    >
        <Header title={title} buttons={buttons} />

      {children}
    </Container>
  );
};

export default PageComponent;
