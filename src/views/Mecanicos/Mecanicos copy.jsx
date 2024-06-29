import Axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Modal,
  Form,
  InputGroup,
  Table,
  Toast,
  ToastContainer,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { Icon } from "../../Components/Icon/Icon";
import TopBar from "../../Components/TopBar/TopBar";

function Mecanicos() {
  const [mecanicos, setMecanicos] = useState([]);

  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ message: "", variant: "", show: false });

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [descuento, setDescuento] = useState("");

  const showToast = ({ message, variant }) => {
    setToast({ message, variant });
  };

  const openModal = (op, val) => {
    setId("");
    setNombre("");
    setEdad("");
    setDescuento("");

    if (op === 1) {
      setShowModal(true);
      setEdit(false);
    } else if (op === 2) {
      setEdit(true);
      setShowModal(true);

      setId(val.id);
      setNombre(val.nombre);
      setEdad(val.edad);
      setDescuento(val.descuento);
    }
  };

  const limpiarDatos = () => {
    setId("");
    setNombre("");
    setEdad("");
    setDescuento("");

    setShowModal(false);
    setEdit(false);
  };

  const add = async () => {
    if (nombre.trim() === "" && edad.trim() === "") {
      showToast({
        message: "Todos los campos son necesarios",
        variant: "danger",
      });
    } else {
      await Axios.post("http://127.0.0.1:8080/mecanicos", {
        nombre,
        edad,
        descuento,
      })
        .then(() => {
          getMecanicos();

          limpiarDatos();

          showToast({
            message: "Mecánico ingresado exitosamente",
            variant: "success",
          });
        })
        .catch((err) => {
          showToast({
            message: "No se pudo ingresar el mecánico",
            variant: "danger",
          });
        });
    }
  };

  const update = async () => {
    await Axios.put("http://127.0.0.1:8080/mecanicos", {
      id,
      nombre,
      edad,
      descuento,
    })
      .then(() => {
        getMecanicos();

        limpiarDatos();

        showToast({
          message: "Mecánico actualizado exitosamente",
          variant: "success",
        });
      })
      .catch((err) => {
        showToast({
          message: "No se pudo actualizar el mecánico",
          variant: "danger",
        });
      });
  };

  const deleteMecanico = async (id, nombre) => {
    Swal.fire({
      title: `¿Realmente desea eliminar a ${nombre}?`,
      text: "Esta acción no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Axios.delete(`http://127.0.0.1:8080/mecanicos/${id}`)
          .then(() => {
            getMecanicos();

            showToast({
              message: "Mecánico eliminado exitosamente",
              variant: "success",
            });
          })
          .catch((err) => {
            showToast({
              message: "No se pudo eliminar el mecánico",
              variant: "danger",
            });
          });
      }
    });
  };

  const getMecanicos = async () => {
    await Axios.get("http://127.0.0.1:8080/mecanicos").then(({ data }) => {
      setMecanicos(data);
    });
  };

  useEffect(() => {
    getMecanicos();
  }, []);

  return (
    <>
      <TopBar />

      <Container>
        <center>
          <h2 className="mt-5 mb-3">GESTIÓN DE MECÁNICOS</h2>

          <Button className="mb-3" variant="dark" onClick={() => openModal(1)}>
            Agregar
            <Icon iconName="PlusCircle" color="white" className="ms-2" />
          </Button>
        </center>

        <Table striped>
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">N° Documento</th>
              <th scope="col">Edad</th>
              <th scope="col">Descuento</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {mecanicos.map((mecanico) => (
              <tr key={mecanico.id}>
                <td>{mecanico.nombre}</td>
                <td>{mecanico.documento}</td>
                <td>{mecanico.edad}</td>
                <td>{mecanico.descuento} %</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="info"
                      onClick={() => {
                        openModal(2, mecanico);
                      }}
                    >
                      <Icon iconName="PencilSquare" color="white" />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteMecanico(mecanico.id, mecanico.nombre);
                      }}
                    >
                      <Icon iconName="Trash" color="white" />
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        deleteMecanico(mecanico.id, mecanico.nombre);
                      }}
                    >
                      <Icon iconName="CardList" color="white" />
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        deleteMecanico(mecanico.id, mecanico.nombre);
                      }}
                    >
                      <Icon iconName="Cash" color="white" />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          show={showModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          onHide={limpiarDatos}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {edit ? "Actualizar Mecánico" : "Crear Mecánico"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="nombre">Nombre</InputGroup.Text>

              <Form.Control
                value={nombre}
                placeholder="Ingrese un nombre"
                aria-label="Ingrese un nombre"
                aria-describedby="nombre"
                onChange={(ev) => setNombre(ev.target.value)}
                autoFocus
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="edad">Edad</InputGroup.Text>

              <Form.Control
                type="number"
                value={edad}
                placeholder="Ingrese una edad"
                aria-label="Ingrese una edad"
                aria-describedby="edad"
                onChange={(ev) => setEdad(ev.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="descuento">Descuento</InputGroup.Text>
              <Form.Control
                value={descuento}
                placeholder="Ingrese un descuento"
                aria-label="Ingrese un descuento"
                aria-describedby="descuento"
                onChange={(ev) => setDescuento(ev.target.value)}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={limpiarDatos}>Cancelar</Button>
            {edit ? (
              <Button variant="warning" onClick={update}>
                Actualizar
              </Button>
            ) : (
              <Button variant="success" onClick={add}>
                Registrar
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <ToastContainer
          className="position-fixed"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            bg={toast.variant}
            onClose={() => setToast({ show: false })}
            show={toast.show}
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
}

export default Mecanicos;
