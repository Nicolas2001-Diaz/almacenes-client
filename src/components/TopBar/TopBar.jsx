import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Mecánicos", to: "/mecanicos" },
  { name: "Inventario", to: "/inventario" },
  { name: "Historial", to: "/historial" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopBar = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/inventario">Almacenes N & C</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "active"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "nav-link"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </Nav>

          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
