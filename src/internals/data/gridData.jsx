import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export function renderStatus(params) {
  const colors = {
    new: "info",
    verified: "success",
    blocked: "error",
    uncertain: "default",
  };

  return (
    <Chip
      label={params.value.status}
      color={colors[params.value.status]}
      variant="outlined"
    />
  );
}
export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  { field: "nombre", headerName: "Nombre", width: 500 },
  {
    field: "precioCompra",
    headerName: "Precio Compra",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "precioVenta",
    headerName: "Precio Venta",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "cantidad",
    headerName: "Cantidad",
    headerAlign: "center",
    align: "center",
    width: 100,
  },
  {
    field: "acciones",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 290,
    sortable: false,
    filterable: false,
  },
];

export const rows = [
  {
    id: 1,
    nombre: "Homepage Overview",
    precioCompra: 192423,
    precioVenta: 1992,
    cantidad: "1",
    codigo: 400,
  },
  {
    id: 2,
    nombre: "Product Details - Gadgets",
    precioCompra: 152240,
    precioVenta: 1092,
    cantidad: "1",
    codigo: 321,
  },
  {
    id: 3,
    nombre: "Checkout Process - Step 1",
    precioCompra: 61240,
    precioVenta: 1674,
    cantidad: "1",
    codigo: 120,
  },
  {
    id: 4,
    nombre: "User Profile Dashboard",
    precioCompra: 102240,
    precioVenta: 3374,
    cantidad: "1",
    codigo: 40,
  },
  {
    id: 5,
    nombre: "Article Listing - Tech News",
    precioCompra: 132240,
    precioVenta: 2424,
    cantidad: "1",
    codigo: 49,
  },
  {
    id: 6,
    nombre: "FAQs - Customer Support",
    precioCompra: 12240,
    precioVenta: 3967,
    cantidad: "1",
    codigo: 80,
  },
  {
    id: 7,
    nombre: "About Us - Company Info",
    precioCompra: 19240,
    precioVenta: 1028,
    cantidad: "1",
    codigo: 2,
  },
  {
    id: 8,
    nombre: "Contact Form Page",
    precioCompra: 12240,
    precioVenta: 3670,
    cantidad: "1",
    codigo: 80,
  },
  {
    id: 9,
    nombre: "Services Overview - Web Development",
    precioCompra: 19240,
    precioVenta: 1026,
    cantidad: "1",
    codigo: 2,
  },
  {
    id: 10,
    nombre: "Pricing Page - Subscription Plans",
    precioCompra: 12240,
    precioVenta: 3670,
    cantidad: "1",
    codigo: 80,
  },
];
